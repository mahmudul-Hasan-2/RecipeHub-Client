import { mostLikedRecipes } from "@/lib/api/recipes";
import React from "react";
import MostLikedCard from "./MostLikedCard";

const MostLiked = async () => {
  const recipes = await mostLikedRecipes();

  return (
    <section className="py-16 bg-transparent my-6 px-6">
      <div className="container mx-auto">
        <div className="mb-12 text-left pl-1">
          <h2 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2 tracking-tight">
            Most Liked Recipes
          </h2>
          <p className="text-zinc-400 dark:text-zinc-500 font-normal text-base">
            The absolute favourites voted by our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes?.map((recipe) => (
            <MostLikedCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostLiked;
