import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { CampaignBooking } from "@/components/CampaignBooking";
import { CAMPAIGN_END_DATE, CAMPAIGN_START_DATE, isCampaignActive } from "@/lib/campaign";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Free Complete Car Inspection",
  description: "Book a free complete car inspection with Deutsche Auto Den during the limited-time campaign from 19 September to 27 September 2026.",
  path: "/campaign",
});

export default function CampaignPage() {
  return (
    <>
      <main className="campaign-page">
        <section className="campaign-hero" aria-labelledby="campaign-title">
          <div className="campaign-hero-grid" aria-hidden="true" />
          <div className="content-wrap campaign-hero-inner">
            <div className="campaign-hero-copy">
              <p className="eyebrow">Limited-Time Campaign</p>
              <h1 id="campaign-title">Free Complete<br /><span>Car Inspection</span></h1>
              <p className="campaign-hero-intro">Give your car the attention it deserves.</p>
              <p className="campaign-hero-description">Book a complimentary complete vehicle inspection with Deutsche Auto Den during our limited-time inspection campaign.</p>
              <div className="campaign-hero-actions"><a className="brand-button" href="#campaign-booking">Book free inspection <span aria-hidden="true">↗</span></a><p><strong>19 SEP — 27 SEP 2026</strong><span>Limited availability during the campaign period.</span></p></div>
            </div>
            <div className="campaign-hero-mark" aria-hidden="true"><span>19</span><i>SEP</i><b>27</b><small>2026 / DAD</small></div>
          </div>
        </section>

        <section className="campaign-intro content-wrap" aria-labelledby="campaign-intro-title">
          <div><p className="eyebrow">DAD / The Inspection Campaign</p><h2 id="campaign-intro-title">A considered look at<br /><span>your car.</span></h2></div>
          <p>During this limited-time campaign, DAD is inviting drivers to request a complimentary complete vehicle inspection. Share your vehicle details and preferred slot; our team will contact you to confirm the inspection details.</p>
        </section>

        <div id="campaign-booking" className="content-wrap campaign-booking-wrap">
          <CampaignBooking isActive={isCampaignActive(new Date())} />
        </div>

        <section className="campaign-reassurance content-wrap" aria-label="Campaign reassurance">
          <p className="eyebrow">DAD / The Next Step</p>
          <p>Preferred dates and times are requests, not automatic confirmations. Our team will review your request and contact you with the inspection details.</p>
          <p className="campaign-reassurance-date">{CAMPAIGN_START_DATE.slice(8, 10)} SEP — {CAMPAIGN_END_DATE.slice(8, 10)} SEP 2026</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
