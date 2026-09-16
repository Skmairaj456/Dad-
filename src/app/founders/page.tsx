import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Founders } from "@/components/Founders";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = { title: "Founders | Deutsche Auto Den", description: "Meet the people behind Deutsche Auto Den." };

export default function FoundersPage() { return <><PageShell eyebrow="Founders" title={<>The people<br /><span>behind the mission.</span></>} intro="Engineering discipline, workshop craft, and a clear vision for what independent automotive care should feel like."><Founders /></PageShell><Footer /></>; }