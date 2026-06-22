"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FiEdit, FiTrash2, FiStar } from "react-icons/fi";
import DeleteRecipeModal from "@/components/recipes/DeleteRecipeModal";
import EditRecipeModal from "@/components/recipes/EditRecipeModal";
import toast from "react-hot-toast";
import { updateIsFeatured } from "@/lib/actions/recipes";

const RecipeTable = ({ recipes }) => {
  // ফিচারড টগল করার ফাংশন
  const toggleFeatured = async (recipe) => {
    const featuredStatus = recipe.isFeatured ? false : true;

    console.log(recipe._id, featuredStatus);

    const data = await updateIsFeatured(recipe._id, featuredStatus);

    if (data?.modifiedCount > 0) {
      toast.success("Recipe updated successfully!");
      window.location.reload();
    } else {
      toast.error("Failed to update recipe. Please try again.");
    }
  };

  return (
    <div className="w-full overflow-x-auto relative">
      <table className="w-full min-w-[800px] text-left border-collapse">
        <thead>
          <tr className="bg-zinc-900 text-xs text-zinc-400 uppercase border-b border-zinc-800">
            <th className="px-6 py-4">Recipe Name</th>
            <th className="px-6 py-4 text-center">Featured</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {recipes.map((recipe) => (
            <tr
              key={recipe._id}
              className="hover:bg-zinc-800/30 transition-colors"
            >
              <td className="px-6 py-4 font-medium text-white">
                {recipe.recipeName}
              </td>

              {/* Featured Button */}
              <td className="px-6 py-4 text-center">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color={recipe.isFeatured ? "warning" : "default"}
                  onClick={() => {
                    toggleFeatured(recipe);
                  }}
                  className="mx-auto"
                >
                  <FiStar className={recipe.isFeatured ? "fill-current" : ""} />
                </Button>
              </td>

              {/* Edit & Delete Actions */}
              <td className="px-6 py-4 flex justify-end gap-2 relative z-20">
                <EditRecipeModal recipe={recipe}></EditRecipeModal>
                <DeleteRecipeModal recipe={recipe}></DeleteRecipeModal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeTable;
