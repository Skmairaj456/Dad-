import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";
import { ServicesPageContent } from "@/components/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services | Deutsche Auto Den",
  description: "Automotive maintenance, repair, diagnostics, and performance services from Deutsche Auto Den.",
};

export default function ServicesPage() {
  return (
    <main className="flex flex-col">
      <PageShell
        eyebrow="Services"
        title={
          <>
            Precision care for
            <br />
            <span>every drive.</span>
          </>
        }
        intro="From preventative maintenance to focused performance work, every service starts with understanding the vehicle in front of us."
      >
        <section className="pb-8">
          <div className="mb-10 flex flex-col gap-3 border-b border-white/10 pb-6">
            <p className="eyebrow text-[10px]">DAD / Services</p>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/75">
              DAD MEETS YOUR CAR NEEDS
            </p>
          </div>

          <ServicesPageContent />

          <div className="mt-12 border-t border-white/10 pt-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">DAD / Booking</p>
                <h2 className="mt-3 text-[clamp(2rem,4vw,3.2rem)] font-black uppercase tracking-[-0.06em] leading-none">
                  Ready to service your car?
                </h2>
              </div>
              <Link
                href="/booking"
                className="brand-button inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white"
              >
                Book Your Service
              </Link>
            </div>
          </div>
        </section>
      </PageShell>
      <Footer />
    </main>
  );
}