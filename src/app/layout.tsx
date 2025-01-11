import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/layout/MainNav";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpaceShare - On-Demand Co-Working Spaces",
  description: "Find and book co-working spaces by the hour, day, week, or month.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header>
            <MainNav userRole="user" />
          </header>
          <main className="min-h-screen bg-slate-50">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
