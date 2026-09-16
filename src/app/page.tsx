import { Hero } from "@/components/Hero";
import { FinalCta, HomeHub } from "@/components/HomeHub";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <HomeHub />
      <FinalCta />
      <Footer />
    </main>
  );
}
