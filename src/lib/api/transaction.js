import { protectedFetch } from "../server/protectedFetch";

export const getTransactions = (userId) => {
  return protectedFetch(`/api/transactions/${userId}`);
};
