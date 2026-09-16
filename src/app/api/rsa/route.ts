import { NextResponse } from "next/server";

type RsaPayload = {
  customerName?: unknown;
  phone?: unknown;
  vehicleMake?: unknown;
  vehicleModel?: unknown;
  location?: unknown;
  assistanceRequired?: unknown;
  additionalDetails?: unknown;
  latitude?: unknown;
  longitude?: unknown;
  termsAccepted?: unknown;
};

const getText = (value: unknown): string => typeof value === "string" ? value.trim() : "";
const createRequestId = (): string => `DAD-RSA-${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  let payload: RsaPayload;
  try {
    payload = (await request.json()) as RsaPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const values = {
    customerName: getText(payload.customerName),
    phone: getText(payload.phone),
    vehicleMake: getText(payload.vehicleMake),
    vehicleModel: getText(payload.vehicleModel),
    location: getText(payload.location),
    assistanceRequired: getText(payload.assistanceRequired),
    additionalDetails: getText(payload.additionalDetails),
  };
  const requiredFields = ["customerName", "phone", "vehicleMake", "vehicleModel", "location", "assistanceRequired"] as const;
  const missingField = requiredFields.find((field) => !values[field]);

  if (missingField || payload.termsAccepted !== true) {
    return NextResponse.json({ error: "Please complete the RSA form and accept the chargeable service terms." }, { status: 400 });
  }

  if (Object.values(values).some((value) => value.length > 4000)) {
    return NextResponse.json({ error: "One or more submitted fields are too long." }, { status: 400 });
  }

  const latitude = payload.latitude === null || payload.latitude === undefined || payload.latitude === "" ? null : Number(payload.latitude);
  const longitude = payload.longitude === null || payload.longitude === undefined || payload.longitude === "" ? null : Number(payload.longitude);
  if ((latitude !== null && (!Number.isFinite(latitude) || latitude < -90 || latitude > 90)) || (longitude !== null && (!Number.isFinite(longitude) || longitude < -180 || longitude > 180)) || (latitude === null) !== (longitude === null)) {
    return NextResponse.json({ error: "The location coordinates are invalid." }, { status: 400 });
  }

  const mapsLink = latitude !== null && longitude !== null ? `https://www.google.com/maps?q=${latitude},${longitude}` : null;

  const requestId = createRequestId();
  const normalizedRequest = {
    leadId: requestId,
    leadType: "RSA",
    dateTime: new Date().toISOString(),
    name: values.customerName,
    phone: values.phone,
    email: "-",
    carMake: values.vehicleMake,
    carModel: values.vehicleModel,
    year: "-",
    service: "Roadside Assistance (RSA)",
    rsa: "Yes",
    rsaLocation: values.location,
    latitude,
    longitude,
    googleMapsLink: mapsLink,
    assistanceRequired: values.assistanceRequired,
    additionalDetails: values.additionalDetails || "-",
    termsAccepted: true,
    status: "NEW",
    source: "DAD Garage Website / RSA",
  };

  let sheetsSaved = false;
  if (sheetsWebhookUrl) {
    try {
      const response = await fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizedRequest),
        signal: AbortSignal.timeout(10000),
      });
      const responseText = await response.text();
      let result: unknown = null;
      try { result = JSON.parse(responseText); } catch { /* Apps Script may return text. */ }
      sheetsSaved = response.ok && !(result && typeof result === "object" && "success" in result && (result as { success?: unknown }).success === false);
      if (!sheetsSaved) console.error("RSA Google Sheets webhook failed:", response.status, responseText);
    } catch (error) {
      console.error("RSA Google Sheets request failed:", error instanceof Error ? error.message : "Unknown error");
    }
  } else {
    console.error("Google Sheets integration is not configured for RSA.");
  }

  let telegramSent = false;
  if (botToken && chatId) {
    const telegramMessage = [
      "🆘 NEW RSA REQUEST", "", `Request: ${requestId}`, "", `Customer: ${values.customerName}`, `Phone: ${values.phone}`,
      "", "Vehicle:", `${values.vehicleMake} ${values.vehicleModel}`, "", "Assistance Required:", values.assistanceRequired,
      "", "📍 Location:", values.location, "", "GPS Coordinates:", latitude !== null && longitude !== null ? `${latitude}, ${longitude}` : "Not available",
      "", "Google Maps:", mapsLink || "Not available", "", "Additional Details:", values.additionalDetails || "-",
      "", "RSA services are chargeable as per applicable industry standards and based on the nature, location, and assistance required.",
    ].join("\n");
    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: telegramMessage }),
        signal: AbortSignal.timeout(10000),
      });
      telegramSent = response.ok;
      if (!telegramSent) console.error("RSA Telegram notification failed:", response.status, await response.text());
    } catch (error) {
      console.error("RSA Telegram request failed:", error instanceof Error ? error.message : "Unknown error");
    }
  } else {
    console.error("Telegram integration is not configured for RSA.");
  }

  if (!sheetsSaved) {
    return NextResponse.json({ success: false, error: "We could not save your RSA request right now. Please try again.", requestId, telegramSent }, { status: 502 });
  }

  return NextResponse.json({ success: true, requestId, telegramSent });
}
