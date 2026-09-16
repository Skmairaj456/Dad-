import type { Metadata } from "next";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = { title: "About DAD | Deutsche Auto Den", description: "Learn about the independent, engineering-led approach at Deutsche Auto Den." };

export default function AboutPage() { return <><PageShell eyebrow="About DAD" title={<>Independent by choice.<br /><span>Precise by nature.</span></>} intro="Deutsche Auto Den is built around a simple belief: automotive care should be thoughtful, technically capable, and clear to the person who owns the car."><About /></PageShell><Footer /></>; }