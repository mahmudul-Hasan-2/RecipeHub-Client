import { serverFetch } from "../server/serverFetch";

export async function getFeaturedRecipes() {
  return serverFetch("/api/recipes/featured");
}

export async function getRecipeById(recipeId) {
  return serverFetch(`/api/recipes/${recipeId}`);
}

export async function getRecipes(
  currentPage = 1,
  perPage = 12,
  search = "",
  category = "",
  cuisine = "",
) {
  return serverFetch(
    `/api/recipes?page=${currentPage}&perPage=${perPage}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&cuisine=${encodeURIComponent(cuisine)}`,
  );
}

export const getMyRecipes = async (authorId) => {
  return serverFetch(`/api/recipes/my/${authorId}`);
};
