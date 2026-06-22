import DashboardChart from "@/components/dashboard/user/DashboardChart";
import RecentActivity from "@/components/dashboard/user/RecentActivity";
import StatsGrid from "@/components/dashboard/user/StatsGrid";
import { getFavourites } from "@/lib/api/Favourites";
import { getLikes, getMyLikes } from "@/lib/api/Likes";
import { getMyRecipes } from "@/lib/api/recipes";
import { getSession } from "@/lib/core/session";
import React from "react";

const UserDashboardHome = async () => {
  const session = await getSession();
  const user = session?.user;

  const Recipes = await getMyRecipes(user?.id);

  const Favourites = await getFavourites(user?.id);

  const Likes = await getMyLikes(user?.id);

  return (
    // 🚀 এখানে max-w-7xl বাদ দিয়ে max-w-full বা w-full রাখা হয়েছে
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-900/20 p-6 md:p-10 space-y-8 w-full px-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
          Welcome back, Chef!
        </h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
          Here is what is happening with your recipes today.
        </p>
      </div>

      <StatsGrid recipes={Recipes} favourites={Favourites} likes={Likes} />

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
