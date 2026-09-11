"use client";

import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Settings, Activity, Disc } from "lucide-react";

type GearRingProps = {
  className: string;
  viewBoxSize: number;
  center: number;
  teeth: number;
  toothHeight: number;
  radius: number;
  rotation: number;
  accent?: boolean;
};

const buildGearRingPath = (center: number, teeth: number, rootRadius: number, outerRadius: number, innerRadius: number) => {
  const points = (radius: number, count: number, offset = 0) =>
    Array.from({ length: count }, (_, index) => {
      const angle = ((index / count) * 360 + offset - 90) * (Math.PI / 180);
      const x = (center + Math.cos(angle) * radius).toFixed(3);
      const y = (center + Math.sin(angle) * radius).toFixed(3);
      return `${x} ${y}`;
    });

  const outerPoints = Array.from({ length: teeth }, (_, index) => {
    const toothStart = (index / teeth) * 360;
    const toothWidth = 0.42 * (360 / teeth);
    return [
      ...points(rootRadius, 1, toothStart - 180 / teeth),
      ...points(outerRadius, 1, toothStart - toothWidth / 2),
      ...points(outerRadius, 1, toothStart + toothWidth / 2),
      ...points(rootRadius, 1, toothStart + 180 / teeth),
    ];
  }).flat();

  return `M ${outerPoints.join(" L ")} Z M ${points(innerRadius, teeth * 4).join(" L ")} Z`;
};

const GearRing = ({ className, viewBoxSize, center, teeth, toothHeight, radius, rotation, accent = false }: GearRingProps) => {
  const gradientId = `gear-ring-metal-${viewBoxSize}`;
  const outerRadius = radius + toothHeight;
  const innerRadius = radius - (viewBoxSize === 400 ? 14 : 10);
  const path = buildGearRingPath(center, teeth, radius, outerRadius, innerRadius);
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} className={`gear-ring ${className}`} style={{ transform: `rotate(${rotation}deg)` }}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={accent ? "#b52a36" : "#c9cbd0"} />
          <stop offset="0.48" stopColor={accent ? "#d23b3b" : "#46484d"} />
          <stop offset="1" stopColor={accent ? "#d98235" : "#9b9da2"} />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill={`url(#${gradientId})`}
        fillRule="evenodd"
        stroke="#0b0b0c"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export const TechShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const scrollYProgress = useMotionValue(0);
  const [gearRotation, setGearRotation] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateScrollProgress = () => {
      frameId = 0;
      const section = containerRef.current;
      if (!section) return;

      const { top, height } = section.getBoundingClientRect();
      const progress = (window.innerHeight - top) / (window.innerHeight + height);
      const clampedProgress = Math.min(1, Math.max(0, progress));
      scrollYProgress.set(clampedProgress);
      const rotationRange = window.innerWidth < 640 ? 180 : 360;
      setGearRotation(shouldReduceMotion ? 0 : clampedProgress * rotationRange);
    };

    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [scrollYProgress, shouldReduceMotion]);

  const assemblyX = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const assemblyY = useTransform(scrollYProgress, [0, 1], [8, -8]);
  const assemblyRotation = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const backgroundNameLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const backgroundNameRight = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="performance"
      ref={containerRef}
      className="py-20 sm:py-32 bg-accent/5 relative overflow-hidden border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto min-w-0 px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8"
          >
            Mechanical <br />
            <span className="text-brand-gradient">Pinnacle.</span>
          </motion.h2>
          
          <div className="space-y-6 sm:space-y-8">
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
                initial={{ opacity: 0, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-4 sm:gap-6"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
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

        <div className="relative h-[300px] sm:h-[380px] lg:h-[500px] flex items-center justify-center">
          <motion.div
            style={{ x: backgroundNameLeft }}
            className="absolute top-8 left-0 z-0 hidden text-[clamp(3rem,10vw,9rem)] font-black uppercase leading-none tracking-tighter text-white/[0.045] whitespace-nowrap pointer-events-none select-none xl:block"
            aria-hidden="true"
          >
            Performance / Precision / Power
          </motion.div>

          <motion.div
            style={{ x: backgroundNameRight }}
            className="absolute bottom-8 right-0 z-0 hidden text-[clamp(3rem,10vw,9rem)] font-black uppercase leading-none tracking-tighter text-white/[0.045] whitespace-nowrap pointer-events-none select-none xl:block"
            aria-hidden="true"
          >
            Deutsche Auto Den
          </motion.div>

          <div className="gear-stage absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none">
            <motion.div
              style={shouldReduceMotion ? undefined : { x: assemblyX, y: assemblyY, rotate: assemblyRotation }}
              className="gear-ring-system"
              aria-label="Two concentric precision gear rings"
            >
              <div className="gear-ring-position gear-ring-outer-position">
                <GearRing className="gear-ring-outer" viewBoxSize={400} center={200} teeth={32} toothHeight={28} radius={174} rotation={gearRotation} />
              </div>
              <div className="gear-ring-position gear-ring-inner-position">
                <GearRing className="gear-ring-inner" viewBoxSize={250} center={125} teeth={24} toothHeight={20} radius={105} rotation={-gearRotation} accent />
              </div>
            </motion.div>
          </div>

           <div className="relative z-10 p-8 sm:p-12 bg-background border border-white/10 rounded-full shadow-xl shadow-black/40">
             <Disc size={64} className="text-accent sm:w-20 sm:h-20" />
          </div>
        </div>
      </div>
    </section>
  );
};
