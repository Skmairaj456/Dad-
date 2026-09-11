import { NextResponse } from "next/server";

type LeadPayload = {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  carMake?: unknown;
  carModel?: unknown;
  year?: unknown;
  service?: unknown;
  notes?: unknown;
  termsAccepted?: unknown;
};

const requiredStringFields = [
  "fullName",
  "phone",
  "email",
  "carMake",
  "carModel",
  "year",
  "service",
] as const;

const getText = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const formatService = (value: string): string =>
  value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const createLeadId = (): string =>
  `DAD-${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;

export async function POST(request: Request) {
  /*
   * ============================================================
   * ENVIRONMENT VARIABLES
   * ============================================================
   */

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  /*
   * ============================================================
   * PARSE REQUEST
   * ============================================================
   */

  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  /*
   * ============================================================
   * VALIDATE REQUIRED FIELDS
   * ============================================================
   */

  const values = Object.fromEntries(
    requiredStringFields.map((field) => [
      field,
      getText(payload[field]),
    ])
  ) as Record<(typeof requiredStringFields)[number], string>;

  const missingField = requiredStringFields.find(
    (field) => !values[field]
  );

  if (missingField || payload.termsAccepted !== true) {
    return NextResponse.json(
      {
        error:
          "Please complete all required fields and accept the Terms & Conditions.",
      },
      { status: 400 }
    );
  }

  /*
   * ============================================================
   * LENGTH VALIDATION
   * ============================================================
   */

  const notes = getText(payload.notes);

  if (
    values.email.length > 254 ||
    values.fullName.length > 120 ||
    values.phone.length > 30 ||
    values.carMake.length > 100 ||
    values.carModel.length > 100 ||
    values.year.length > 10 ||
    values.service.length > 150 ||
    notes.length > 4000
  ) {
    return NextResponse.json(
      {
        error: "One or more submitted fields are too long.",
      },
      { status: 400 }
    );
  }

  /*
   * ============================================================
   * NORMALIZE LEAD
   * ============================================================
   */

  const formattedNotes = notes || "-";
  const isRsa = values.service === "roadside-assistance";

  const leadId = createLeadId();

  const normalizedLead = {
    leadId,
    dateTime: new Date().toISOString(),

    name: values.fullName,
    phone: values.phone,
    email: values.email,

    carMake: values.carMake,
    carModel: values.carModel,
    year: values.year,

    service: formatService(values.service),

    rsa: isRsa ? "Yes" : "No",

    // Current form does not collect RSA location.
    rsaLocation: "-",

    additionalDetails: formattedNotes,

    termsAccepted: true,

    status: "NEW",

    source: "DAD Garage Website",
  };

  /*
   * ============================================================
   * TELEGRAM MESSAGE
   * ============================================================
   */

  const telegramMessage = [
    isRsa
      ? "🆘 NEW RSA REQUEST"
      : "🔧 NEW DAD GARAGE LEAD",

    "",

    `Lead: ${leadId}`,

    "",

    "👤 CUSTOMER",
    `Name: ${normalizedLead.name}`,
    `Phone: ${normalizedLead.phone}`,
    `Email: ${normalizedLead.email}`,

    "",

    "🚗 VEHICLE",
    `Make: ${normalizedLead.carMake}`,
    `Model: ${normalizedLead.carModel}`,
    `Year: ${normalizedLead.year}`,

    "",

    "🔧 SERVICE",
    normalizedLead.service,

    "",

    "🆘 RSA",
    normalizedLead.rsa,

    "📍 RSA LOCATION",
    "Not provided (the form does not currently collect a location)",

    "",

    "📝 ADDITIONAL DETAILS",
    normalizedLead.additionalDetails,

    "",

    "✅ T&C ACCEPTED",
    "Yes",

    "",

    "RSA services are chargeable as per applicable industry standards and based on the nature, location, and assistance required.",

    "",

    "Source: DAD Garage Website",
  ].join("\n");

  /*
   * ============================================================
   * GOOGLE SHEETS
   * ============================================================
   */

  let sheetsSaved = false;

  if (!sheetsWebhookUrl) {
    console.error(
      "Google Sheets integration is not configured. Missing GOOGLE_SHEETS_WEBHOOK_URL."
    );
  } else {
    try {
      console.log("Sending lead to Google Sheets:", leadId);

      const sheetsResponse = await fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(normalizedLead),

        // Prevent the request from hanging indefinitely.
        signal: AbortSignal.timeout(10000),
      });

      const sheetsResponseText = await sheetsResponse.text();

      console.log(
        "Google Sheets response:",
        sheetsResponse.status,
        sheetsResponseText
      );

      if (!sheetsResponse.ok) {
        console.error(
          "Google Sheets webhook failed:",
          sheetsResponse.status,
          sheetsResponseText
        );
      } else {
        let sheetsResult: unknown = null;

        try {
          sheetsResult = JSON.parse(sheetsResponseText);
        } catch {
          // Apps Script may return plain text.
        }

        if (
          sheetsResult &&
          typeof sheetsResult === "object" &&
          "success" in sheetsResult &&
          (sheetsResult as { success?: unknown }).success === false
        ) {
          console.error(
            "Google Sheets reported an application-level failure:",
            sheetsResult
          );
        } else {
          sheetsSaved = true;
          console.log(
            `Google Sheets lead saved successfully: ${leadId}`
          );
        }
      }
    } catch (error) {
      console.error(
        "Google Sheets webhook request failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  /*
   * ============================================================
   * TELEGRAM
   * ============================================================
   */

  let telegramSent = false;

  if (!botToken || !chatId) {
    console.error(
      "Telegram integration is not configured. Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID."
    );
  } else {
    try {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage,
          }),

          signal: AbortSignal.timeout(10000),
        }
      );

      const telegramResponseText = await telegramResponse.text();

      if (!telegramResponse.ok) {
        console.error(
          "Telegram notification failed:",
          telegramResponse.status,
          telegramResponseText
        );
      } else {
        telegramSent = true;

        console.log(
          `Telegram notification sent successfully: ${leadId}`
        );
      }
    } catch (error) {
      console.error(
        "Telegram notification request failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  /*
   * ============================================================
   * FINAL RESPONSE
   * ============================================================
   *
   * Google Sheets is treated as the primary lead storage.
   * Telegram is a notification channel.
   *
   * Therefore:
   *
   * Sheets fails → return error
   * Sheets succeeds + Telegram fails → lead still succeeds
   */

  if (!sheetsSaved) {
    return NextResponse.json(
      {
        success: false,
        error:
          "We could not save your request right now. Please try again.",
        leadId,
        telegramSent,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    leadId,
    telegramSent,
  });
}