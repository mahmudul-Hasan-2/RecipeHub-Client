import DashboardChart from "@/components/dashboard/user/DashboardChart";
import RecentActivity from "@/components/dashboard/user/RecentActivity";
import StatsGrid from "@/components/dashboard/user/StatsGrid";
import React from "react";

const UserDashboardHome = () => {
  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-900/20 p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
          Welcome back, Chef!
        </h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
          Here is what is happening with your recipes today.
        </p>
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DashboardChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
