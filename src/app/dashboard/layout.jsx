import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { getSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }) => {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  } else {
    return (
      <div className="min-h-screen bg-background text-foreground flex antialiased transition-colors duration-300">
        {/* বাম পাশে ফিক্সড সাইডবার */}
        <Sidebar />

        {/* ডান পাশে মেইন কন্টেন্ট এরিয়া */}
        {/* 🚀 min-w-full বাদ দিয়ে w-full এবং overflow-x-hidden দেওয়া হয়েছে */}
        <div className="flex-1 flex flex-col lg:pl-64 w-full overflow-x-hidden pb-16 lg:pb-0">
          {/* 🚀 max-w-7xl এবং mx-auto বাদ দিয়ে সম্পূর্ণ ফুল উইডথ (w-full) করা হয়েছে */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 w-full">{children}</main>
        </div>
      </div>
    );
  }
};

export default DashboardLayout;
