"use client";
import React from "react";
import DismissReportModal from "./DismissReportModal";
import DeleteRecipeModal from "./DeleteRecipeModal";

const ReportTable = ({ reports }) => {
  return (
    <div className="w-full">
      {/* ডেস্কটপ টেবিল ভিউ */}
      <div className="hidden md:block overflow-x-auto bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-500 uppercase border-b dark:border-zinc-800">
            <tr>
              <th className="px-6 py-4">Recipe</th>
              <th className="px-6 py-4">Reporter</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {reports.map((report) => (
              <tr
                key={report._id}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              >
                <td className="px-6 py-4 text-sm font-bold whitespace-nowrap">
                  {report.recipeName}
                </td>
                <td className="px-6 py-4 text-sm">
                  <p className="font-semibold">{report.reporterName}</p>
                  <p className="text-xs text-zinc-500">
                    {report.reporterEmail}
                  </p>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 px-2 py-1 rounded text-[10px] font-bold">
                    {report.reason}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <DismissReportModal report={report} />
                  <DeleteRecipeModal recipe={report} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* মোবাইল কার্ড ভিউ */}
      <div className="md:hidden flex flex-col gap-4">
        {reports.map((report) => (
          <div
            key={report._id}
            className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{report.recipeName}</h3>
              <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 px-2 py-1 rounded text-[10px] font-bold">
                {report.reason}
              </span>
            </div>
            <div className="text-xs text-zinc-500 mb-4">
              Reported by:{" "}
              <span className="font-semibold">{report.reporterName}</span>
            </div>
            <div className="flex gap-2 [&>*]:flex-1">
              <DismissReportModal report={report} />
              <DeleteRecipeModal recipe={report} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportTable;
