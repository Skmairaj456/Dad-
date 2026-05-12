"use client";

import { motion } from "framer-motion";
import { Gauge, Cpu, Wrench, Shield, Zap, Car } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

const services = [
  {
    id: "performance-tuning",
    title: "Performance Tuning",
    description: "Unlock your engine's true potential with custom ECU remapping and hardware upgrades.",
    icon: Gauge,
    color: "text-red-500",
  },
  {
    id: "advanced-diagnostics",
    title: "Advanced Diagnostics",
    description: "Using OEM-level equipment to pinpoint issues with surgical precision.",
    icon: Cpu,
    color: "text-blue-500",
  },
  {
    id: "expert-maintenance",
    title: "Expert Maintenance",
    description: "Scheduled servicing using genuine parts to keep your machine in peak condition.",
    icon: Wrench,
    color: "text-green-500",
  },
  {
    id: "body-protection",
    title: "Body & Protection",
    description: "Premium detailing and ceramic coating for that showroom finish.",
    icon: Shield,
    color: "text-yellow-500",
  },
  {
    id: "electrical-works",
    title: "Electrical Works",
    description: "Specialized wiring and electrical system repairs for modern vehicles.",
    icon: Zap,
    color: "text-purple-500",
  },
  {
    id: "track-prep",
    title: "Track Prep",
    description: "Suspension tuning and safety installs for the weekend warrior.",
    icon: Car,
    color: "text-orange-500",
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
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4"
            >
              Mastering the <span className="text-accent">Machine.</span>
            </motion.h2>
            <p className="text-muted-foreground text-lg">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              id={service.id}
              className="group p-8 rounded-3xl bg-muted/50 border border-white/5 hover:border-accent/50 transition-colors"
            >
              <div className={cn("w-14 h-14 rounded-2xl bg-background flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform", service.color)}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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

