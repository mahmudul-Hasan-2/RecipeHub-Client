"use client";

import React from "react";
import { FiClock, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import Link from "next/link";
import EditRecipeModal from "./EditRecipeModal";
import DeleteRecipeModal from "./DeleteRecipeModal";

const MyRecipeCard = ({ recipe }) => {
  if (!recipe) return null;

  const {
    _id,
    recipeName,
    recipeImage,
    category,
    preparationTime,
    likesCount,
    status,
  } = recipe;

  const statusColors = {
    approved: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20",
    rejected: "bg-rose-500/10 text-rose-500 dark:bg-rose-500/20",
  };

  return (
    <div className="group relative w-full rounded-3xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/40 backdrop-blur-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between h-full">
      <div>
        {/* Image Frame */}
        <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 bg-zinc-100 dark:bg-zinc-900">
          <img
            src={
              recipeImage ||
              "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=600"
            }
            alt={recipeName}
            className="w-full h-full object-cover"
          />

          <div
            className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm z-10 ${
              statusColors[status] || "bg-zinc-500/10 text-zinc-500"
            }`}
          >
            {status || "Pending"}
          </div>
        </div>

        {/* Content Info */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-orange-500 bg-orange-500/10 dark:bg-orange-500/20 px-2 py-0.5 rounded-md inline-block">
            {category}
          </span>

          <h3 className="text-base font-extrabold text-zinc-800 dark:text-zinc-100 line-clamp-1">
            {recipeName}
          </h3>

          <div className="flex items-center gap-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 pt-2">
            <div className="flex items-center gap-1.5">
              <FiClock size={13} className="text-amber-500" />
              <span>{preparationTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-400">Likes:</span>
              <span className="font-black text-zinc-700 dark:text-zinc-300">
                {likesCount || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="flex items-center gap-2 mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-900/60">
        {/* View Details Link */}
        <Link href={`/browse-recipes/${_id}`} className="flex-1">
          <button className="w-full py-2 rounded-xl text-xs font-bold bg-zinc-100/80 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white flex items-center justify-center gap-1.5 transition-all">
            <FiEye size={14} /> View
          </button>
        </Link>

        {/* ✏️ Edit Trigger Button (মোডাল ট্রিপ) */}
        <EditRecipeModal recipe={recipe} />

        {/* 🗑️ Delete Trigger Button (মোডাল ট্রিপ) */}
        <DeleteRecipeModal recipe={recipe} />
      </div>
    </div>
  );
};

export default MyRecipeCard;
