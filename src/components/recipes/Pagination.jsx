"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PaginationComponent = ({ currentPage, totalPages, perPage }) => {
  const router = useRouter();

  const page = Number(currentPage) || 1;
  const total = Number(totalPages) || 1;
  const itemsPerPage = Number(perPage) || 9;

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > total) return;
    router.push(`/browse-recipes?page=${newPage}&perPage=${itemsPerPage}`);
  };

  if (total <= 1) return null;

  return (
    <div className="flex justify-center py-10">
      <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-2xl shadow-sm dark:shadow-none">
        {/* Previous Button */}
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-blue-500 hover:text-white transition-all disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        >
          <FiChevronLeft size={20} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {[...Array(total)].map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer ${
                  page === p
                    ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          disabled={page === total}
          onClick={() => handlePageChange(page + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
