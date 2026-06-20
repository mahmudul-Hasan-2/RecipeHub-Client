"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", views: 1200, likes: 400 },
  { name: "Feb", views: 2100, likes: 700 },
  { name: "Mar", views: 1800, likes: 520 },
  { name: "Apr", views: 3400, likes: 1300 },
  { name: "May", views: 2900, likes: 1100 },
  { name: "Jun", views: 4500, likes: 1900 },
];

const DashboardChart = () => {
  return (
    <div className="bg-white dark:bg-zinc-950 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
          Analytics Overview
        </h3>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
          Monthly recipe views and likes engagement
        </p>
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" h="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f4f4f5"
              className="dark:stroke-zinc-800/40"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                borderRadius: "12px",
                border: "none",
                color: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#f97316"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorViews)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
