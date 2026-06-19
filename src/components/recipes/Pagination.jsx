"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PaginationComponent = ({
  currentPage,
  totalPages,
  perPage,
  totalItems = 0,
}) => {
  const router = useRouter();

  const page = Number(currentPage) || 1;
  const total = Number(totalPages) || 1;
  const itemsPerPage = Number(perPage) || 9;

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > total) return;
    router.push(`/browse-recipes?page=${newPage}&perPage=${itemsPerPage}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("ellipsis");

      const start = Math.max(2, page - 1);
      const end = Math.min(total - 1, page + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (page < total - 2) pages.push("ellipsis");
      pages.push(total);
    }
    return pages;
  };

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  if (total <= 1) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-12 pb-6 antialiased w-full">
      <p className="text-xs font-bold text-default-400 bg-default-100/70 dark:bg-zinc-900/50 px-3 py-1.5 rounded-xl border border-divider/20">
        Showing{" "}
        <span className="text-foreground font-black">
          {startItem}-{endItem}
        </span>{" "}
        of <span className="text-foreground font-black">{totalItems}</span>{" "}
        results
      </p>

      <div className="flex items-center gap-2 bg-white/50 dark:bg-zinc-950/20 backdrop-blur-md p-2 rounded-2xl border border-divider/40 shadow-sm">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className="flex items-center gap-1 px-3 py-2 cursor-pointer text-sm font-bold rounded-xl text-default-600 hover:bg-default-100 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
        >
          <FiChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-1.5">
          {getPageNumbers().map((p, i) =>
            p === "ellipsis" ? (
              <span
                key={`ellipsis-${i}`}
                className="w-10 h-10 flex items-center justify-center text-default-400 font-bold select-none"
              >
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-10 h-10 cursor-pointer flex items-center justify-center text-sm font-extrabold rounded-xl transition-all duration-200 ${
                  p === page
                    ? "bg-primary text-white  bg-blue-500 shadow-md shadow-primary/20 scale-105"
                    : "text-default-600 hover:bg-default-100 dark:hover:bg-zinc-900"
                }`}
              >
                {p}
              </button>
            ),
          )}
        </div>

        <button
          disabled={page === total}
          onClick={() => handlePageChange(page + 1)}
          className="flex items-center gap-1 cursor-pointer px-3 py-2 text-sm font-bold rounded-xl text-default-600 hover:bg-default-100 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
        >
          <span className="hidden sm:inline">Next</span>
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
