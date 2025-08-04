"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
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
  );
}
