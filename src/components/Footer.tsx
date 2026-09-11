"use client";

import { Mail, MapPin, Phone, Globe, MessageSquare, Share2 } from "lucide-react";
import { Button } from "./Button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer id="contact" className="bg-muted/30 pt-16 sm:pt-24 pb-10 sm:pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Image
                src="/brand-logo.jpg"
                alt="Deutsche Auto Den logo"
                width={42}
                height={42}
                className="object-cover mix-blend-screen"
              />
              <span className="text-xl font-black tracking-tighter uppercase">
                Deutsche <span className="text-accent">Auto Den</span>
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Precision German engineering for the modern automotive enthusiast. Experience the peak of performance.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageSquare, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href={i === 0 ? "https://deutscheautoden.com" : i === 1 ? "mailto:contact@deutscheautoden.com" : "#contact"}
                  aria-label={i === 0 ? "Visit website" : i === 1 ? "Email us" : "Share this page"}
                  className="w-10 h-10 border border-white/10 bg-white/[0.03] flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4 text-muted-foreground">
              {[
                { label: "Services", href: "#services" },
                { label: "About Us", href: "#about" },
                { label: "Performance Section", href: "#performance" },
                { label: "Book Service", href: "#book-service" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-accent transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Contact Us</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="text-accent flex-shrink-0" size={20} />
                <span>Central Park, <br /> Kondapur, Hyderabad, Telangana</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-accent flex-shrink-0" size={20} />
                <a href="tel:+497111234567" className="hover:text-accent transition-colors">
                  +91 9989195454
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="text-accent flex-shrink-0" size={20} />
                <a href="mailto:contact@deutscheautoden.com" className="hover:text-accent transition-colors">
                  contact@deutscheautoden.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-muted-foreground mb-4">Get the latest performance news and offers.</p>
            <form className="flex flex-col gap-3" aria-label="Newsletter signup">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
                <input 
                id="newsletter-email"
                type="email" 
                placeholder="Your email address"
                required
                className="bg-background border border-white/10 rounded-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Deutsche Auto Den. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
