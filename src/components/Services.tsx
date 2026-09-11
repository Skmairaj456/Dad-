"use client";

import { motion } from "framer-motion";
import { Gauge, Cpu, Wrench, Shield, Zap, Car } from "lucide-react";
import { Button } from "./Button";

const services = [
  {
    id: "performance-tuning",
    title: "Performance Tuning",
    description: "Unlock your engine's true potential with custom ECU remapping and hardware upgrades.",
    icon: Gauge,
  },
  {
    id: "advanced-diagnostics",
    title: "Advanced Diagnostics",
    description: "Using OEM-level equipment to pinpoint issues with surgical precision.",
    icon: Cpu,
  },
  {
    id: "expert-maintenance",
    title: "Expert Maintenance",
    description: "Scheduled servicing using genuine parts to keep your machine in peak condition.",
    icon: Wrench,
  },
  {
    id: "body-protection",
    title: "Body & Protection",
    description: "Premium detailing and ceramic coating for that showroom finish.",
    icon: Shield,
  },
  {
    id: "electrical-works",
    title: "Electrical Works",
    description: "Specialized wiring and electrical system repairs for modern vehicles.",
    icon: Zap,
  },
  {
    id: "track-prep",
    title: "Track Prep",
    description: "Suspension tuning and safety installs for the weekend warrior.",
    icon: Car,
  },
];

export const Services = () => {
  const scrollToBooking = (serviceId: string) => {
    const section = document.getElementById("book-service");
    if (section) {
      const url = new URL(window.location.href);
      url.searchParams.set("service", serviceId);
      window.history.replaceState({}, "", url.toString());
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6 sm:gap-8 border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[clamp(2rem,9vw,3.75rem)] md:text-6xl font-black uppercase tracking-tighter mb-4 leading-[0.95]"
            >
              Mastering the <span className="text-brand-gradient">Machine.</span>
            </motion.h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-7">
              We provide a comprehensive range of high-end automotive services tailored for German engineering and luxury vehicles.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => scrollToBooking("performance-tuning")}
            aria-label="Book a service appointment"
          >
            Book a Service
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              id={service.id}
              className="group border-t border-white/15 pt-6 hover:border-accent transition-colors"
            >
              <div className="flex items-center justify-between mb-7">
                <div className="w-10 h-10 border border-white/15 flex items-center justify-center text-accent">
                  <service.icon size={24} />
                </div>
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                {service.description}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-5"
                onClick={() => scrollToBooking(service.id)}
                aria-label={`Book ${service.title}`}
              >
                Book {service.title}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

