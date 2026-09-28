import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { site } from "@/config/site";
import { MobileJoinBar, SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RouteTone, RouteToneScript } from "@/components/route-tone";
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:4317"),
  title: {
    default: "Cove — your own cloud drive, on your Mac",
    template: "%s — Cove",
  },
  description: site.description,
  applicationName: "Cove",
  appleWebApp: {
    capable: true,
    title: "Cove",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
  openGraph: {
    title: "Cove — your own cloud drive, on your Mac",
    description: site.description,
    locale: "en_GB",
    type: "website",
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
    <html lang="en-GB" className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`} suppressHydrationWarning>
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
          <SiteHeader />
          <div id="content" className="flex-1 pb-24 md:pb-0">
            {children}
          </div>
          <SiteFooter />
          <MobileJoinBar />
        </WaitlistProvider>
      </body>
    </html>
  );
}
