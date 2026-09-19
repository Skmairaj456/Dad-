import { Hero } from "@/components/Hero";
import { CampaignBanner } from "@/components/CampaignBanner";
import { FinalCta, HomeHub } from "@/components/HomeHub";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <CampaignBanner />
      <HomeHub />
      <FinalCta />
      <Footer />
    </main>
  );
}
