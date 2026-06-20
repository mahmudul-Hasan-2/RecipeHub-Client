import { serverFetch } from "../server/serverFetch";

export const getFavourites = async (userId) => {
  return serverFetch(`/api/favorites?userId=${userId}`);
};
