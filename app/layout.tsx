import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";

const themeInitScript = `
  (function () {
    try {
      var theme = localStorage.getItem("theme");
      var isDark = theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", isDark);
    } catch (e) {}
  })();
`;

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Mock API",
  description: "A fake REST API for testing and prototyping."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full font-sans antialiased",
        geistSans.variable,
        geistMono.variable
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
