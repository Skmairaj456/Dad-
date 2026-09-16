"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "./Button";

type RsaFormData = {
  customerName: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  location: string;
  assistanceRequired: string;
  additionalDetails: string;
  latitude: number | null;
  longitude: number | null;
  termsAccepted: boolean;
};

const initialState: RsaFormData = {
  customerName: "",
  phone: "",
  vehicleMake: "",
  vehicleModel: "",
  location: "",
  assistanceRequired: "",
  additionalDetails: "",
  latitude: null,
  longitude: null,
  termsAccepted: false,
};

const assistanceOptions = [
  "Vehicle Breakdown",
  "Flat Tyre",
  "Battery Issue",
  "Vehicle Won't Start",
  "Accident / Emergency Assistance",
  "Towing Required",
  "Other",
];

const fieldClassName =
  "min-h-11 w-full rounded-sm border border-white/15 bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-accent";

export function RsaForm() {
  const [formData, setFormData] = useState<RsaFormData>(initialState);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error">("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const updateField = (field: keyof RsaFormData, value: string | boolean) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const captureCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Unable to detect your location. Please enter your location manually.");
      return;
    }

    setIsLocating(true);
    setLocationStatus("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setFormData((current) => ({ ...current, latitude: coords.latitude, longitude: coords.longitude }));
        setLocationStatus("Current location captured");
        setIsLocating(false);
      },
      (error) => {
        const message = error.code === error.PERMISSION_DENIED
          ? "Location permission was denied. Please enter your location manually."
          : error.code === error.TIMEOUT
            ? "Location detection timed out. Please enter your location manually."
            : "Unable to detect your location. Please enter your location manually.";
        setLocationStatus(message);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/rsa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) throw new Error(result.error || "We could not send your RSA request.");

      setStatusType("success");
      setHasSubmitted(true);
    } catch (error) {
      setStatusType("error");
      setStatus(error instanceof Error ? error.message : "We could not send your RSA request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasSubmitted) {
    return (
      <section className="rsa-success rsa-panel" aria-labelledby="rsa-success-title">
        <Check size={28} aria-hidden="true" />
        <p className="eyebrow">RSA / Request Received</p>
        <h2 id="rsa-success-title">RSA request<br /><span>received.</span></h2>
        <p>Your roadside assistance request has been received. Our team will contact you shortly.</p>
        <div className="rsa-summary"><strong>{formData.vehicleMake} {formData.vehicleModel}</strong><span>{formData.location}</span></div>
        <div className="flex flex-wrap gap-4">
          <Link className="brand-button" href="/">Back to home <ArrowUpRight size={17} /></Link>
          <a className="rsa-call-link" href="tel:+919989195454">Call DAD</a>
        </div>
      </section>
    );
  }

  return (
    <section className="rsa-panel" aria-labelledby="rsa-form-title">
      <div className="rsa-panel-heading">
        <div>
          <p className="eyebrow">RSA / Request Assistance</p>
          <h2 id="rsa-form-title">Tell us where<br /><span>you are.</span></h2>
        </div>
        <div className="rsa-location-note"><MapPin size={18} /><span>Location is required<br />to dispatch help.</span></div>
      </div>

      <form onSubmit={handleSubmit} className="rsa-form" aria-label="Roadside assistance request form">
        <label><span>Customer name</span><input required type="text" value={formData.customerName} onChange={(event) => updateField("customerName", event.target.value)} className={fieldClassName} /></label>
        <label><span>Phone number</span><input required type="tel" value={formData.phone} onChange={(event) => updateField("phone", event.target.value)} className={fieldClassName} /></label>
        <label><span>Vehicle make</span><input required type="text" placeholder="e.g. BMW" value={formData.vehicleMake} onChange={(event) => updateField("vehicleMake", event.target.value)} className={fieldClassName} /></label>
        <label><span>Vehicle model</span><input required type="text" placeholder="e.g. 3 Series" value={formData.vehicleModel} onChange={(event) => updateField("vehicleModel", event.target.value)} className={fieldClassName} /></label>
        <div className="rsa-field-wide rsa-location-field">
          <span>Current location / breakdown location</span>
          <button type="button" className="rsa-location-button" onClick={captureCurrentLocation} disabled={isLocating}>
            {isLocating ? <LoaderCircle className="rsa-spin" size={17} /> : <MapPin size={17} />}
            {isLocating ? "Detecting location..." : "Use my current location"}
          </button>
          <label><span className="sr-only">Breakdown location / address</span><input required type="text" placeholder="Enter your current location, landmark or area" value={formData.location} onChange={(event) => updateField("location", event.target.value)} className={fieldClassName} /></label>
          <p className={`rsa-location-status ${locationStatus === "Current location captured" ? "is-success" : ""}`} aria-live="polite">{locationStatus}{formData.latitude !== null && formData.longitude !== null && <a href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`} target="_blank" rel="noreferrer">View location on Google Maps</a>}</p>
        </div>
        <label className="rsa-field-wide"><span>Assistance required</span><select required value={formData.assistanceRequired} onChange={(event) => updateField("assistanceRequired", event.target.value)} className={fieldClassName}><option value="">Select assistance needed</option>{assistanceOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
        <label className="rsa-field-wide"><span>Additional details</span><textarea rows={4} placeholder="Anything our team should know?" value={formData.additionalDetails} onChange={(event) => updateField("additionalDetails", event.target.value)} className={fieldClassName} /></label>

        <div className="rsa-field-wide rsa-form-actions">
          <label className="rsa-terms"><input required type="checkbox" checked={formData.termsAccepted} onChange={(event) => updateField("termsAccepted", event.target.checked)} /> <span>I agree that RSA is chargeable as per applicable industry standards and based on the nature, location, and assistance required.</span></label>
          <Button type="submit" size="lg" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Request RSA"} <ArrowUpRight size={17} /></Button>
        </div>
        <p className={`rsa-status ${statusType === "error" ? "is-error" : ""}`} aria-live="polite" role={statusType === "error" ? "alert" : "status"}>{status}</p>
      </form>
    </section>
  );
}
