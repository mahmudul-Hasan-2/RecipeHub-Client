import { getFavourites } from "@/lib/api/Favourites";
import React from "react";
import FavoriteCard from "@/components/dashboard/user/FavoriteCard"; // তোমার পাথ অনুযায়ী ইম্পোর্ট করো মামা
import { getSession } from "@/lib/core/session";

const FavoritesPage = async () => {
  const session = await getSession();
  const userId = session.user?.id;
  const favorites = await getFavourites(userId);

  return (
    <div className="space-y-8 w-full">
      {/* 🏷️ Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
          Your Bookmarked Recipes
        </h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
          Here are all the delicious recipes you have saved for later.
        </p>
      </div>

      {/* 📊 Favorites Grid */}
      {!favorites || favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-divider rounded-[2rem] bg-default-50/50">
          <p className="text-default-400 font-semibold text-sm">
            No favorite recipes saved yet. 🔖
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <FavoriteCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
