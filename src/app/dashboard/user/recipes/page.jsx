import { getMyRecipes } from "@/lib/api/recipes";
import { getSession } from "@/lib/core/session";
import React from "react";
import MyRecipeCard from "@/components/dashboard/MyRecipeCard";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

const MyRecipes = async () => {
  const session = await getSession();
  const user = session?.user;

  const myRecipes = (await getMyRecipes(user.id)) || []; // 💡 নিশ্চিত হও এই ফাংশনটা তোমার প্রজেক্টে আছে

  return (
    <div className="space-y-8 antialiased">
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-800 dark:text-zinc-100 md:text-3xl">
            My Recipes
          </h1>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Manage, edit, and track your published kitchen masterpieces.
          </p>
        </div>

        <Link
          href="/dashboard/user/recipes/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-bold shadow-md shadow-orange-500/10 hover:bg-orange-600 transition-all active:scale-95"
        >
          <FiPlus size={16} />
          Add New
        </Link>
      </div>

      {myRecipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-zinc-950/40 backdrop-blur-xl rounded-3xl border border-zinc-200/60 dark:border-zinc-800/80 text-center">
          <p className="text-zinc-400 dark:text-zinc-500 font-medium">
            You haven't added any recipes yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myRecipes.map((recipe) => (
            <MyRecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
