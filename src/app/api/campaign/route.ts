import { NextResponse } from "next/server";
import {
  CAMPAIGN_CAR_MAKES,
  CAMPAIGN_DATE_ERROR,
  CAMPAIGN_NAME,
  CAMPAIGN_SERVICE,
  CAMPAIGN_TIME_SLOTS,
  CAMPAIGN_VEHICLE_YEARS,
  isCampaignDate,
} from "@/lib/campaign";

type CampaignPayload = {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  carMake?: unknown;
  carModel?: unknown;
  year?: unknown;
  preferredDate?: unknown;
  preferredTime?: unknown;
  additionalDetails?: unknown;
  termsAccepted?: unknown;
};

const getText = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const createLeadId = (): string =>
  `DAD-${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;

const isOneOf = <T extends string>(value: string, options: readonly T[]): value is T =>
  options.includes(value as T);

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const sheetsWebhookUrl = process.env.CAMPAIGN_GOOGLE_SHEETS_WEBHOOK_URL;

  let payload: CampaignPayload;

  try {
    payload = (await request.json()) as CampaignPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const values = {
    fullName: getText(payload.fullName),
    phone: getText(payload.phone),
    email: getText(payload.email),
    carMake: getText(payload.carMake),
    carModel: getText(payload.carModel),
    year: getText(payload.year),
    preferredDate: getText(payload.preferredDate),
    preferredTime: getText(payload.preferredTime),
    additionalDetails: getText(payload.additionalDetails),
  };

  if (
    !values.fullName ||
    !values.phone ||
    !values.email ||
    !values.carMake ||
    !values.carModel ||
    !values.year ||
    !values.preferredDate ||
    !values.preferredTime ||
    payload.termsAccepted !== true
  ) {
    return NextResponse.json(
      { error: "Please complete all required fields and accept the Terms & Conditions." },
      { status: 400 },
    );
  }

  if (!isCampaignDate(values.preferredDate)) {
    return NextResponse.json({ error: CAMPAIGN_DATE_ERROR }, { status: 400 });
  }

  if (
    !/^\S+@\S+\.\S+$/.test(values.email) ||
    values.email.length > 254 ||
    values.fullName.length > 120 ||
    values.phone.length > 30 ||
    values.carModel.length > 100 ||
    values.additionalDetails.length > 4000
  ) {
    return NextResponse.json({ error: "Please check the submitted details and try again." }, { status: 400 });
  }

  if (!isOneOf(values.carMake, CAMPAIGN_CAR_MAKES) || !isOneOf(values.year, CAMPAIGN_VEHICLE_YEARS)) {
    return NextResponse.json({ error: "Please select a valid vehicle make and year." }, { status: 400 });
  }

  if (!isOneOf(values.preferredTime, CAMPAIGN_TIME_SLOTS)) {
    return NextResponse.json({ error: "Please select a valid preferred time." }, { status: 400 });
  }

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
    service: CAMPAIGN_SERVICE,
    campaign: CAMPAIGN_NAME,
    preferredDate: values.preferredDate,
    preferredTime: values.preferredTime,
    additionalDetails: values.additionalDetails || "-",
    termsAccepted: true,
    status: "NEW",
  };

  const telegramMessage = [
    "🚗 NEW DAD CAMPAIGN LEAD",
    "",
    "FREE COMPLETE CAR INSPECTION",
    "",
    `Lead ID: ${leadId}`,
    "",
    `Name: ${values.fullName}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    "",
    `Vehicle: ${values.carMake} ${values.carModel}`,
    `Year: ${values.year}`,
    "",
    `Preferred Date: ${values.preferredDate}`,
    `Preferred Time: ${values.preferredTime}`,
    "",
    `Additional Details: ${values.additionalDetails || "-"}`,
    "",
    "Status: NEW",
  ].join("\n");

  if (!sheetsWebhookUrl) {
    console.error("Campaign Google Sheets integration is not configured.");
    return NextResponse.json(
      { error: "We could not save your request right now. Please try again." },
      { status: 500 },
    );
  }

  let sheetsSaved = false;

  try {
    const sheetsResponse = await fetch(sheetsWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalizedLead),
      signal: AbortSignal.timeout(10000),
    });
    const responseText = await sheetsResponse.text();

    console.log("Campaign Sheets status:", sheetsResponse.status);
    console.log("Campaign Sheets response:", responseText);

    let sheetsResult: unknown = null;

    try {
      sheetsResult = JSON.parse(responseText);
    } catch {
      // Apps Script may return plain text.
    }

    const applicationFailure =
      sheetsResult &&
      typeof sheetsResult === "object" &&
      "success" in sheetsResult &&
      (sheetsResult as { success?: unknown }).success === false;

    if (!sheetsResponse.ok || applicationFailure) {
      console.error("Campaign Google Sheets webhook failed:", sheetsResponse.status, responseText);
    } else {
      sheetsSaved = true;
    }
  } catch (error) {
    console.error(
      "Campaign Google Sheets request failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
  }

  if (!sheetsSaved) {
    return NextResponse.json(
      { error: "We could not save your request right now. Please try again." },
      { status: 502 },
    );
  }

  let telegramSent = false;

  if (!botToken || !chatId) {
    console.error("Telegram integration is not configured for campaign notifications.");
  } else {
    try {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: telegramMessage }),
          signal: AbortSignal.timeout(10000),
        },
      );

      if (!telegramResponse.ok) {
        console.error("Campaign Telegram notification failed:", telegramResponse.status, await telegramResponse.text());
      } else {
        telegramSent = true;
      }
    } catch (error) {
      console.error(
        "Campaign Telegram request failed:",
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  }

  return NextResponse.json({ success: true, leadId, telegramSent });
}
