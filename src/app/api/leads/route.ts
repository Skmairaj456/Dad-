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

const getText = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const formatService = (value: string) =>
  value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const createLeadId = () => `DAD-${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const values = Object.fromEntries(
    requiredStringFields.map((field) => [field, getText(payload[field])])
  ) as Record<(typeof requiredStringFields)[number], string>;

  const missingField = requiredStringFields.find((field) => !values[field]);
  if (missingField || payload.termsAccepted !== true) {
    return NextResponse.json({ error: "Please complete all required fields and accept the Terms & Conditions." }, { status: 400 });
  }

  const notes = getText(payload.notes);
  if (values.email.length > 254 || values.fullName.length > 120 || notes.length > 4000) {
    return NextResponse.json({ error: "One or more submitted fields are too long." }, { status: 400 });
  }

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
    rsaLocation: "-",
    additionalDetails: formattedNotes,
    termsAccepted: true,
    status: "New",
    source: "DAD Garage Website",
  };
  const message = [
    isRsa ? "🆘 NEW RSA REQUEST" : "🔧 NEW DAD GARAGE LEAD",
    "",
    `Lead: ${leadId}`,
    "",
    "👤 CUSTOMER",
    `Name: ${values.fullName}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    "",
    "🚗 VEHICLE",
    `Make: ${values.carMake}`,
    `Model: ${values.carModel}`,
    `Year: ${values.year}`,
    "",
    "🔧 SERVICE",
    formatService(values.service),
    "",
    "🆘 RSA",
    isRsa ? "Yes" : "No",
    "📍 RSA LOCATION",
    "Not provided (the form does not currently collect a location)",
    "",
    "📝 ADDITIONAL DETAILS",
    formattedNotes,
    "",
    "✅ T&C ACCEPTED",
    "Yes",
    "",
    "RSA services are chargeable as per applicable industry standards and based on the nature, location, and assistance required.",
    "",
    "Source: DAD Garage Website",
  ].join("\n");

  let sheetsSaved = false;

  if (!sheetsWebhookUrl) {
    console.error("Google Sheets integration is not configured: GOOGLE_SHEETS_WEBHOOK_URL is missing.");
  } else {
    try {
      const sheetsResponse = await fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizedLead),
      });

      if (!sheetsResponse.ok) {
        console.error("Google Sheets webhook failed with status:", sheetsResponse.status);
      } else {
        sheetsSaved = true;
      }
    } catch (error) {
      console.error("Google Sheets webhook request failed:", error instanceof Error ? error.message : "Unknown error");
    }
  }

  let telegramSent = false;

  if (!botToken || !chatId) {
    console.error("Telegram integration is not configured: missing server environment variables.");
  } else {
    try {
      const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });

      if (!telegramResponse.ok) {
        console.error("Telegram notification failed with status:", telegramResponse.status);
      } else {
        telegramSent = true;
      }
    } catch (error) {
      console.error("Telegram notification request failed:", error instanceof Error ? error.message : "Unknown error");
    }
  }

  if (!sheetsSaved) {
    return NextResponse.json({ error: "We could not save your request. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ success: true, leadId, telegramSent });
}