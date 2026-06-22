import { protectedMutation } from "../server/protectedMutation";
import { serverMutation } from "../server/serverMutation";

export const addReport = async (report) => {
  return protectedMutation(`/api/report`, report, "POST");
};
