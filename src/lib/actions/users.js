import { serverMutation } from "../server/serverMutation";

const isPremium = { isPremium: true };

export const updateIsPremium = async (userId) => {
  return serverMutation(`/api/users/${userId}`, isPremium, "PATCH");
};
