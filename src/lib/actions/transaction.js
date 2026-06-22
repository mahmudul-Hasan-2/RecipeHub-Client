import { protectedMutation } from "../server/protectedMutation";
import { serverMutation } from "../server/serverMutation";

export const createTransaction = async (transactionPayload) => {
  return protectedMutation(`/api/transactions`, transactionPayload, "POST");
};
