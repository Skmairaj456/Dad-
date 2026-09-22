import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { RsaButton } from "@/components/RsaButton";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_URLS } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Deutsche Auto Den | Performance Garage in Hyderabad",
    template: "%s | Deutsche Auto Den",
  },
  description: SITE_DESCRIPTION,
  keywords: ["car service Hyderabad", "automotive diagnostics Hyderabad", "performance tuning Hyderabad"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Deutsche Auto Den | Performance Garage in Hyderabad",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: "/brand-logo.jpg", alt: "Deutsche Auto Den logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deutsche Auto Den | Performance Garage in Hyderabad",
    description: SITE_DESCRIPTION,
    images: ["/brand-logo.jpg"],
  },
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoRepair",
              name: SITE_NAME,
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              logo: `${SITE_URL}/brand-logo.jpg`,
              image: `${SITE_URL}/brand-logo.jpg`,
              telephone: "+91 9989195454",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },
              sameAs: SOCIAL_URLS,
            }),
          }}
        />
        {children}
        <RsaButton />
      </body>
    </html>
  );
}
