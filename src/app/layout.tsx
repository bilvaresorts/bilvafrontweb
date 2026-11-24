import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/Reveal";
import { WhatsAppFloat } from "@/components/WhatsApp";
import { site } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const description =
  "Own a two-bedroom private pool villa at Bilva Resorts, Gokarna. Enjoy it as your holiday home, or choose to make it available for holiday rentals.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bilva Resorts Gokarna: Private Pool Villas for Sale",
    template: "%s | Bilva Resorts",
  },
  description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: "Bilva Resorts Gokarna: Private Pool Villas for Sale",
    description,
  },
  twitter: { card: "summary_large_image" },
  // Kept out of search engines until launch (Gate 3 in the PRD).
  robots: site.launched ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior lets Next.js pause smooth scrolling while it changes page (see globals.css).
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${dmSans.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          {/* Clipped sideways so content sliding in from the right never widens the page. */}
          <main id="main" className="flex-1 overflow-x-clip">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
        </MotionProvider>
      </body>
    </html>
  );
}
