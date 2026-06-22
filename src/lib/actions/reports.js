import { protectedMutation } from "../server/protectedMutation";
import { serverMutation } from "../server/serverMutation";

export const addReport = async (report) => {
  return protectedMutation(`/api/report`, report, "POST");
};

export const deleteReport = async (reportId) => {
  return protectedMutation(`/api/report/${reportId}`, {}, "DELETE");
};
