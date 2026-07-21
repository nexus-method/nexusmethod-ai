import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus Method — AI Implementation for Service Businesses",
  description:
    "Molly Jaggers helps $500K–$5M service businesses install AI-powered revenue systems — so the business stops depending on the owner at every decision point.",
  openGraph: {
    title: "Nexus Method — AI Implementation for Service Businesses",
    description:
      "AI consulting and implementation for service businesses ready to scale without scaling headcount.",
    url: "https://nexusmethod.ai",
    siteName: "Nexus Method",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Method",
    description:
      "AI consulting and implementation for service businesses ready to scale without scaling headcount.",
  },
  metadataBase: new URL("https://nexusmethod.ai"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
