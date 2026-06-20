import { serverFetch } from "../server/serverFetch";

export const getLikes = async () => {
  return serverFetch("/api/allLikes");
};

export const getMyLikes = async (userId) => {
  return serverFetch(`/api/my-recipes-likes/${userId}`);
};
