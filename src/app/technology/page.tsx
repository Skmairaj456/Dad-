import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";
import { TechShowcase } from "@/components/TechShowcase";

export const metadata: Metadata = { title: "Technology | Deutsche Auto Den", description: "Diagnostics, engineering, and technical expertise at Deutsche Auto Den." };

export default function TechnologyPage() { return <><PageShell eyebrow="Technology" title={<>Measure twice.<br /><span>Make it right.</span></>} intro="Technology is valuable when it leads to better decisions. DAD combines diagnostic thinking, live data, and practical workshop judgement."><TechShowcase /></PageShell><Footer /></>; }