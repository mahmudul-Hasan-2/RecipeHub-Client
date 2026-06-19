"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiChevronDown } from "react-icons/fi";

const FilterPanel = ({ currentSearch, currentCategory, currentCuisine }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    router.push(`/browse-recipes?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-5 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm dark:shadow-zinc-950/20 antialiased transition-colors duration-300">
      {/* 🔍 সার্চ ইনপুট সেকশন */}
      <div className="flex-1 max-w-md relative group">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 group-focus-within:text-orange-500 transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder="Search premium recipes..."
          value={currentSearch}
          onChange={(e) => updateParams("search", e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/30 text-sm font-medium text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-500 transition-all duration-200 shadow-inner"
        />
      </div>

      {/* 🎛️ ফিল্টার ড্রপডাউন গ্রুপ */}
      <div className="flex flex-wrap items-center gap-3">
        {/* ক্যাটাগরি ড্রপডাউন */}
        <div className="relative min-w-[160px]">
          <select
            value={currentCategory}
            onChange={(e) => updateParams("category", e.target.value)}
            className="w-full appearance-none pl-4 pr-10 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/30 text-sm font-bold text-zinc-600 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer [&>option]:bg-white [&>option]:dark:bg-zinc-900 [&>option]:text-zinc-800 [&>option]:dark:text-zinc-200"
          >
            <option value="">All Categories</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
          </select>
          <FiChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none"
            size={16}
          />
        </div>

        {/* কুইজিন ড্রপডাউন */}
        <div className="relative min-w-[160px]">
          <select
            value={currentCuisine}
            onChange={(e) => updateParams("cuisine", e.target.value)}
            className="w-full appearance-none pl-4 pr-10 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/30 text-sm font-bold text-zinc-600 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer [&>option]:bg-white [&>option]:dark:bg-zinc-900 [&>option]:text-zinc-800 [&>option]:dark:text-zinc-200"
          >
            <option value="">All Cuisines</option>
            <option value="Bangladeshi">Bangladeshi</option>
            <option value="Indian">Indian</option>
          </select>
          <FiChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none"
            size={16}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
