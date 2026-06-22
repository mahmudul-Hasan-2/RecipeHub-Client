import { protectedFetch } from "../server/protectedFetch";

export const getTotalReports = async () => {
  return protectedFetch("/api/reports/counts");
};

export const getReports = async () => {
  return protectedFetch("/api/reports");
};
