import { protectedMutation } from "../server/protectedMutation";

export const addFavouriteRecipe = async (recipe) => {
  return protectedMutation(`/api/add-favourite`, recipe, "POST");
};

export const deleteFavouriteRecipe = async (recipeId) => {
  return protectedMutation(`/api/favourite/${recipeId}`, {}, "DELETE");
};
