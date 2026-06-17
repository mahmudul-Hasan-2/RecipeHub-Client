"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiCompass,
  FiHome,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import { FaEgg } from "react-icons/fa";

export default function AppNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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

  return (
    <motion.header
      animate={{
        scale: scrolled ? 0.98 : 1,
        y: scrolled ? 6 : 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="sticky top-4 z-50 px-4 w-full"
    >
      <div className="mx-auto max-w-7xl">
        {/* তোমার আইডিয়া: bg-background/50 গ্লাস এবং সাটল গ্রে বর্ডার */}
        <div className="relative overflow-hidden rounded-2xl bg-background/3 backdrop-blur-xl border border transition-all duration-300 shadow">
          <div className="relative flex h-16 items-center justify-between px-8">
            <div className="flex-1 flex justify-start">
              <Link href="/" className="group flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-sm">
                  <FaEgg className="rotate-12" size={14} />
                </div>
                <span className="text-base font-bold tracking-tight text-[var(--text-main)]">
                  Recipe
                  <span className="text-orange-500 font-extrabold">Hub</span>
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex justify-center">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.name} className="relative py-2">
                      <Link
                        href={link.href}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? "text-orange-500 font-semibold"
                            : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {link.icon}
                          {link.name}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute bottom-0 inset-x-0 h-[2px] bg-orange-500 rounded-full"
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

            <div className="flex-1 flex justify-end items-center gap-6">
              <div className="hidden sm:flex items-center gap-6">
                <Link
                  href="/login"
                  className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold text-sm shadow-sm hover:opacity-90 active:scale-[0.98] rounded-xl px-5 py-2 transition-all"
                >
                  Register
                </Link>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center rounded-xl p-2 text-[var(--text-muted)] hover:bg-[var(--btn-hover-bg)] focus:outline-none md:hidden transition-colors"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                className="overflow-hidden md:hidden bg-[var(--menu-mobile-bg)]"
              >
                <ul className="px-8 py-6 space-y-4">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center gap-3 w-full py-2 text-base font-medium transition-colors ${
                            isActive
                              ? "text-orange-500 font-semibold"
                              : "text-[var(--text-muted)]"
                          }`}
                        >
                          {link.icon}
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}
                  <div className="h-[1px] bg-[var(--border-gray-low)] my-2" />
                  <li className="sm:hidden">
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 w-full py-2 text-base font-medium text-[var(--text-muted)]"
                    >
                      <FiLogIn size={16} />
                      Login
                    </Link>
                  </li>
                  <li className="sm:hidden pt-2">
                    <Link
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center w-full py-3 rounded-xl text-base font-semibold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-sm"
                    >
                      <FiUserPlus size={16} className="mr-2" />
                      Register
                    </Link>
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
