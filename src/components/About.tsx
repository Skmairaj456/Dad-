"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Clock3, ShieldCheck } from "lucide-react";

const highlights = [
  {
    icon: BadgeCheck,
    title: "Certified Technicians",
    text: "Our team is factory-trained on modern German performance and luxury systems.",
  },
  {
    icon: Clock3,
    title: "Transparent Timelines",
    text: "You receive clear milestones, status updates, and no hidden labor surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty-Backed Work",
    text: "Every major service package is backed by workmanship guarantees.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-5"
        >
          Built for Drivers. <span className="text-accent">Trusted by Experts.</span>
        </motion.h2>
        <p className="max-w-3xl text-muted-foreground mb-12 text-lg">
          Deutsche Auto Den combines dealership-grade diagnostics with custom
          performance craftsmanship for daily-driven and track-focused machines.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-muted/40 p-6"
            >
              <item.icon className="text-accent mb-4" size={26} />
              <h3 className="text-lg font-bold uppercase mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
