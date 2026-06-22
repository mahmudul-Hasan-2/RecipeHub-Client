import React from "react";
import AddRecipeForm from "@/components/dashboard/user/AddRecipeForm";
import { Button } from "@heroui/react";
import Link from "next/link";
import { getSession } from "@/lib/core/session";
import { getMyRecipes } from "@/lib/api/recipes";

// ধরি ইউজার ডেটা এবং রেসিপি কাউন্ট এভাবে পাচ্ছিস
const AddRecipePage = async () => {
  const data = await getSession();
  const user = data?.user;

  const recipes = await getMyRecipes(user?.id);
  const recipeCount = recipes?.length || 0;

  const MAX_FREE_RECIPES = 2;
  const isLimitReached = !user?.isPremium && recipeCount >= MAX_FREE_RECIPES;

  return (
    <div className="max-w-3xl mx-auto space-y-6 antialiased">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-800 dark:text-zinc-100 md:text-3xl">
          Add New Recipe
        </h1>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
          Share your culinary secret with the world. Fill up the details below.
        </p>
      </div>

      <div className="bg-white/70 dark:bg-zinc-950/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/80 shadow-sm">
        {isLimitReached ? (
          /* লিমিট শেষ হলে এই কার্ডটি দেখাবে */
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
            <div className="h-16 w-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-500">
              <span className="text-2xl">👑</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                Recipe Limit Reached
              </h3>
              <p className="text-sm text-zinc-500 max-w-sm mt-2">
                You have reached your limit of {MAX_FREE_RECIPES} recipes.
                Please upgrade to premium to add more recipes.
              </p>
            </div>
            <form action="/api/checkout_sessions" method="POST">
              <section>
                <input type="hidden" value="premiumUser" name="pricing-name" />
                <button type="submit" role="link">
                  <Button className="bg-orange-500 text-white font-bold px-8">
                    Upgrade to Premium
                  </Button>
                </button>
              </section>
            </form>
          </div>
        ) : (
          /* লিমিট শেষ না হলে ফর্ম দেখাবে */
          <AddRecipeForm />
        )}
      </div>
    </div>
  );
};

export default AddRecipePage;
