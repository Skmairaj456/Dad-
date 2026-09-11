"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Founder = {
  id: string;
  name: string;
  designation: string;
  image: string;
  imageAlt: string;
  bio: string;
  experience: string;
  specialization: string;
  quote: string;
  imagePosition: string;
};

const founders: Founder[] = [
  {
    id: "01",
    name: "Chandrakanth Reddy Kathi",
    designation: "Co-Founder & Head of Operations",
    image: "/founder-chandrakanth.jpeg",
    imageAlt: "Chandrakanth Reddy Kathi in the DAD Garage workshop",
    bio: "With 8 years of hands-on experience in advanced automotive diagnostics and repair, Chandrakanth Reddy leads our workshop operations. He specializes in German engineering, bringing dealership-level expertise to Audi, BMW and Mercedes-Benz vehicles. From complex engine diagnostics to precision tuning, Chandrakanth Reddy ensures every car receives elite care and factory-standard service.",
    experience: "8 years hands-on experience",
    specialization: "Audi / BMW / Mercedes-Benz / Diagnostics",
    quote: "Factory-standard thinking. Hands-on execution.",
    imagePosition: "center 46%",
  },
  {
    id: "02",
    name: "Pavan Kalyan Naidu Veerla",
    designation: "Managing Director & Principal Investor",
    image: "/founder-pavan.jpeg",
    imageAlt: "Pavan Kalyan Naidu Veerla in the DAD Garage workshop",
    bio: "As Co-Founder and Managing Director, Pavan Kalyan oversees the financial, commercial, and operational strategy of the business. With a passion for automotive excellence and a commitment to high-quality service, he established the garage to bridge the gap between dealership-level quality and honest, independent pricing.",
    experience: "Business vision and customer-first values",
    specialization: "Strategy / Operations / Automotive Excellence",
    quote: "Build trust into every part of the experience.",
    imagePosition: "center 43%",
  },
];

const FounderProfile = ({ founder, index }: { founder: Founder; index: number }) => {
  const profileRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: profileRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [shouldReduceMotion ? 0 : 18, shouldReduceMotion ? 0 : -18]);
  const isReversed = index % 2 === 1;

  return (
    <article ref={profileRef} className="border-t border-white/10 py-16 sm:py-24 lg:py-32">
      <div className={`relative -top-2 mx-auto grid w-full min-w-0 max-w-7xl items-center gap-10 px-5 sm:-top-3 sm:gap-14 sm:px-10 lg:-top-4 lg:grid-cols-2 lg:gap-20 lg:px-12 ${isReversed ? "lg:[&>div:first-child]:order-2" : ""}`}>
        <motion.div
          initial={false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] min-h-0 overflow-hidden bg-muted sm:min-h-[560px] lg:min-h-0"
        >
          <motion.div style={{ y: imageY }} className="absolute -inset-y-[4%] inset-x-0">
            <Image
              src={founder.image}
              alt={founder.imageAlt}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
                loading="eager"
              className="object-cover grayscale"
              style={{ objectPosition: founder.imagePosition }}
              priority={index === 0}
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          <div className={`absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-accent to-transparent ${isReversed ? "left-0" : "right-0"}`} />
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="min-w-0 max-w-xl"
        >
          <h3 className="max-w-full break-words text-4xl font-black uppercase leading-[0.92] tracking-tighter sm:text-6xl">
            {founder.name}
          </h3>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-white/70 sm:text-base">{founder.designation}</p>
          <div className="my-7 h-px w-20 bg-brand-gradient" />
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">{founder.bio}</p>

          <dl className="mt-8 grid gap-5 border-y border-white/10 py-6 text-xs uppercase tracking-[0.15em] sm:grid-cols-2">
            <div>
              <dt className="mb-2 text-accent-warm">Experience</dt>
              <dd className="leading-5 text-white/75">{founder.experience}</dd>
            </div>
            <div>
              <dt className="mb-2 text-accent-warm">Specialization</dt>
              <dd className="leading-5 text-white/75">{founder.specialization}</dd>
            </div>
          </dl>

          <p className="mt-7 max-w-md text-xl font-semibold leading-snug text-white sm:text-2xl">&ldquo;{founder.quote}&rdquo;</p>
        </motion.div>
      </div>
    </article>
  );
};

export const Founders = () => {
  return (
    <section id="founders" className="border-y border-white/5 bg-background">
      <header className="mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-10 sm:pb-24 sm:pt-28 lg:px-12 lg:pb-32">
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-accent">DAD / The Founders</p>
        <h2 className="max-w-3xl text-[clamp(2.25rem,11vw,4.5rem)] font-black uppercase leading-[0.92] tracking-tighter sm:text-7xl">
          The people <span className="text-brand-gradient">behind the Mission.</span>
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          Engineering discipline, workshop craft, and a clear vision for what independent automotive care should feel like.
        </p>
      </header>

      {founders.map((founder, index) => (
        <FounderProfile key={founder.id} founder={founder} index={index} />
      ))}

      <div className="mx-auto max-w-4xl border-t border-white/10 px-6 py-16 text-center sm:px-10 sm:py-24">
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-accent">How We Work Together</p>
        <p className="text-xl font-semibold leading-relaxed text-white sm:text-3xl sm:leading-snug">
          We built this garage on a simple formula: Pavan Kalyan Naidu Veerla brings the investment, business vision, and customer-first values, while Chandrakanth Reddy Kathi brings 8 years of elite, German-car mechanical expertise. Together, we give your car the precision care it deserves.
        </p>
      </div>
    </section>
  );
};