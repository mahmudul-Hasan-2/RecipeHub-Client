import { protectedMutation } from "../server/protectedMutation";
import { serverMutation } from "../server/serverMutation";

const isPremium = { isPremium: true };

export const updateIsPremium = async (userId) => {
  return protectedMutation(`/api/users/${userId}`, isPremium, "PATCH");
};

export const updateUserStatus = async (userId, status) => {
  return protectedMutation(
    `/api/users/update-status/${userId}`,
    { status },
    "PATCH",
  );
};
