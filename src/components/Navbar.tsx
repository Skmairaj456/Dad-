"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin, Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Booking", href: "/booking" },
];

const extendedLinks = [
  { label: "SOS / RSA", href: "/rsa" },
  { label: "About DAD", href: "/about" },
  { label: "Our Vision", href: "/vision" },
  { label: "Why Choose DAD", href: "/why-choose-dad" },
  { label: "Technology", href: "/technology" },
  { label: "Performance", href: "/performance" },
  { label: "Founders", href: "/founders" },
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(5, 5, 5, 0)", "rgba(5, 5, 5, 0.55)"]
  );
  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <motion.nav
      style={{ backgroundColor }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="h-14 sm:h-16 bg-transparent pl-1 pr-1 md:pl-0 md:pr-0 flex items-center justify-between"
        >
          <Link href="/" className="flex min-w-0 items-center">
            <div className="leading-none min-w-0">
              <p className="brand-name truncate text-[0.95rem] font-black uppercase tracking-[0.08em] sm:text-lg">
                Deutsche <span className="text-accent">Auto Den</span>
              </p>
              <p className="mt-1 max-w-[230px] text-[9px] leading-tight text-white/75 uppercase tracking-[0.13em] sm:max-w-none sm:text-[10px] sm:tracking-[0.22em]">
                DAD MEETS YOUR CAR NEEDS
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <nav className="flex items-center gap-6" aria-label="Primary navigation">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`nav-link ${isActive ? "text-white" : ""}`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <a href="https://maps.app.goo.gl/XkDGHJzZ2Y3i8Zq38" target="_blank" rel="noreferrer" className="location-mark" aria-label="DAD location in Hyderabad">
              <MapPin size={14} /> Hyderabad
            </a>
            <a
              href="/booking"
              className="brand-button inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white lg:text-xs"
            >
              Book Now
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white w-11 h-11 min-h-11 rounded-sm border border-white/15 bg-white/5 grid place-items-center"
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
          className="md:hidden mx-4 sm:mx-6 mb-4 border border-white/15 bg-black/95 px-5 py-5 flex flex-col gap-2"
        >
          {[...links, ...extendedLinks].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center border-b border-white/10 px-1 text-sm font-bold uppercase tracking-[0.16em] text-white/75 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/booking"
            className="brand-button mt-2 inline-flex items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white"
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
