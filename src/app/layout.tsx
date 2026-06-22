import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/store/cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zaaika — Authentic Indian Restaurant",
  description:
    "Order freshly made Indian food from Zaaika. Biryanis, curries, tandoor dishes and more — delivered to your door or ready for collection.",
  keywords: ["indian food", "biryani", "curry", "tandoor", "order online"],
  openGraph: {
    title: "Zaaika — Authentic Indian Restaurant",
    description: "Freshly made Indian food, ready when you are.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1742599361498-79824d24e355?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Butter chicken — signature dish at Zaaika",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#fafaf7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <body>
        <CartProvider>
          <a
            href="#menu"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-spice focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to menu
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
