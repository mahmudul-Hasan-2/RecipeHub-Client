"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiCompass,
  FiHome,
  FiLogIn,
  FiUserPlus,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { FaEgg } from "react-icons/fa";
import { Button } from "@heroui/react";

export default function AppNavbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: <FiHome size={16} /> },
    { name: "Browse Recipes", href: "/recipes", icon: <FiCompass size={16} /> },
  ];

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.header
      animate={{
        scale: scrolled ? 0.99 : 1,
        y: scrolled ? 4 : 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed top-0 left-0 z-50 pt-4 px-4 w-full"
    >
      <div className="mx-auto max-w-7xl relative">
        {/* 🌟 ডাইনামিক গ্লো ইফেক্ট */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <motion.div
            animate={{
              opacity: isDark ? [0.5, 0.8, 0.5] : [0.7, 0.9, 0.7],
              scale: [1, 1.03, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute left-1/4 -top-24 h-48 w-80 rounded-full transition-all duration-500
              ${
                isDark
                  ? "bg-gradient-to-r from-orange-500/30 to-amber-500/20 blur-[50px]"
                  : "bg-gradient-to-r from-orange-500/45 via-amber-400/35 to-transparent blur-[35px]"
              }`}
          />
        </div>

        {/* 🪟 আল্ট্রা-প্রিমিয়াম গ্লাস বডি */}
        <div
          className={`relative overflow-hidden rounded-2xl transition-all duration-500 border
            ${
              scrolled
                ? isDark
                  ? "shadow-[0_12px_40px_-12px_rgba(249,115,22,0.12)] bg-zinc-950/40 border-zinc-800/40"
                  : "shadow-[0_12px_40px_-12px_rgba(249,115,22,0.18)] bg-white/60 border-orange-500/20"
                : isDark
                  ? "shadow-[0_8px_32px_0_rgba(0,0,0,0.02)] bg-zinc-950/40 border-zinc-800/40"
                  : "shadow-[0_8px_32px_0_rgba(249,115,22,0.06)] bg-white/60 border-orange-500/15"
            }
            backdrop-blur-xl`}
        >
          <div className="relative flex h-16 items-center justify-between px-6 sm:px-8">
            {/* Logo */}
            <div className="flex-1 flex justify-start">
              <Link href="/" className="group flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 transition-transform group-hover:scale-105">
                  <FaEgg
                    className="rotate-12 group-hover:rotate-45 transition-transform duration-300"
                    size={14}
                  />
                </div>
                <span className="text-base font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                  Recipe
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent font-extrabold">
                    Hub
                  </span>
                </span>
              </Link>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex justify-center">
              <ul className="flex items-center gap-1 bg-zinc-900/5 dark:bg-white/5 p-1 rounded-xl border border-zinc-200/20 dark:border-white/5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.name} className="relative">
                      <Link
                        href={link.href}
                        className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
                          isActive
                            ? "text-orange-500"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        }`}
                      >
                        {link.icon}
                        {link.name}
                        {isActive && (
                          <motion.div
                            layoutId="navActiveBg"
                            className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-lg shadow-sm -z-10 border border-zinc-200/50 dark:border-zinc-800/60"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Actions & Toggler */}
            <div className="flex-1 flex justify-end items-center gap-3">
              {/* 🌓 থিম টগল বাটন */}
              {mounted && (
                <button
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                  className="relative h-9 w-9 rounded-xl flex items-center justify-center bg-zinc-100 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300 transition-all duration-200 shadow-sm overflow-hidden"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={resolvedTheme}
                      initial={{ y: -20, opacity: 0, rotate: 45 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 20, opacity: 0, rotate: -45 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      {resolvedTheme === "dark" ? (
                        <FiSun
                          size={16}
                          className="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                        />
                      ) : (
                        <FiMoon size={16} className="text-indigo-600" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </button>
              )}

              {/* Desktop Auth Buttons (এখানে বড় ডিভাইসের জন্য আইকন যোগ করা হয়েছে) */}
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  as={Link}
                  href="/login"
                  variant="light"
                  className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 h-9 px-4 rounded-xl transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <FiLogIn size={14} />
                    Login
                  </span>
                </Button>

                <Button
                  as={Link}
                  href="/register"
                  className="bg-linear-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-md shadow-orange-500/10 h-9 px-4 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <span className="flex items-center gap-1.5">
                    <FiUserPlus size={14} />
                    Register
                  </span>
                </Button>
              </div>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center rounded-xl p-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 md:hidden transition-colors border border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-800/50"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                className="overflow-hidden md:hidden bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl border-t border-zinc-200/50 dark:border-zinc-800/50"
              >
                <ul className="px-6 py-5 space-y-3">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                            isActive
                              ? "bg-orange-500/10 text-orange-500"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                          }`}
                        >
                          {link.icon}
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}

                  <div className="h-[1px] bg-zinc-200/50 dark:bg-zinc-800/50 my-2" />

                  <li className="sm:hidden">
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    >
                      <FiLogIn size={16} />
                      Login
                    </Link>
                  </li>
                  <li className="sm:hidden pt-1">
                    <Button
                      as={Link}
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center w-full py-5 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm"
                    >
                      <FiUserPlus size={16} className="mr-2" />
                      Register
                    </Button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
