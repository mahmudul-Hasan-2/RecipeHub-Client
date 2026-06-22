import { serverMutation } from "../server/serverMutation";

export const addFavouriteRecipe = async (recipe) => {
  return serverMutation(`/api/add-favourite`, recipe, "POST");
};

export const deleteFavouriteRecipe = async (recipeId) => {
  return serverMutation(`/api/favourite/${recipeId}`, {}, "DELETE");
};
