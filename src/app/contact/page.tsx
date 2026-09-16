import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = { title: "Contact | Deutsche Auto Den", description: "Contact Deutsche Auto Den in Hyderabad." };

export default function ContactPage() { return <><PageShell eyebrow="Contact" title={<>Let&apos;s talk<br /><span>about your car.</span></>} intro="For service enquiries, performance work, or roadside assistance, reach out and we will help you find the right next step."><section className="contact-grid"><a href="tel:+919989195454"><Phone /><span><small>Phone</small>+91 9989195454</span></a><a href="mailto:contact@deutscheautoden.com"><Mail /><span><small>Email</small>contact@deutscheautoden.com</span></a><div><MapPin /><span><small>Location</small>Hyderabad, Telangana</span></div></section><a className="brand-button inline-action-button" href="/booking">Book your service <span>↗</span></a></PageShell><Footer /></>; }