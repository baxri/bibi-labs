import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Get company information from environment variables
const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Lynxly";
const companyDescription = process.env.NEXT_PUBLIC_COMPANY_DESCRIPTION || "is a studio that designs and develops mobile, web and blockchain apps.";

export const metadata: Metadata = {
  title: companyName,
  description: `${companyName} ${companyDescription}`,
  icons: {
    icon: '/icon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       {children}
      </body>
    </html>
  );
}
