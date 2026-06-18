"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { Button } from "@heroui/react";

export default function AppBanner() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section className="relative w-full min-h-[20vh] flex items-center justify-center pt-24 pb-16 px-6 sm:px-8 overflow-hidden">
      {/* 🌟 ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট নিওন গ্লো (অরবিটিং আর্ট) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* গ্লো ১ - টপ রাইট */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            opacity: isDark ? [0.4, 0.6, 0.4] : [0.6, 0.8, 0.6],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -right-20 top-10 h-72 w-72 sm:h-96 sm:w-96 rounded-full blur-[60px] sm:blur-[90px] transition-all duration-500
            ${isDark ? "bg-orange-500/15" : "bg-orange-400/25"}`}
        />
        {/* গ্লো ২ - বটম লেফট */}
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            opacity: isDark ? [0.3, 0.5, 0.3] : [0.5, 0.7, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -left-20 bottom-10 h-72 w-72 sm:h-96 sm:w-96 rounded-full blur-[60px] sm:blur-[90px] transition-all duration-500
            ${isDark ? "bg-amber-500/10" : "bg-amber-400/20"}`}
        />
      </div>

      {/* 📦 মেইন কন্টেন্ট বক্স */}
      <div className="mx-auto max-w-5xl relative z-10 text-center flex flex-col items-center gap-6 sm:gap-8">
        {/* 🏷️ প্রিমিয়াম ব্যাজ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-flex items-center gap-1 md:gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-wide transition-all duration-500
            ${
              isDark
                ? "bg-zinc-900/60 border-zinc-800 text-orange-400 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                : "bg-orange-500/5 border-orange-500/20 text-orange-600 shadow-[0_4px_20px_rgba(249,115,22,0.02)]"
            } backdrop-blur-md`}
        >
          <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs">✨ Welcome to the Future of Cooking</span>
        </motion.div>

        {/* 📝 আল্ট্রা-বোল্ড টাইটেল */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-800 dark:text-zinc-50 max-w-4xl leading-[1.1]"
        >
          Cook Like a Master Chef with{" "}
          <span className="relative inline-block mt-2 sm:mt-0">
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              Ultimate Recipes
            </span>
          </span>
        </motion.h1>

        {/* 📖 ডেসক্রিপশন */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed font-medium px-4"
        >
          Explore thousands of premium, curated recipes with step-by-step
          interactive guidance. Elevate your daily dining experience and master
          the culinary arts.
        </motion.p>

        {/* 🎯 ইন্টারেক্টিভ সিটিএ বাটনস (CTA Section) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2 px-4"
        >
          {/* 🚀 প্রাইমারি বাটন (Explore Recipes) */}
          <Link href="/browse-recipes">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm h-12 px-8 rounded-2xl shadow-xl shadow-orange-500/20 hover:opacity-95 transition-all group flex items-center justify-center gap-2">
              Explore Recipes
              <FiArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Button>
          </Link>

          {/* 🎬 সেকেন্ডারি গ্লাস বাটন (Watch Video) */}
          <Link
            href="https://www.youtube.com/watch?v=M_sHIRT7hSA"
            target="_blank"
          >
            <Button
              rel="noopener noreferrer"
              variant="light"
              className={`w-full sm:w-auto font-bold text-sm h-12 px-8 rounded-2xl border transition-all flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer
              ${
                isDark
                  ? "bg-zinc-900/40 border-zinc-800 text-zinc-300 hover:bg-zinc-800/60"
                  : "bg-white/60 border-zinc-200 text-zinc-700 hover:bg-zinc-100/80"
              }`}
            >
              <FiPlay
                size={16}
                className="text-orange-500 fill-orange-500/20"
              />
              Watch Video
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
