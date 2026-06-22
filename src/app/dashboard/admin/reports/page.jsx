import { getReports } from "@/lib/api/reports";
import React from "react";

const ReportsPage = async () => {
  const reports = await getReports();
  return <div></div>;
};

export default ReportsPage;
