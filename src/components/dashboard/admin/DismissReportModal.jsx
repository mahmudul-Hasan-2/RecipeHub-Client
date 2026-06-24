"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX, FiLoader, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { deleteReport } from "@/lib/actions/reports";
// এখানে তোমার dismiss করার অ্যাকশন ইমপোর্ট করবে
// import { dismissReport } from "@/lib/actions/reports";

const DismissReportModal = ({ report }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleDismiss = async () => {
    setIsDismissing(true);
    try {
      await deleteReport(report._id);
      toast.success("Report dismissed successfully!");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to dismiss report.");
    } finally {
      setIsDismissing(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => !isDismissing && setIsOpen(false)}
      />

      <div className="relative w-full max-w-md rounded-[2rem] border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {!isDismissing && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-200 transition-colors"
          >
            <FiX size={16} />
          </button>
        )}

        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto mb-5 border border-emerald-500/20">
          <FiCheckCircle size={32} />
        </div>

        <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
          Dismiss Report?
        </h3>

        <p className="text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed text-xs sm:text-sm">
          Are you sure you want to dismiss the report for{" "}
          <span className="font-bold">"{report.recipeName}"</span>? This will
          remove the report from your active queue.
        </p>

        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-xs font-bold transition-all active:scale-95"
          >
            Cancel
          </button>

          <button
            onClick={handleDismiss}
            disabled={isDismissing}
            className="flex-1 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-500/10 transition-all active:scale-95"
          >
            {isDismissing ? (
              <>
                <FiLoader className="animate-spin" size={14} /> Dismissing...
              </>
            ) : (
              "Confirm Dismiss"
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className=" p-2.5 rounded-xl  dark:bg-zinc-900 text-white hover:bg-emerald-500 hover:text-white transition-all border border-zinc-200 dark:border-zinc-800"
      >
        Dismiss Report <FiCheckCircle size={16} />
      </Button>

      {isOpen && mounted && createPortal(modalContent, document.body)}
    </>
  );
};

export default DismissReportModal;
