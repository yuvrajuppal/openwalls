import type { Metadata } from "next";
import { Suspense } from "react";
import { prodmode } from "@/utils/production";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingScreen from "@/components/LoadingScreen";
import { ThemeProvider } from "@/components/ThemeProvider";
import { StoreProvider } from "@/store/provider";
import AuthInitializer from "@/store/AuthInitializer";

import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL("https://openwalls.app"),
  title: {
    default: "OpenWalls | High-Resolution Minimalist Wallpapers",
    template: "%s | OpenWalls",
  },
  description: "Curated, high-resolution minimalist wallpapers for the modern interface.",
  icons: { icon: "/applogo.png", apple: "/applogo.png" },
  openGraph: {
    title: "OpenWalls",
    description: "Curated, high-resolution minimalist wallpapers for the modern interface.",
    url: "https://openwalls.app",
    siteName: "OpenWalls",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenWalls",
    description: "Curated, high-resolution minimalist wallpapers for the modern interface.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("h-full antialiased", "font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono:wght@400;500&family=Geist:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background font-body-md selection:bg-primary selection:text-on-primary">
        <StoreProvider>
        <ThemeProvider>
        <Suspense><ScrollToTop /></Suspense>
        <AuthInitializer />
        <LoadingScreen>
        {!prodmode && (
          <div className="sticky top-0 z-[60] w-full bg-surface-container-low border-b border-outline-variant">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between h-9">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-label-sm text-label-sm text-secondary tracking-wider">Under Development</span>
              </div>
              <span className="font-meta-data text-meta-data text-outline tracking-[0.2em] uppercase">DEV</span>
            </div>
          </div>
        )}
        <ToastContainer position="bottom-center" theme="dark" />
        {children}
        </LoadingScreen>
        </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
