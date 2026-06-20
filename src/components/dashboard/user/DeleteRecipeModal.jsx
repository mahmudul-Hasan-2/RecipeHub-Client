"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiTrash2, FiX, FiLoader, FiAlertTriangle } from "react-icons/fi";
import toast from "react-hot-toast";
import { deleteRecipe } from "@/lib/actions/recipes"; // তোমার ডিলিট অ্যাকশন ইমপোর্ট করো
import { useRouter } from "next/navigation";

const DeleteRecipeModal = ({ recipe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await deleteRecipe(recipe._id);

      if (response?.deletedCount || response?.ok || response?.success) {
        toast.success("Recipe deleted successfully!");
        setIsOpen(false);
        router.refresh(); // লিস্ট আপডেট করার জন্য
      } else {
        toast.error("Failed to delete recipe. Please try again.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("An error occurred while deleting the recipe.");
    } finally {
      setIsDeleting(false);
    }
  };

  // 📋 Portal Modal Content
  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop (z-index এর উপরে টোস্ট দেখানোর জন্য Toaster-এ zIndex: 99999 সেট করে নিও মামা) */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={() => !isDeleting && setIsOpen(false)}
      />

      {/* Main Modal Panel */}
      <div className="relative w-full max-w-md rounded-[2rem] border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {/* Close Button */}
        {!isDeleting && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <FiX size={16} />
          </button>
        )}

        {/* Warning Icon */}
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto mb-5 border border-rose-500/20 animate-bounce">
          <FiAlertTriangle size={32} />
        </div>

        {/* Heading */}
        <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
          Delete Recipe?
        </h3>

        {/* Description */}
        <p className="text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed text-xs sm:text-sm">
          Are you sure you want to delete{" "}
          <span className="font-bold text-zinc-800 dark:text-zinc-200">
            "{recipe.recipeName || "this recipe"}"
          </span>
          ? This action cannot be undone and the dataset will be permanently
          removed.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-8">
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => setIsOpen(false)}
            className="flex-1 px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-xs font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="flex-1 px-5 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:bg-zinc-400 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-rose-500/10 transition-all active:scale-95"
          >
            {isDeleting ? (
              <>
                <FiLoader className="animate-spin" size={14} /> Deleting...
              </>
            ) : (
              <>
                <FiTrash2 size={14} /> Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 🗑️ Trash Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-rose-500 hover:text-white transition-all active:scale-95 flex items-center justify-center shadow-md border border-zinc-200 dark:border-zinc-800/60"
        title="Delete Recipe"
      >
        <FiTrash2 size={16} />
      </button>

      {/* 🚀 React Portal Magic */}
      {isOpen && mounted && createPortal(modalContent, document.body)}
    </>
  );
};

export default DeleteRecipeModal;
