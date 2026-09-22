import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ContentBand, DetailList, PageShell } from "@/components/PageShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Why Choose Deutsche Auto Den",
	description: "Discover DAD's considered approach to diagnostics, repair, maintenance, and performance work in Hyderabad.",
	path: "/why-choose-dad",
});

export default function WhyChooseDadPage() { return <><PageShell eyebrow="Why Choose DAD" title={<>A better standard<br /><span>for the workshop.</span></>} intro="Good work is felt in the details: a more careful diagnosis, a clearer explanation, and a vehicle returned ready for the road ahead."><ContentBand><DetailList items={[{ title: "Precision diagnostics", text: "We begin with the problem in front of us and use diagnostics to understand it properly." }, { title: "Experienced hands", text: "Hands-on workshop knowledge meets a disciplined approach to modern vehicle systems." }, { title: "Transparent approach", text: "You stay informed about the work, the reason for it, and the next decision." }, { title: "Performance expertise", text: "When performance is the brief, upgrades are considered as a complete vehicle system." }]} /></ContentBand></PageShell><Footer /></>; }