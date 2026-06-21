import { getTransactions } from "@/lib/api/transaction";
import { getSession } from "@/lib/core/session";
import PurchasedRecipeCard from "@/components/dashboard/user/PurchasedRecipeCard";
import React from "react";
import { redirect } from "next/navigation";

const PurchasedRecipes = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const transactions = await getTransactions(user?.id);

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-zinc-900 dark:text-white mb-2">
          My Purchased Recipes
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          History of all your successful transactions.
        </p>
      </div>

      {transactions && transactions.length > 0 ? (
        // সার্ভার সাইড ম্যাপ এখানে গ্রিড লেআউটের ভেতরে
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transactions.map((recipe) => (
            <PurchasedRecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold">No Purchased Recipes Found</h2>
          <p className="text-zinc-500">
            You haven't purchased any recipes yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default PurchasedRecipes;
