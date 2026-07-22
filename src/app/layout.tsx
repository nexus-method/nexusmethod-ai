import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexus Method — AI Implementation for Service Businesses",
  description:
    "Molly Jaggers helps $500K–$5M service businesses install AI-powered revenue systems — so the business stops depending on the owner at every decision point.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
  },
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
    <html lang="en" className={inter.variable}>
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
