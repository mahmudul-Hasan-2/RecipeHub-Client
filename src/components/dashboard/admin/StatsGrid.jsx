import React from "react";
import { FiUsers, FiAward, FiBookOpen, FiAlertTriangle } from "react-icons/fi";

const StatsGrid = ({
  totalUsers,
  totalPremiumUsers,
  totalRecipes,
  totalReports,
}) => {
  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <FiUsers size={20} />,
      color: "text-blue-500",
    },
    {
      title: "Premium Users",
      value: totalPremiumUsers,
      icon: <FiAward size={20} />,
      color: "text-amber-500",
    },
    {
      title: "Total Recipes",
      value: totalRecipes,
      icon: <FiBookOpen size={20} />,
      color: "text-emerald-500",
    },
    {
      title: "Total Reports",
      value: totalReports,
      icon: <FiAlertTriangle size={20} />,
      color: "text-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4"
        >
          <div
            className={`p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 ${stat.color}`}
          >
            {stat.icon}
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              {stat.title}
            </p>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {stat.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
