import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { TechShowcase } from "@/components/TechShowcase";
import { BookingSection } from "@/components/BookingSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Services />
      <About />
      <TechShowcase />
      <BookingSection />
      <Footer />
    </main>
  );
}
