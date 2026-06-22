"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiArrowLeft, FiHome } from "react-icons/fi";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-4 bg-orange-100 dark:bg-orange-500/10 rounded-full"
          >
            <FiAlertTriangle className="text-orange-500" size={48} />
          </motion.div>
        </div>

        {/* Text */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-4">
          Access Denied
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
          Oops! It seems you don't have permission to view this page. You might
          have taken a wrong turn, or you're trying to access a restricted area.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20">
              <FiHome size={18} /> Back to Home
            </button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold rounded-xl transition-all"
          >
            <FiArrowLeft size={18} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ForbiddenPage;
