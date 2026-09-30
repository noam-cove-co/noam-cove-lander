import type { Metadata, Viewport } from "next";
import { Caveat, Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { site } from "@/config/site";
import { SiteChrome } from "@/components/site-chrome";
import { RouteTone, RouteToneScript } from "@/components/route-tone";
import { AttributionBeacon } from "@/components/attribution-beacon";
import { WaitlistProvider } from "@/components/waitlist";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const marker = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-marker",
  display: "swap",
});

/** Always absolute in production so OG crawlers never inherit a bad host. */
const PRODUCTION_SITE_URL = "https://getcove.cloud";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_SITE_URL;
const ogImage = {
  // Absolute URL: survives missing/wrong metadataBase on a stale deploy.
  url: `${PRODUCTION_SITE_URL}/campaign/own-drive/od-og-hero-cta.png`,
  secureUrl: `${PRODUCTION_SITE_URL}/campaign/own-drive/od-og-hero-cta.png`,
  width: 2400,
  height: 1260,
  type: "image/png",
  alt: "Cove: your own cloud drive, on your Mac. Crafted by NOAM Co.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cove | your own cloud drive, on your Mac",
    template: "%s | Cove",
  },
  description: site.description,
  applicationName: "Cove",
  keywords: [
    "Cove",
    "cloud drive for Mac",
    "Mac cloud storage",
    "mount cloud drive Mac",
    "Finder cloud drive",
    "NOAM Co",
    "private beta",
    "MacBook storage",
  ],
  authors: [{ name: "NOAM Co.", url: PRODUCTION_SITE_URL }],
  creator: "NOAM Co.",
  publisher: "NOAM Co.",
  appleWebApp: {
    capable: true,
    title: "Cove",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cove | your own cloud drive, on your Mac",
    description: site.description,
    url: PRODUCTION_SITE_URL,
    siteName: "Cove",
    locale: "en_GB",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cove | your own cloud drive, on your Mac",
    description: site.description,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f6f8",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cove",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "macOS",
  description: site.description,
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    price: "0",
    priceCurrency: "GBP",
  },
  creator: {
    "@type": "Organization",
    name: "NOAM Co.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${serif.variable} ${mono.variable} ${marker.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <RouteToneScript />
        <RouteTone />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-pine focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <WaitlistProvider>
          <AttributionBeacon pageEvent={false} />
          <SiteChrome>{children}</SiteChrome>
        </WaitlistProvider>
      </body>
    </html>
  );
}
