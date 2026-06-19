import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "OpenWalls | High-Resolution Minimalist Wallpapers",
  description: "Curated, high-resolution minimalist wallpapers for the modern interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono:wght@400;500&family=Geist:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background font-body-md selection:bg-primary selection:text-on-primary">{children}</body>
    </html>
  );
}
