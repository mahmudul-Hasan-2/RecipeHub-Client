"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FiHome, FiAlertTriangle } from "react-icons/fi";
import { Button } from "@heroui/react";

export default function NotFoundPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-14 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            opacity: isDark ? [0.2, 0.35, 0.2] : [0.4, 0.6, 0.4],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-[100px] sm:blur-[130px] transition-all duration-500
            ${isDark ? "bg-orange-500/10" : "bg-gradient-to-r from-orange-500/15 via-amber-400/15 to-transparent"}`}
        />
      </div>

      <div className="relative w-full max-w-[480px] z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`p-10 rounded-[32px] backdrop-blur-xl border transition-all duration-500
            ${
              isDark
                ? "bg-zinc-950/40 border-zinc-800/60 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)]"
                : "bg-white/40 border-white/40 shadow-[0_24px_60px_-15px_rgba(249,115,22,0.06)]"
            }`}
        >
          {/* Animated Illustration */}
          <div className="relative flex justify-center mb-6">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/20"
            >
              <span className="text-4xl font-black tracking-tighter select-none">
                404
              </span>
            </motion.div>

            {/* Decorative Floating Icon */}
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 right-1/3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-xl text-orange-500 shadow-md"
            >
              <FiAlertTriangle size={16} />
            </motion.div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-black tracking-tight text-zinc-800 dark:text-zinc-50 mb-3">
            Lost in the Kitchen?
          </h1>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-8 leading-relaxed">
            The recipe or page you are looking for doesn't exist or has been
            moved to another burner. Let's get you back to safety!
          </p>

          {/* Back Home Button */}
          <Button
            as={Link}
            href="/"
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm h-12 rounded-xl shadow-lg shadow-orange-500/10 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiHome size={16} />
            Back to Home
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
