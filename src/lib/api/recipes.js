import { serverFetch } from "../server/serverFetch";

export async function getFeaturedRecipes() {
  return serverFetch("/api/recipes/featured");
}

export async function getRecipeById(recipeId) {
  return serverFetch(`/api/recipes/${recipeId}`);
}
