"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // Clear cookies by calling an API route (recommended for httpOnly cookies)
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="px-8 py-8">
      <button
        onClick={handleLogout}
        className="px-6  py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Page;
