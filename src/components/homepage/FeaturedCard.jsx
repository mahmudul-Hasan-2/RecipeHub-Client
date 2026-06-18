import React from "react";
import Image from "next/image";
import { FiClock, FiGlobe, FiTag } from "react-icons/fi";
import Link from "next/link";

const FeaturedCard = ({ recipe }) => {
  if (!recipe) return null;

  const {
    _id,
    recipeName,
    recipeImage,
    category,
    cuisineType,
    preparationTime,
  } = recipe;

  return (
    <Link href={`/browse-recipes/${_id}`}>
      <div className="group relative w-full rounded-3xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/40 backdrop-blur-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {/* 📸 রেসিপি ইমেজ সেকশন */}
        <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-4 bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={
              recipeImage ||
              "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=600"
            }
            alt={recipeName}
            fill
            sizes="(max-w-7xl) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          {/* ✨ Featured ব্যাজ */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
            Featured
          </div>
        </div>

        {/* 📝 রেসিপি কন্টেন্ট */}
        <div className="space-y-3">
          {/* ক্যাটাগরি ও কুইজিন ট্যাগ */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-500 dark:bg-orange-500/20">
              <FiTag size={12} />
              {category}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
              <FiGlobe size={12} />
              {cuisineType}
            </span>
          </div>

          {/* রেসিপি নাম */}
          <h3 className="text-lg font-extrabold text-zinc-800 dark:text-zinc-100 line-clamp-1 group-hover:text-orange-500 transition-colors duration-200">
            {recipeName}
          </h3>

          {/* 🕒 প্রিপারেশন টাইম সেকশন */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-900/60">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <FiClock size={14} className="text-amber-500" />
              <span className="text-xs font-semibold">Prep Time</span>
            </div>
            <span className="text-xs font-black text-zinc-700 dark:text-zinc-300">
              {preparationTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;
