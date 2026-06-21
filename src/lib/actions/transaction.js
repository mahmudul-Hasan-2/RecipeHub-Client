import { serverMutation } from "../server/serverMutation";

export const createTransaction = async (transactionPayload) => {
  return serverMutation("/api/transaction", transactionPayload, "POST");
};

