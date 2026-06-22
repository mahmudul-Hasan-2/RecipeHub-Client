import { protectedFetch } from "../server/protectedFetch";
import { serverFetch } from "../server/serverFetch";

export const getLikes = async () => {
  return serverFetch("/api/allLikes");
};

export const getMyLikes = async (userId) => {
  return protectedFetch(`/api/my-recipes-likes/${userId}`);
};
