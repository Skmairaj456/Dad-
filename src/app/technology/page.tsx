import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";
import { TechShowcase } from "@/components/TechShowcase";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Automotive Diagnostics & Technology",
	description: "See how Deutsche Auto Den combines diagnostic thinking, live data, and practical workshop judgement.",
	path: "/technology",
	keywords: ["car diagnostics Hyderabad", "automotive technology Hyderabad", "engine diagnostics Hyderabad"],
});

export default function TechnologyPage() { return <><PageShell eyebrow="Technology" title={<>Measure twice.<br /><span>Make it right.</span></>} intro="Technology is valuable when it leads to better decisions. DAD combines diagnostic thinking, live data, and practical workshop judgement."><TechShowcase /></PageShell><Footer /></>; }