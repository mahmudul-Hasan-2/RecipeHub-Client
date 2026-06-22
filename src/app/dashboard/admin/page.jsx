import StatsGrid from "@/components/dashboard/admin/StatsGrid";
import ActivityList from "@/components/dashboard/admin/ActivityList";
import OverviewChart from "@/components/dashboard/admin/OverviewChart";
import { getTotalRecipes } from "@/lib/api/recipes";
import { getTotalReports } from "@/lib/api/reports";
import { getTotalPremimumUsers, getTotalUsers } from "@/lib/api/users";
import React from "react";

const OverViewPage = async () => {
  // ডাটাগুলো প্যারালালি ফেচ করছি পারফরম্যান্সের জন্য
  const [totalUsers, totalPremiumUsers, totalRecipes, totalReports] =
    await Promise.all([
      getTotalUsers(),
      getTotalPremimumUsers(),
      getTotalRecipes(),
      getTotalReports(),
    ]);

  const userCount = totalUsers.filter(
    (user) => user.role !== "admin",
  ).length;

  return (
    <div className="p-8 space-y-8">
      {/* হেডার সেকশন */}
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Overview Dashboard
        </h2>
        <p className="text-sm text-zinc-500">
          Welcome back, Admin. Here is what's happening today.
        </p>
      </div>

      {/* স্ট্যাটাস গ্রিড */}
      <StatsGrid
        totalUsers={userCount}
        totalPremiumUsers={totalPremiumUsers}
        totalRecipes={totalRecipes}
        totalReports={totalReports}
      />

      {/* চার্ট এবং অ্যাক্টিভিটি সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* মেইন গ্রাফ - ২ ভাগ জায়গা নিবে */}
        <div className="lg:col-span-2">
          <OverviewChart />
        </div>

        {/* অ্যাক্টিভিটি লিস্ট - ১ ভাগ জায়গা নিবে */}
        <div className="lg:col-span-1">
          <ActivityList />
        </div>
      </div>
    </div>
  );
};

export default OverViewPage;
