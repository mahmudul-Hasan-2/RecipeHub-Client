import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { getSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
const DashboardLayout = async ({ children }) => {
  const session = await getSession();
  if (!session?.user) redirect("/login");

  return (
    // গ্রিড লেআউট: সাইডবার ৬৪ পিক্সেল এর জন্য ফিক্সড, বাকিটুকু কন্টেন্ট
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[256px,1fr] bg-background">
      {/* Sidebar: গ্রিড কলাম ১ এ থাকবে */}
      <div className="hidden lg:block h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Main Content: গ্রিড কলাম ২ এ থাকবে */}
      <div className="w-full overflow-hidden flex flex-col">
        <main className="w-full flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
