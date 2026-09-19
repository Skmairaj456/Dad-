"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "./Button";
import { CampaignBanner } from "./CampaignBanner";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const [introActive, setIntroActive] = useState(true);
  const [introTransitioning, setIntroTransitioning] = useState(false);
  const introVisible = introActive && !shouldReduceMotion;

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const transitionTimer = window.setTimeout(() => setIntroTransitioning(true), 950);
    const completeTimer = window.setTimeout(() => setIntroActive(false), 1850);

    return () => {
      window.clearTimeout(transitionTimer);
      window.clearTimeout(completeTimer);
    };
  }, [shouldReduceMotion]);

  const scrollToSection = (sectionId: string) => {
    window.location.href = sectionId === "services" ? "/services" : "/booking";
  };

  return (
    <section className="hero-section relative flex min-h-[min(780px,100svh)] items-center overflow-hidden pt-12 pb-12 sm:min-h-[680px] sm:pt-28 sm:pb-16 lg:min-h-screen">
      {introVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
          initial={{ opacity: 1 }}
          animate={{ opacity: introTransitioning ? 0 : 1 }}
          transition={{ duration: introTransitioning ? 0.7 : 0.2, delay: introTransitioning ? 0.35 : 0 }}
          aria-hidden="true"
        >
          <motion.div
            className="h-[220px] w-[220px]"
            initial={{ opacity: 0, scale: 0.78 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/brand-logo.jpg"
              alt=""
              width={220}
              height={220}
              className="h-full w-full object-cover mix-blend-screen"
              priority
            />
          </motion.div>
        </motion.div>
      )}

      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: introVisible ? 0 : 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-3 flex justify-center"
        >
          <div className="relative h-[140px] w-[140px] sm:h-[210px] sm:w-[210px] lg:h-[240px] lg:w-[240px]">
            <Image
              src="/brand-logo.jpg"
              alt="DAD logo"
              width={240}
              height={240}
              className="h-full w-full object-cover mix-blend-screen"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: introVisible ? 0 : 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hero-brand-lockup mx-auto mb-4 mt-0 sm:mb-7"
        >
          <div className="hero-identity">
            <p className="hero-brand-name">
              Deutsche <span>Auto Den</span>
            </p>
            <p className="hero-tagline">DAD MEETS YOUR CAR NEEDS</p>
            <div className="hero-eyebrow">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                Est. 2026 <span aria-hidden="true">•</span> Precision Performance
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: introVisible ? 0 : 1, y: introVisible ? 18 : 0 }}
          transition={{ delay: introVisible ? 0 : 0.12, duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="hero-supporting-title">
            <span>Engineered</span> <span>Excellence.</span>
          </h1>
          <p className="hero-supporting-copy">
            German precision for daily-driven and performance-focused machines.
          </p>

          <CampaignBanner />

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="md"
              className="group w-full max-w-xs uppercase tracking-[0.14em] sm:w-auto"
              onClick={() => scrollToSection("book-service")}
              aria-label="Book a service appointment"
            >
              Book Your Service
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="md"
              variant="outline"
              className="w-full max-w-xs uppercase tracking-[0.14em] sm:w-auto"
              onClick={() => scrollToSection("services")}
              aria-label="View our services section"
            >
              Explore Our Services
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
