import React from "react";

const StatsGrid = () => {
  const stats = [
    {
      id: 1,
      label: "Total Recipes",
      value: "14",
      change: "+2 this week",
      icon: "🍳",
    },
    {
      id: 2,
      label: "Total Views",
      value: "15.8k",
      change: "+12.3% growth",
      icon: "👁️",
    },
    {
      id: 3,
      label: "Total Likes",
      value: "2,430",
      change: "+45 today",
      icon: "❤️",
    },
    {
      id: 4,
      label: "Saved Recipes",
      value: "38",
      change: "Private collection",
      icon: "🔖",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
