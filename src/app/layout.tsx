import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footers from "../components/Footers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের প্রতিদিনের বাজারদর দেখুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <div>
          {children}          
        </div>
       <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: "#ffffff",
      color: "#1f2937",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      fontSize: "14px",
    },
    success: {
      iconTheme: {
        primary: "#07883e",
        secondary: "#ffffff",
      },
    },
  }}
/>
        <Footers></Footers>
       </body>
    </html>
  );
}
