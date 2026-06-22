import { getReports } from "@/lib/api/reports";
import ReportTable from "@/components/dashboard/admin/ReportTable";
import { FiInbox } from "react-icons/fi"; // একটি সুন্দর আইকন

export default async function ReportsPage() {
  const reports = await getReports();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-black mb-6">User Reports</h1>

      {reports && reports.length > 0 ? (
        <ReportTable reports={reports} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50">
          <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
            <FiInbox size={32} />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            No reports yet
          </h3>
          <p className="text-zinc-500 mt-1">
            There are currently no user reports to review.
          </p>
        </div>
      )}
    </div>
  );
}
