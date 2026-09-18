"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CalendarDays, Check, Clock3 } from "lucide-react";
import Link from "next/link";
import { Button } from "./Button";
import {
  CAMPAIGN_CAR_MAKES,
  CAMPAIGN_DATES,
  CAMPAIGN_DATE_ERROR,
  CAMPAIGN_TIME_SLOTS,
  CAMPAIGN_VEHICLE_YEARS,
} from "@/lib/campaign";

type CampaignFormData = {
  fullName: string;
  phone: string;
  email: string;
  carMake: string;
  carModel: string;
  year: string;
  preferredDate: string;
  preferredTime: string;
  additionalDetails: string;
  termsAccepted: boolean;
};

const initialState: CampaignFormData = {
  fullName: "",
  phone: "",
  email: "",
  carMake: "",
  carModel: "",
  year: "",
  preferredDate: "",
  preferredTime: "",
  additionalDetails: "",
  termsAccepted: false,
};

const fieldClassName =
  "min-h-12 w-full rounded-sm border border-white/15 bg-background px-4 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-accent";

export function CampaignBooking({ isActive }: { isActive: boolean }) {
  const [formData, setFormData] = useState<CampaignFormData>(initialState);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const updateField = <K extends keyof CampaignFormData>(field: K, value: CampaignFormData[K]) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setStatus("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!formData.preferredDate) {
      setStatus(CAMPAIGN_DATE_ERROR);
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) throw new Error(result.error || "We could not send your request. Please try again.");

      setHasSubmitted(true);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "We could not send your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isActive) {
    return (
      <section className="campaign-closed" aria-labelledby="campaign-closed-title">
        <p className="eyebrow">DAD / Campaign Closed</p>
        <h2 id="campaign-closed-title">Campaign <span>closed.</span></h2>
        <p>The Free Complete Car Inspection campaign ran from 19 September to 27 September 2026.</p>
        <p>Thank you for your interest in Deutsche Auto Den.</p>
      </section>
    );
  }

  if (hasSubmitted) {
    return (
      <section className="campaign-success" aria-labelledby="campaign-success-title">
        <Check size={30} aria-hidden="true" />
        <p className="eyebrow">DAD / Request Received</p>
        <h2 id="campaign-success-title">Booking request<br /><span>received.</span></h2>
        <p>Your free inspection request has been received.</p>
        <p>Our team will contact you to confirm the inspection details.</p>
        <p className="campaign-success-date">19 SEP — 27 SEP 2026</p>
        <Link className="brand-button" href="/">Back to home <ArrowUpRight size={17} /></Link>
      </section>
    );
  }

  return (
    <section className="campaign-form-shell" aria-labelledby="campaign-form-title">
      <div className="campaign-form-heading">
        <div>
          <p className="eyebrow">DAD / Reserve Your Inspection</p>
          <h2 id="campaign-form-title">Book your<br /><span>free inspection.</span></h2>
        </div>
        <div className="campaign-form-note"><CalendarDays size={18} /><span>Preferred slots are requests.<br />Our team will confirm details.</span></div>
      </div>

      <form onSubmit={handleSubmit} className="campaign-form" aria-label="Free complete car inspection campaign form">
        <div className="campaign-form-section campaign-field-wide"><h3>Customer Information</h3></div>
        <label><span>Full name</span><input required type="text" value={formData.fullName} onChange={(event) => updateField("fullName", event.target.value)} className={fieldClassName} /></label>
        <label><span>Phone number</span><input required type="tel" value={formData.phone} onChange={(event) => updateField("phone", event.target.value)} className={fieldClassName} /></label>
        <label className="campaign-field-wide"><span>Email</span><input required type="email" value={formData.email} onChange={(event) => updateField("email", event.target.value)} className={fieldClassName} /></label>

        <div className="campaign-form-section campaign-field-wide"><h3>Vehicle Information</h3></div>
        <label><span>Car make</span><select required value={formData.carMake} onChange={(event) => updateField("carMake", event.target.value)} className={fieldClassName}><option value="">Select car make</option>{CAMPAIGN_CAR_MAKES.map((make) => <option key={make} value={make}>{make}</option>)}</select></label>
        <label><span>Car model</span><input required type="text" value={formData.carModel} onChange={(event) => updateField("carModel", event.target.value)} className={fieldClassName} placeholder="e.g. 3 Series" /></label>
        <label><span>Year</span><select required value={formData.year} onChange={(event) => updateField("year", event.target.value)} className={fieldClassName}><option value="">Select year</option>{CAMPAIGN_VEHICLE_YEARS.map((year) => <option key={year} value={year}>{year}</option>)}</select></label>
        <div className="campaign-form-section campaign-field-wide"><h3>Inspection Preference</h3></div>
        <label><span>Preferred date</span><select required value={formData.preferredDate} onChange={(event) => updateField("preferredDate", event.target.value)} className={fieldClassName}><option value="">Select inspection date</option>{CAMPAIGN_DATES.map((date) => <option key={date.value} value={date.value}>{date.day} September 2026</option>)}</select></label>
        <label><span>Preferred time</span><div className="campaign-input-with-icon"><Clock3 size={17} /><select required value={formData.preferredTime} onChange={(event) => updateField("preferredTime", event.target.value)} className={fieldClassName}><option value="">Select preferred time</option>{CAMPAIGN_TIME_SLOTS.map((slot) => <option key={slot} value={slot}>{slot}</option>)}</select></div></label>
        <label className="campaign-field-wide"><span>Additional details</span><textarea rows={4} value={formData.additionalDetails} onChange={(event) => updateField("additionalDetails", event.target.value)} className={fieldClassName} placeholder="Anything our team should know about your car?" /></label>

        <div className="campaign-terms campaign-field-wide"><input id="campaign-terms" required type="checkbox" checked={formData.termsAccepted} onChange={(event) => updateField("termsAccepted", event.target.checked)} /><label htmlFor="campaign-terms">I agree to the <a href="#campaign-terms-details">Terms &amp; Conditions</a>.</label></div>
        <div className="campaign-submit campaign-field-wide"><Button type="submit" size="lg" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Book Free Inspection"} <ArrowUpRight size={17} /></Button><p>Submitting a request does not automatically confirm an appointment. DAD will contact you to confirm availability.</p></div>
        <p className={`campaign-status campaign-field-wide ${status ? "is-visible" : ""}`} aria-live="polite" role="alert">{status}</p>
      </form>
    </section>
  );
}
