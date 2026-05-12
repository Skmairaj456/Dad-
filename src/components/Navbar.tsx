"use client";

import React, { useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(5, 5, 5, 0)", "rgba(5, 5, 5, 0.55)"]
  );
  const bookServiceLink = useMemo(() => "#book-service", []);

  return (
    <motion.nav
      style={{ backgroundColor }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="h-16 bg-transparent pl-1 pr-1 md:pl-0 md:pr-0 flex items-center justify-between"
        >
          <a href="#" className="flex items-center gap-3 min-w-0">
            <div className="leading-none min-w-0">
              <p className="text-base sm:text-lg font-black tracking-tight uppercase truncate">
                Deutsche <span className="text-accent">Auto Den</span>
              </p>
              <p className="hidden sm:block text-[10px] text-white/60 uppercase tracking-[0.28em] mt-1">
                Performance Garage
              </p>
            </div>
          </a>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href={bookServiceLink}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[11px] lg:text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-accent/90 transition-colors"
            >
              Book Now
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white w-10 h-10 rounded-full border border-white/15 bg-white/5 grid place-items-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden mx-4 sm:mx-6 mb-4 rounded-2xl border border-white/15 bg-black/85 px-6 py-6 flex flex-col gap-2"
        >
          <a
            href={bookServiceLink}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white"
            onClick={() => setIsOpen(false)}
          >
            Book Service
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};
