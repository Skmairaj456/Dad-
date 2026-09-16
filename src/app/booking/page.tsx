import type { Metadata } from "next";
import { BookingSection } from "@/components/BookingSection";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = { title: "Book a Service | Deutsche Auto Den", description: "Request a service visit with Deutsche Auto Den in Hyderabad." };

export default function BookingPage() {
  return <><PageShell eyebrow="Booking" title={<>Your next service<br /><span>starts here.</span></>} intro="Share the essentials and our team will contact you to confirm the right next step for your vehicle."><BookingSection /></PageShell><Footer /></>;
}