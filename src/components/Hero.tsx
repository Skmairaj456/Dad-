"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Grid/Effect */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-10 mt-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 scale-110 rounded-[1.6rem] bg-accent/20 blur-2xl" />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                className="relative shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
              >
                <Image
                  src="/brand-logo.jpg"
                  alt="Deutsche Auto Den Performance & Garage logo"
                  width={176}
                  height={176}
                  className="rounded-[0.9rem] object-cover shadow-[0_14px_30px_rgba(0,0,0,0.5)]"
                  priority
                />
              </motion.div>
            </div>
          </div>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-[0.3em] bg-accent/10 border border-accent/20 text-accent rounded-full">
            Est. 1998 • Precision Performance
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-8 leading-[0.85]">
            <span className="block text-gradient">Engineered</span>
            <span className="block text-accent">Excellence.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
            Welcome to <span className="text-white font-semibold">Deutsche Auto Den</span>. 
            Where German precision meets raw power. Experience the ultimate in automotive care and performance tuning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              className="group"
              onClick={() => scrollToSection("book-service")}
              aria-label="Book a service appointment"
            >
              Book Service
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("services")}
              aria-label="View our services section"
            >
              Our Services
            </Button>
          </div>
        </motion.div>

        {/* Floating Mechanical Elements */}
        <motion.div
          animate={{ 
            rotate: 360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -bottom-20 -left-20 w-80 h-80 border-[40px] border-white/5 rounded-full border-t-accent/20 hidden lg:block"
        />
        
        <motion.div
          animate={{ 
            rotate: -360,
            y: [0, 20, 0]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -top-20 -right-20 w-64 h-64 border-[30px] border-white/5 rounded-full border-b-accent/20 hidden lg:block"
        />
      </div>

    </section>
  );
};
