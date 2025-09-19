import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster } from "sonner";
import { ReactNode } from "react";
import { RecaptchaProvider } from "@/lib/providers/RecaptchaProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "OptiGrid",
    description: "OptiGrid is a platform for optimizing grid operations",
    icons: {
      icon: "/logos/favicon.png",
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VEREFICATION,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} gradient-bg relative pb-9 font-sans antialiased`}
      >
        <RecaptchaProvider>
          <header>
            <NavBar />
          </header>
          <main id="main-content" role="main">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <Toaster richColors duration={3000} />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
