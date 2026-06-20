import React from "react";
import AddRecipeForm from "@/components/dashboard/user/AddRecipeForm";

const AddRecipePage = () => {
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
        <AddRecipeForm />
      </div>
    </div>
  );
};

export default AddRecipePage;
