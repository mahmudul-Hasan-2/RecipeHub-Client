import { serverFetch } from "../server/serverFetch";

export async function getFeaturedRecipes() {
  return serverFetch("/api/recipes/featured");
}

export async function getRecipeById(recipeId) {
  return serverFetch(`/api/recipes/${recipeId}`);
}

export async function getRecipes(currentPage = 1, perPage = 9) {
  return serverFetch(`/api/recipes?page=${currentPage}&perPage=${perPage}`);
}
