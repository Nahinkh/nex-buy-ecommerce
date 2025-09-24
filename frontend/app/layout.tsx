import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXBUY",
  description: "Your one-stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
       <SessionProvider>
         <Providers>
          {/* Navbar always on top */}
          <NavbarWrapper />

          {/* Main content */}
          <main className="flex-grow">{children}</main>

          {/* Global Toaster for notifications */}
          <Toaster position="top-center" richColors />

          {/* Footer at bottom */}
          <Footer />
        </Providers>
       </SessionProvider>
      </body>
    </html>
  );
}
