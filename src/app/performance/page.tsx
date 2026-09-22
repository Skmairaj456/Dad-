import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageShell, DetailList } from "@/components/PageShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Performance Tuning & ECU Remapping in Hyderabad",
	description: "Considered performance tuning, ECU remapping, performance systems, and track preparation from Deutsche Auto Den.",
	path: "/performance",
	keywords: ["performance tuning Hyderabad", "ECU remapping Hyderabad", "performance upgrades Hyderabad"],
});

export default function PerformancePage() { return <><PageShell eyebrow="Performance" title={<>More capability.<br /><span>Still composed.</span></>} intro="Performance work at DAD is about usable improvement: tuning and hardware chosen around the car, the driver, and the way it needs to perform."><DetailList items={[{ title: "Performance tuning", text: "A considered path to sharper response and stronger everyday capability." }, { title: "ECU remapping", text: "Calibration work guided by the vehicle, its condition, and the intended use." }, { title: "Performance systems", text: "Exhaust, braking, suspension, and supporting upgrades treated as a system." }, { title: "Track preparation", text: "Focused preparation for drivers who want a more capable car when the road ends." }]} /><a className="inline-action" href="/booking?service=performance-tuning">Discuss a performance brief <span>↗</span></a></PageShell><Footer /></>; }