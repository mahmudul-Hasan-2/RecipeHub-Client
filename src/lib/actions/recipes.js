import { serverMutation } from "../server/serverMutation";

export const addRecipe = async (recipe) => {
  return serverMutation("/api/recipes", recipe, "POST");
};

export const updateRecipe = async (recipe, id) => {
  return serverMutation(`/api/recipe/${id}`, recipe, "PATCH");
};

export const deleteRecipe = async (id) => {
  return serverMutation(`/api/myRecipe/${id}`, [], "DELETE");
};
