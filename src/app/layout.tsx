import React from "react";
import type { Metadata, Viewport } from "next";
import { cn } from "../lib/utils";
import { Inter as FontSans } from "next/font/google";
import LayoutClient from "./layout-client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { layoutPreferences } from "@/config/app-config";
import AppHeader from "@/components/app-header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "pwaapp",
  description:
    "pwaapp is a Progressive Web App example.",
  manifest: "/web.manifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Effi Rental"
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
      { url: "/apple-icon-180.png", sizes: "180x180" }
    ],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0ea5e9" }]
  }
};

export const viewport: Viewport = {
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <LayoutClient>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset
              data-content-layout={layoutPreferences.contentLayout}
              className={cn(
                "data-[content-layout=centered]:mx-auto! data-[content-layout=centered]:max-w-screen-2xl",
                "max-[113rem]:peer-data-[variant=inset]:mr-2! min-[101rem]:peer-data-[variant=inset]:peer-data-[state=collapsed]:mr-auto!",
              )}
            >
              <AppHeader />
              <div className="h-full p-4 md:p-6">{children}</div>
            </SidebarInset>
          </SidebarProvider>
        </LayoutClient>
      </body>
    </html>
  );
}
