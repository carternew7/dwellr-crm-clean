// app/layout.tsx
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutShell from "../components/LayoutShell";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "dwellr.ai CRM",
  description: "Smart CRM for manufactured and modular home retailers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-gray-50 text-gray-900">
      <body className={`${inter.className} antialiased`}>
        <LayoutShell>
          {children}
        </LayoutShell>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
