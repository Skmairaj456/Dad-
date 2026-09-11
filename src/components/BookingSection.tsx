"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";

type BookingForm = {
  fullName: string;
  phone: string;
  email: string;
  carMake: string;
  carModel: string;
  year: string;
  service: string;
  notes: string;
  termsAccepted: boolean;
};

const initialState: BookingForm = {
  fullName: "",
  phone: "",
  email: "",
  carMake: "",
  carModel: "",
  year: "",
  service: "performance-tuning",
  notes: "",
  termsAccepted: false,
};

const serviceOptions = [
  { value: "general-service-maintenance", label: "General Service & Maintenance" },
  { value: "expert-maintenance", label: "Expert Maintenance" },
  { value: "engine-diagnostics", label: "Engine Diagnostics" },
  { value: "engine-repair", label: "Engine Repair" },
  { value: "performance-tuning", label: "Performance Tuning" },
  { value: "ecu-remapping", label: "ECU Remapping" },
  { value: "transmission-gearbox-service", label: "Transmission / Gearbox Service" },
  { value: "clutch-repair-replacement", label: "Clutch Repair & Replacement" },
  { value: "brake-service-upgrades", label: "Brake Service & Upgrades" },
  { value: "suspension-handling", label: "Suspension & Handling" },
  { value: "wheel-alignment", label: "Wheel Alignment" },
  { value: "tyre-service", label: "Tyre Service" },
  { value: "ac-service-repair", label: "AC Service & Repair" },
  { value: "electrical-battery", label: "Electrical & Battery" },
  { value: "cooling-system-radiator", label: "Cooling System / Radiator" },
  { value: "oil-filter-service", label: "Oil & Filter Service" },
  { value: "exhaust-performance-systems", label: "Exhaust & Performance Systems" },
  { value: "track-preparation", label: "Track Preparation" },
  { value: "track-prep", label: "Track Prep" },
  { value: "performance-upgrades", label: "Performance Upgrades" },
  { value: "preventive-maintenance", label: "Preventive Maintenance" },
  { value: "pre-purchase-inspection", label: "Pre-Purchase Inspection" },
  { value: "detailing-ceramic-coating", label: "Detailing & Ceramic Coating" },
  { value: "roadside-assistance", label: "Roadside Assistance (RSA) - Chargeable" },
  { value: "other-custom-requirement", label: "Other / Custom Requirement" },
];

const carMakes = [
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
];

const vehicleYears = Array.from({ length: 37 }, (_, index) => String(2026 - index));

const fieldClassName =
  "min-h-11 w-full rounded-sm border border-white/15 bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-accent";

export const BookingSection = () => {
  const [formData, setFormData] = useState<BookingForm>(() => {
    if (typeof window === "undefined") {
      return initialState;
    }

    const params = new URLSearchParams(window.location.search);
    const requestedService = params.get("service");

    if (requestedService && serviceOptions.some((option) => option.value === requestedService)) {
      return { ...initialState, service: requestedService };
    }

    return initialState;
  });
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error">("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "We could not send your request. Please try again.");
      }

      setStatusType("success");
      setStatus("Booking request sent successfully. Our team will contact you shortly to confirm.");
      setFormData((prev) => ({ ...initialState, service: prev.service }));
    } catch (error) {
      setStatusType("error");
      setStatus(error instanceof Error ? error.message : "We could not send your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-service" className="py-16 sm:py-24 bg-muted/20 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(2rem,9vw,3.25rem)] md:text-5xl font-black uppercase tracking-tighter mb-4 leading-[0.95]"
        >
          Book Your <span className="text-brand-gradient">Service Visit</span>
        </motion.h2>
        <p className="text-muted-foreground mb-8 sm:mb-10 text-lg">
          Tell us about you, your vehicle, and the service it needs.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 sm:gap-y-8" aria-label="Service booking form">
          <div className="md:col-span-2 border-b border-white/10 pb-3">
            <h3 className="text-lg font-bold uppercase tracking-wide">Customer Information</h3>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide">Full name</span>
            <input
              required
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide">Phone</span>
            <input
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-wide">Email</span>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={fieldClassName}
            />
          </label>

          <div className="md:col-span-2 border-b border-white/10 pb-3 pt-2">
            <h3 className="text-lg font-bold uppercase tracking-wide">Vehicle Information</h3>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide">Car make</span>
            <select
              required
              value={formData.carMake}
              onChange={(e) => setFormData({ ...formData, carMake: e.target.value })}
              className={fieldClassName}
            >
              <option value="">Select car make</option>
              {carMakes.map((make) => <option key={make} value={make}>{make}</option>)}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide">Car model</span>
            <input
              required
              type="text"
              value={formData.carModel}
              onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
              placeholder="e.g. M3 Competition"
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide">Year</span>
            <select
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className={fieldClassName}
            >
              <option value="">Select year</option>
              {vehicleYears.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </label>

          <div className="md:col-span-2 border-b border-white/10 pb-3 pt-2">
            <h3 className="text-lg font-bold uppercase tracking-wide">Service Requirement</h3>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide">Service</span>
            <select
              required
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className={fieldClassName}
            >
              {serviceOptions.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide">
              Service notes
            </span>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Tell us your goals, current setup, or issues."
              className={fieldClassName}
            />
          </label>

          <aside className="md:col-span-2 border border-accent/40 bg-accent/5 p-5">
            <h3 className="text-lg font-bold uppercase tracking-wide text-accent">Roadside Assistance (RSA)</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We provide Roadside Assistance (RSA) in and around Hyderabad.
            </p>
            <p className="mt-2 text-sm text-white">
              RSA services are chargeable as per applicable industry standards and based on the nature, location, and assistance required.
            </p>
          </aside>

          <div className="md:col-span-2 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
            <input
              id="terms-accepted"
              required
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
              className="mt-1 h-4 w-4 flex-shrink-0 accent-accent"
            />
            <label htmlFor="terms-accepted">
              I agree to the <a href="#terms-and-conditions" className="text-accent underline underline-offset-4">Terms &amp; Conditions</a>.
            </label>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <Button type="submit" size="lg" className="w-full sm:w-auto min-h-12" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit Booking"}
            </Button>
            <a
              href="tel:+497111234567"
              className="text-sm text-accent underline underline-offset-4"
            >
              Need immediate help? Call +91 9989195454
            </a>
          </div>
          <p className={`md:col-span-2 text-sm min-h-6 ${statusType === "error" ? "text-red-400" : "text-green-400"}`} aria-live="polite" role={statusType === "error" ? "alert" : "status"}>
            {status}
          </p>
        </form>

        <details id="terms-and-conditions" className="mt-10 border-t border-white/10 pt-6 text-sm text-muted-foreground">
          <summary className="cursor-pointer font-semibold uppercase tracking-wide text-white">Terms &amp; Conditions</summary>
          <p className="mt-4">
            Submitting a service request is an enquiry and does not automatically guarantee appointment confirmation. DAD Garage will contact you to confirm availability and next steps.
          </p>
          <p className="mt-3">
            Roadside Assistance (RSA) is a chargeable service. Applicable charges are determined based on the nature of assistance required, location, distance, and prevailing applicable industry standards.
          </p>
        </details>
      </div>
    </section>
  );
};
