import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asistika — AI Personal Assistant",
  description: "Proactive AI assistant for life, work, study, and travel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="border-b border-[--color-border] sticky top-0 z-40 bg-[--color-background]/90 backdrop-blur">
          <div className="container-app flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-accent" />
              <span className="text-lg font-semibold tracking-tight">Asistika</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-[--color-muted]">
              <Link href="/" className="hover:text-[--color-foreground]">Home</Link>
              <Link href="/tasks" className="hover:text-[--color-foreground]">Tasks</Link>
              <Link href="/map" className="hover:text-[--color-foreground]">Map</Link>
              <Link href="/settings" className="hover:text-[--color-foreground]">Settings</Link>
            </nav>
            <ThemeToggle />
          </div>
        </header>
        <main className="container-app py-6">
          {children}
        </main>
      </body>
    </html>
  );
}