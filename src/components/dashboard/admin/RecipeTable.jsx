"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { FiStar } from "react-icons/fi";
import DeleteRecipeModal from "@/components/recipes/DeleteRecipeModal";
import EditRecipeModal from "@/components/recipes/EditRecipeModal";
import toast from "react-hot-toast";
import { updateIsFeatured } from "@/lib/actions/recipes";

const RecipeTable = ({ recipes: initialRecipes }) => {
  // ১. স্টেট ব্যবহার করা যাতে পেজ রিফ্রেশ না হয়
  const [recipes, setRecipes] = useState(initialRecipes);

  useEffect(() => {
    setRecipes(initialRecipes);
  }, [initialRecipes]);

  const toggleFeatured = async (recipe) => {
    const newStatus = !recipe.isFeatured;

    // ২. অপ্টিমিস্টিক আপডেট (সাথে সাথে UI চেঞ্জ হবে)
    const previousRecipes = [...recipes];
    setRecipes((prev) =>
      prev.map((r) =>
        r._id === recipe._id ? { ...r, isFeatured: newStatus } : r,
      ),
    );

    const data = await updateIsFeatured(recipe._id, newStatus);

    if (data?.modifiedCount > 0) {
      toast.success("Recipe updated successfully!");
    } else {
      // যদি সার্ভারে এরর হয়, তবে আগের অবস্থায় ফিরে যাবে
      setRecipes(previousRecipes);
      toast.error("Failed to update recipe.");
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      {/* বর্ডার এবং ব্যাকগ্রাউন্ড কন্ট্রাস্ট ফিক্স করা হয়েছে */}
      <table className="w-full min-w-[800px] text-left border-collapse bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
            <th className="px-6 py-4">Recipe Name</th>
            <th className="px-6 py-4 text-center">Featured</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {recipes.map((recipe) => (
            <tr
              key={recipe._id}
              className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
            >
              <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                {recipe.recipeName}
              </td>

              <td className="px-6 py-4 text-center">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color={recipe.isFeatured ? "warning" : "default"}
                  onClick={() => toggleFeatured(recipe)}
                  className="mx-auto"
                >
                  <FiStar className={recipe.isFeatured ? "fill-current" : ""} />
                </Button>
              </td>

              <td className="px-6 py-4 flex justify-end gap-2">
                <EditRecipeModal recipe={recipe} />
                <DeleteRecipeModal recipe={recipe} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeTable;
