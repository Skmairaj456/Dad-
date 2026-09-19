import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CAMPAIGN_END_DATE, CAMPAIGN_SERVICE, isCampaignActive } from "@/lib/campaign";

export function CampaignBanner() {
  const isActive = isCampaignActive();

  return (
    <section className={`campaign-home-section ${isActive ? "is-active" : "is-closed"}`} aria-labelledby="campaign-home-title">
      <Link href="/campaign" className="campaign-home-banner">
        <div className="campaign-home-copy">
          <p className="eyebrow">{isActive ? "Limited Campaign" : "Campaign Closed"}</p>
          <h2 id="campaign-home-title">{isActive ? CAMPAIGN_SERVICE : "Free Inspection Campaign"}</h2>
          <p className="campaign-home-support">{isActive ? "Give your car the attention it deserves." : `The campaign ran through 27 September ${CAMPAIGN_END_DATE.slice(0, 4)}.`}</p>
        </div>
        <div className="campaign-home-meta">
          {isActive && <p className="campaign-home-dates">19 SEP — 27 SEP 2026</p>}
          <span className="campaign-home-cta">{isActive ? "Book Free Inspection" : "View Campaign"}<ArrowUpRight size={17} /></span>
        </div>
      </Link>
    </section>
  );
}
