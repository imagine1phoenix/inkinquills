import type { Metadata } from "next";
import { Schoolbell, Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Spotlight from "@/components/Spotlight";
import TopBar from "@/components/TopBar";
import "./globals.css";

const schoolbell = Schoolbell({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-ui",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ink in Quills — Literary Club",
    template: "%s | Ink in Quills",
  },
  description:
    "A community of readers, writers, and dreamers. Explore stories, poems, book reviews, and events from the Ink in Quills Literary Club.",
  keywords: [
    "literary club",
    "creative writing",
    "poetry",
    "book reviews",
    "student club",
  ],
  authors: [{ name: "Ink in Quills" }],
  openGraph: {
    title: "Ink in Quills — Literary Club",
    description:
      "A community of readers, writers, and dreamers. Explore stories, poems, book reviews, and events.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${schoolbell.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-midnight text-text-primary">
        <Spotlight />
        <TopBar />
        <main className="flex-1 pt-16 pb-32 relative z-10">{children}</main>
        <Navigation />
        <Footer />
      </body>
    </html>
  );
}
