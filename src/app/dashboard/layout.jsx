import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex antialiased transition-colors duration-300">
      {/* বাম পাশে ফিক্সড সাইডবার */}
      <Sidebar />

      {/* ডান পাশে মেইন কন্টেন্ট এরিয়া */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0 pb-16 md:pb-0">
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
