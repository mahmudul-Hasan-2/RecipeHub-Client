import Link from "next/link";
import React from "react";

const MostLikedCard = ({ recipe }) => {
  return (
    <div className="group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 w-full">
      <div
        style={{
          height: "300px",
        }}
        className="w-full aspect-[4/3] overflow-hidden bg-zinc-50 dark:bg-zinc-800"
      >
        <img
          src={
            recipe.recipeImage ||
            "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=500"
          }
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1 text-sm text-rose-500 font-bold mb-2">
          <span>❤️</span>
          <span>{recipe.likesCount || 0} Likes</span>
        </div>

        <h3 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-lg tracking-tight line-clamp-1 group-hover:text-orange-500 transition-colors">
          {recipe.recipeName}
        </h3>

        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium mt-1">
          by {recipe.authorName || "Anonymous Chef"}
        </p>

        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-400 font-medium">
          <span>⏱ {recipe.preparationTime || "30 mins"}</span>
          <Link href={`/browse-recipes/${recipe._id}`} passHref>
            <span className="text-orange-500 font-bold group-hover:underline">
              View Details →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MostLikedCard;
