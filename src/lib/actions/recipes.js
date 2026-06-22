import { protectedMutation } from "../server/protectedMutation";

export const addRecipe = async (recipe) => {
  return protectedMutation("/api/recipes", recipe, "POST");
};

export const updateRecipe = async (recipe, id) => {
  return protectedMutation(`/api/recipe/${id}`, recipe, "PATCH");
};

export const deleteRecipe = async (id) => {
  return protectedMutation(`/api/myRecipe/${id}`, [], "DELETE");
};

export const updateLikeCount = async (recipeId, likedPayload) => {
  return protectedMutation(
    `/api/like/recipe/${recipeId}`,
    likedPayload,
    "PATCH",
  );
};
