import RecipeDetailsView from "@/components/recipes/RecipeDetailsView";
import { getRecipeById } from "@/lib/api/recipes";
import React from "react";

const RecipiesDetails = async ({ params }) => {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  return (
    <div>
      <RecipeDetailsView recipe={recipe}></RecipeDetailsView>
    </div>
  );
};

export default RecipiesDetails;
