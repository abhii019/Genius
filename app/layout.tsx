"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation"; // ✅
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Genius | AI Platform",
//   description: "AI Platform",
// };

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup"; // ✅

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full relative">
          {/* Sidebar: only show if NOT on login/signup */}
          {!isAuthPage && (
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
              <Sidebar />
            </div>
          )}

          <main className={isAuthPage ? "" : "md:pl-72"}>
            {/* Navbar: only show if NOT on login/signup */}
            {!isAuthPage && <Navbar />}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
