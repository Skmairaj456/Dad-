"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";

type BookingForm = {
  fullName: string;
  phone: string;
  service: string;
  notes: string;
};

const initialState: BookingForm = {
  fullName: "",
  phone: "",
  service: "performance-tuning",
  notes: "",
};

const serviceOptions = [
  { value: "performance-tuning", label: "Performance Tuning" },
  { value: "expert-maintenance", label: "Expert Maintenance" },
  { value: "track-prep", label: "Track Prep" },
];

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(
      "Booking request sent successfully. Our team will contact you shortly to confirm."
    );
    setFormData((prev) => ({
      ...initialState,
      service: prev.service,
    }));
  };

  return (
    <section id="book-service" className="py-24 bg-muted/20 border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4"
        >
          Book Your <span className="text-accent">Service Visit</span>
        </motion.h2>
        <p className="text-muted-foreground mb-10 text-lg">
          Reserve an appointment for performance tuning, expert maintenance, or track prep.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5" aria-label="Service booking form">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide">Full name</span>
            <input
              required
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="rounded-xl border border-white/15 bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide">Phone</span>
            <input
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="rounded-xl border border-white/15 bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide">Service</span>
            <select
              required
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="rounded-xl border border-white/15 bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
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
              className="rounded-xl border border-white/15 bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Button type="submit" size="lg">
              Submit Booking
            </Button>
            <a
              href="tel:+497111234567"
              className="text-sm text-accent underline underline-offset-4"
            >
              Need immediate help? Call +49 711 123 4567
            </a>
          </div>
          <p className="text-sm text-green-400 min-h-6" aria-live="polite">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
};
