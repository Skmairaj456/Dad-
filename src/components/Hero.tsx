"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "./Button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const logoTargetRef = useRef<HTMLDivElement>(null);
  const [introActive, setIntroActive] = useState(true);
  const [introTransitioning, setIntroTransitioning] = useState(false);
  const [logoTarget, setLogoTarget] = useState({ x: 0, y: 0, scale: 1 });
  const introVisible = introActive && !shouldReduceMotion;

  useEffect(() => {
    const target = logoTargetRef.current;
    if (!target) return;

    const measureTarget = () => {
      const rect = target.getBoundingClientRect();
      setLogoTarget({
        x: rect.left + rect.width / 2 - window.innerWidth / 2,
        y: rect.top + rect.height / 2 - window.innerHeight / 2,
        scale: rect.width / 220,
      });
    };

    measureTarget();

    if (shouldReduceMotion) {
      return;
    }

    const transitionTimer = window.setTimeout(() => setIntroTransitioning(true), 900);
    const completeTimer = window.setTimeout(() => setIntroActive(false), 1650);

    window.addEventListener("resize", measureTarget);
    return () => {
      window.clearTimeout(transitionTimer);
      window.clearTimeout(completeTimer);
      window.removeEventListener("resize", measureTarget);
    };
  }, [shouldReduceMotion]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[min(760px,100svh)] sm:min-h-[680px] lg:min-h-screen flex items-center pt-24 sm:pt-28 pb-14 sm:pb-20 overflow-hidden">
      {introVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
          initial={{ opacity: 1 }}
          animate={{ opacity: introTransitioning ? 0 : 1 }}
          transition={{ duration: introTransitioning ? 0.7 : 0.2, delay: introTransitioning ? 0.35 : 0 }}
          aria-hidden="true"
        >
          <motion.div
            className="w-[220px] h-[220px]"
            initial={{ x: 0, y: 0, scale: 1, opacity: 0.82 }}
            animate={introTransitioning ? { ...logoTarget, opacity: 1 } : { x: 0, y: 0, scale: 1, opacity: 1 }}
            transition={{
              duration: introTransitioning ? 0.72 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/brand-logo.jpg"
              alt=""
              width={220}
              height={220}
              className="w-full h-full object-cover mix-blend-screen"
              priority
            />
          </motion.div>
        </motion.div>
      )}

      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-6 text-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: introVisible ? 0 : 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hero-brand-lockup mb-5 sm:mb-7 mt-0 sm:mt-2 mx-auto"
          >
            <div ref={logoTargetRef} className="hero-logo-mark">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.7 }}
                className="relative"
              >
                <Image
                  src="/brand-logo.jpg"
                  alt="Deutsche Auto Den Performance & Garage logo"
                  width={220}
                  height={220}
                  className="hero-logo-image object-cover mix-blend-screen"
                  priority
                />
              </motion.div>
            </div>
            <div className="hero-eyebrow">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                Est. 2026 • Precision Performance
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: introVisible ? 0 : 1, y: introVisible ? 18 : 0 }}
            transition={{ delay: introVisible ? 0 : 0.12, duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="max-w-5xl mx-auto text-[clamp(2.5rem,13vw,4rem)] sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-6 sm:mb-8 leading-[0.92]">
              <span className="block text-gradient">Engineered</span>
              <span className="block text-brand-gradient">Excellence.</span>
            </h1>
            <p className="mx-auto mb-5 max-w-xl text-[clamp(1rem,3.5vw,1.35rem)] font-bold uppercase leading-tight tracking-[0.14em] text-accent sm:mb-6 sm:text-2xl">
              DAD MEETS YOUR CAR NEEDS
            </p>
            <p className="max-w-2xl mx-auto text-base md:text-xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed">
              Welcome to <span className="text-white font-semibold">Deutsche Auto Den</span>.
              Where German precision meets raw power. Experience the ultimate in automotive care and performance tuning.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="group w-full max-w-xs sm:w-auto"
                onClick={() => scrollToSection("book-service")}
                aria-label="Book a service appointment"
              >
                Book Service
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full max-w-xs sm:w-auto"
                onClick={() => scrollToSection("services")}
                aria-label="View our services section"
              >
                Our Services
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-16 right-6 lg:right-16 w-28 h-28 border border-white/10 border-l-accent/70 hidden lg:block"
        />
      </div>

    </section>
  );
};
