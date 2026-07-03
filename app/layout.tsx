import type { Metadata } from "next";
import { Cormorant_Garamond, Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import Footer from "@/components/Footer";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const cond = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cond",
  display: "swap",
});

const body = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ziarra — Adventure Starts Here",
  description: "Join or host student trips across Kenya with Ziarra.",
  icons: {
    icon: "/ziarra-mark.svg",
    shortcut: "/ziarra-mark.svg",
    apple: "/ziarra-mark.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${cond.variable} ${body.variable}`}>
      <body className="min-h-screen bg-bg font-body text-text antialiased">
        <ToastProvider>
          <div className="flex min-h-screen flex-col">
            <div className="flex flex-1 flex-col">{children}</div>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
