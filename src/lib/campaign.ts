export const CAMPAIGN_NAME = "Free Inspection Campaign - Sep 19-27, 2026";
export const CAMPAIGN_SERVICE = "Free Complete Car Inspection";
export const CAMPAIGN_START_DATE = "2026-09-19";
export const CAMPAIGN_END_DATE = "2026-09-27";
export const CAMPAIGN_DATE_ERROR =
  "Please select a campaign date between 19 September and 27 September 2026.";

export const CAMPAIGN_DATES = [
  { value: "2026-09-19", weekday: "SAT", day: "19", month: "SEP" },
  { value: "2026-09-20", weekday: "SUN", day: "20", month: "SEP" },
  { value: "2026-09-21", weekday: "MON", day: "21", month: "SEP" },
  { value: "2026-09-22", weekday: "TUE", day: "22", month: "SEP" },
  { value: "2026-09-23", weekday: "WED", day: "23", month: "SEP" },
  { value: "2026-09-24", weekday: "THU", day: "24", month: "SEP" },
  { value: "2026-09-25", weekday: "FRI", day: "25", month: "SEP" },
  { value: "2026-09-26", weekday: "SAT", day: "26", month: "SEP" },
  { value: "2026-09-27", weekday: "SUN", day: "27", month: "SEP" },
] as const;

export const CAMPAIGN_TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
] as const;

export const CAMPAIGN_CAR_MAKES = [
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Volkswagen",
  "Porsche",
  "Volvo",
  "Jaguar",
  "Land Rover",
  "Toyota",
  "Honda",
  "Hyundai",
  "Kia",
  "Mahindra",
  "Tata",
  "Skoda",
  "Ford",
  "Jeep",
  "Nissan",
  "Renault",
  "MG",
  "Other",
] as const;

export const CAMPAIGN_VEHICLE_YEARS = Array.from(
  { length: 37 },
  (_, index) => String(2026 - index),
);

export const isCampaignDate = (value: string): boolean =>
  CAMPAIGN_DATES.some((date) => date.value === value);

export const isCampaignActive = (date = new Date()): boolean => {
  const campaignDate = date.toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });

  return isCampaignDate(campaignDate);
};
