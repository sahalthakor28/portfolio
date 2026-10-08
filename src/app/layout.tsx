import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { PROFILE } from "@/lib/data";
import "./globals.css";

const inter = localFont({
  src: "../fonts/InterTight-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
const serif = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});
const mono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-mono",
  weight: "100 800",
  display: "swap",
});

const description = `${PROFILE.name}, ${PROFILE.headline.replaceAll(" | ", " · ")}. Based in ${PROFILE.location}.`;

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
