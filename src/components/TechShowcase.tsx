"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Settings, Activity, Disc } from "lucide-react";

export const TechShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const xRight = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="performance"
      ref={containerRef}
      className="py-32 bg-accent/5 relative overflow-hidden border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8"
          >
            Mechanical <br />
            <span className="text-accent">Pinnacle.</span>
          </motion.h2>
          
          <div className="space-y-8">
            {[
              { 
                icon: Settings, 
                title: "Precision Calibration", 
                text: "Every component is tuned to perfection using state-of-the-art digital tools and old-school craftsmanship." 
              },
              { 
                icon: Activity, 
                title: "Real-time Telemetry", 
                text: "We analyze live data from your vehicle's computer to ensure optimal fuel mapping and power delivery." 
              },
              { 
                icon: Disc, 
                title: "Braking Systems", 
                text: "High-performance brake upgrades from Brembo and Akebono for unmatched stopping power." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative h-[500px] flex items-center justify-center">
          {/* Crazy Animated Gears/Discs */}
          <motion.div 
            style={{ rotate }}
            className="absolute w-[400px] h-[400px] border-8 border-dashed border-white/10 rounded-full flex items-center justify-center"
          >
            <motion.div 
              style={{ rotate: useTransform(scrollYProgress, [0, 1], [360, 0]) }}
              className="w-[250px] h-[250px] border-4 border-accent/30 rounded-full flex items-center justify-center"
            >
              <div className="w-4 h-4 bg-accent rounded-full" />
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ x: xLeft }}
            className="absolute top-0 left-0 text-[10vw] font-black text-white/5 whitespace-nowrap pointer-events-none uppercase"
          >
            Performance • Precision • Power
          </motion.div>
          
          <motion.div 
            style={{ x: xRight }}
            className="absolute bottom-0 right-0 text-[10vw] font-black text-white/5 whitespace-nowrap pointer-events-none uppercase"
          >
            German • Engineering • Excellence
          </motion.div>

          <div className="relative z-10 p-12 bg-background border border-white/10 rounded-full shadow-2xl shadow-accent/20 animate-float">
             <Disc size={80} className="text-accent animate-spin-slow" />
          </div>
        </div>
      </div>
    </section>
  );
};
