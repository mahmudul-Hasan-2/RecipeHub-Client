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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md p-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300">
      {/* Search Input */}
      <div className="flex-1 max-w-md relative group">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-500 transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder="Search recipes..."
          value={currentSearch}
          onChange={(e) => updateParams("search", e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-transparent bg-zinc-100 dark:bg-zinc-800 text-sm font-semibold text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:bg-white dark:focus:bg-zinc-950 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
        />
      </div>

      {/* Filter Selects */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            value={currentCategory}
            onChange={(e) => updateParams("category", e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 rounded-2xl border border-transparent bg-zinc-100 dark:bg-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-300 focus:bg-white dark:focus:bg-zinc-950 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none cursor-pointer"
          >
            <option value="">Categories</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Appetizer">Appetizer</option>
          </select>
          <FiChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
            size={16}
          />
        </div>

        <div className="relative">
          <select
            value={currentCuisine}
            onChange={(e) => updateParams("cuisine", e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 rounded-2xl border border-transparent bg-zinc-100 dark:bg-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-300 focus:bg-white dark:focus:bg-zinc-950 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none cursor-pointer"
          >
            <option value="">Cuisines</option>
            <option value="Bangladeshi">Bangladeshi</option>
            <option value="Indian">Indian</option>
            <option value="Asian">Asian</option>
          </select>
          <FiChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
            size={16}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
