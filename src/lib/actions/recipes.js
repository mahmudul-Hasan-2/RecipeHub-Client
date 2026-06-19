import { serverMutation } from "../server/serverMutation";

export const addRecipe = async (recipe) => {
  return serverMutation("/api/recipes", recipe, "POST");
};
