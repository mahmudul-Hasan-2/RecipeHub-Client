import React from "react";
import Link from "next/link";

// প্রপস হিসেবে এখন শুধু {recipe} আসবে
const PurchasedRecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative h-56">
        <img
          src={recipe.recipeImage}
          alt={recipe.recipeName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
          {recipe.category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2">
          {recipe.recipeName}
        </h3>
        <div className="flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-6">
          <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
            {recipe.cuisineType}
          </span>
          <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
            {recipe.difficultyLevel}
          </span>
          <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
            {recipe.preparationTime}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <p className="text-lg font-bold text-zinc-900 dark:text-white">
            ৳{recipe.amount / 100}
          </p>
          <p className="text-[10px] text-zinc-400">By {recipe.authorName}</p>
        </div>

        <Link
          href={`/recipes/${recipe._id}`}
          className="mt-6 block w-full text-center py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PurchasedRecipeCard;
