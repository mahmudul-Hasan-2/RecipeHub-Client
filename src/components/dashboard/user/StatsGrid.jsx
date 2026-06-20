import React from "react";

// ধরলাম তোমার ডেটাগুলো props হিসেবে আসছে অথবা এখানে ডিফাইন করা আছে
const StatsGrid = ({ recipes = [], favourites = [], likes = [] }) => {
  const stats = [
    {
      id: 1,
      label: "Total Recipes",
      value: recipes.length, // এখানে রেসিপিগুলোর লেন্থ দেখাচ্ছে
      icon: "🍳",
    },
    {
      id: 2,
      label: "Total Favorites",
      value: favourites.length, // এখানে ফেভারিটগুলোর লেন্থ দেখাচ্ছে
      icon: "🔖",
    },
    {
      id: 3,
      label: "Likes Received",
      value: likes.toString(), // এখানে লাইকগুলোর সংখ্যা দেখাচ্ছে
      change: "+45 today",
      icon: "❤️",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white dark:bg-zinc-950 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.012)] flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              {stat.label}
            </span>
            <h4 className="text-3xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
              {stat.value}
            </h4>
            <span className="text-xs font-semibold text-emerald-500 dark:text-emerald-400 block">
              {stat.change}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-xl">
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
