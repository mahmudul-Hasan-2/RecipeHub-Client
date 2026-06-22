import { protectedFetch } from "../server/protectedFetch";

export const getUsers = async () => {
  return protectedFetch("/api/users");
};

export const getTotalUsers = async () => {
  return protectedFetch("/api/users/counts");
};

export const getTotalPremimumUsers = async () => {
  return protectedFetch("/api/users/premiums");
};
