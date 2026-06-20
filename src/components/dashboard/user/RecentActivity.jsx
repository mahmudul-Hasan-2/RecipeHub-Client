import React from "react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      text: "Someone liked your 'Hyderabadi Biryani' recipe",
      time: "2 mins ago",
      type: "like",
    },
    {
      id: 2,
      text: "Your recipe 'Alfredo Pasta' reached 1k views",
      time: "1 hour ago",
      type: "milestone",
    },
    {
      id: 3,
      text: "You updated the ingredients of 'Red Velvet Cupcake'",
      time: "Yesterday",
      type: "edit",
    },
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.012)] h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
          Recent Activity
        </h3>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
          Stay updated with your profile logs
        </p>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-4 items-start p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 rounded-2xl transition-colors cursor-pointer"
          >
            <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 line-clamp-2 leading-snug">
                {activity.text}
              </p>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
