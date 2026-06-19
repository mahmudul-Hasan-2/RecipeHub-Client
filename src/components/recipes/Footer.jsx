"use client";

import React, { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiArrowUpRight,
} from "react-icons/fi";
import { FaEgg, FaYoutube } from "react-icons/fa";

export default function AppFooter() {
  const { resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const quickLinks = [
    { name: "Home" },
    { name: "Browse Recipes" },
    { name: "About Us" },
    { name: "Privacy Policy" },
  ];

  const socialLinks = [
    { icon: <FiFacebook size={18} />, label: "Facebook" },
    { icon: <FiTwitter size={18} />, label: "Twitter" },
    { icon: <FiInstagram size={18} />, label: "Instagram" },
    { icon: <FaYoutube size={18} />, label: "Youtube" },
  ];

  return (
    <footer
      className={`relative w-full mt-10 border-t overflow-hidden transition-all duration-500
        ${
          isDark
            ? "bg-zinc-950/20 border-zinc-900 shadow-[0_-12px_40px_rgba(0,0,0,0.3)]"
            : "bg-white/40 border-orange-500/10 shadow-[0_-12px_40px_rgba(249,115,22,0.02)]"
        } backdrop-blur-xl`}
    >
      {/* 🌟 বটম ভাইব্রেন্ট গ্লো ইফেক্ট */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            opacity: isDark ? [0.3, 0.5, 0.3] : [0.5, 0.7, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute left-1/2 -bottom-40 -translate-x-1/2 h-72 w-[600px] rounded-full transition-all duration-500
            ${
              isDark
                ? "bg-orange-500/10 to-transparent blur-[70px]"
                : "bg-gradient-to-r from-orange-500/20 via-amber-400/15 to-transparent blur-[50px]"
            }`}
        />
      </div>

      {/* 📦 কন্টেন্ট র‍্যাপার */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 pb-12 border-b border-zinc-200/50 dark:border-zinc-800/50">
          {/* ১. লোগো ও ব্র্যান্ড ডেসক্রিপশন */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="group flex items-center gap-3 w-max cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20">
                <FaEgg
                  className="rotate-12 group-hover:rotate-45 transition-transform duration-300"
                  size={14}
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                Recipe
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent font-extrabold">
                  Hub
                </span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              Discover, cook, and share ultimate recipes from master chefs
              around the world. Elevate your culinary journey today.
            </p>

            {/* সোশ্যাল লিংকস (href ছাড়া) */}
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map((social, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -3 }}
                  className="h-9 w-9 rounded-xl flex items-center justify-center bg-zinc-100/80 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-500 hover:border-orange-500/30 transition-colors shadow-sm cursor-pointer"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* ২. কুইক লিংকস (href ছাড়া) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
              Quick Navigation
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button className="group inline-flex items-center gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors text-left cursor-pointer">
                    {link.name}
                    <FiArrowUpRight
                      size={14}
                      className="opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ৩. কন্টাক্ট ইনফরমেশন */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
              Contact & Support
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <li className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-orange-500/10 text-orange-500 border border-orange-500/10">
                  <FiMail size={14} />
                </div>
                <span className="hover:text-orange-500 transition-colors cursor-pointer">
                  support@recipehub.com
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-orange-500/10 text-orange-500 border border-orange-500/10">
                  <FiPhone size={14} />
                </div>
                <span className="hover:text-orange-500 transition-colors cursor-pointer">
                  +880 1700-000000
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-orange-500/10 text-orange-500 border border-orange-500/10 mt-0.5">
                  <FiMapPin size={14} />
                </div>
                <span className="max-w-xs leading-relaxed">
                  Level 4, Chef Tower, Banani, Dhaka, Bangladesh
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright সেকশন */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-zinc-500 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} RecipeHub. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with 🔥 by
            <span className="text-zinc-800 dark:text-zinc-300 hover:text-orange-500 dark:hover:text-orange-500 transition-colors cursor-pointer">
              Mahmudul Hasan Nirab
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
