"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiCompass,
  FiHome,
  FiLogOut,
  FiUser,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { FaEgg } from "react-icons/fa";
import { Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "C";
    return name
      .split(" ")
      .filter((n) => n.length > 0)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleLogout = async () => {
    toast.loading("Logging out...");
    const { error } = await authClient.signOut();
    toast.dismiss();
    if (error) toast.error(error.message || "Failed to log out.");
    else {
      toast.success("See ya, Chef!");
      router.push("/");
      router.refresh();
    }
  };

  const dashboardHref =
    user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user";

  const navLinks = [
    { name: "Home", href: "/", icon: <FiHome size={16} /> },
    {
      name: "Browse Recipes",
      href: "/browse-recipes",
      icon: <FiCompass size={16} />,
    },
    ...(user
      ? [
          { name: "My Profile", href: "/profile", icon: <FiUser size={16} /> },
          {
            name: "Dashboard",
            href: dashboardHref,
            icon: <FiHome size={16} />,
          },
        ]
      : []),
  ];

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 z-50 pt-4 px-4 w-full"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          animate={{ scale: scrolled ? 0.98 : 1 }}
          className={`relative rounded-2xl border backdrop-blur-xl transition-all duration-300 ${isDark ? "bg-zinc-950/60 border-zinc-800/50" : "bg-white/70 border-orange-500/20"}`}
        >
          <div className="flex h-16 items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 15 }}
                className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center text-white"
              >
                <FaEgg size={14} />
              </motion.div>
              <span className="font-bold text-lg">
                Recipe<span className="text-orange-500">Hub</span>
              </span>
            </Link>

            <nav className="hidden lg:flex gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${pathname === link.href ? "text-orange-500 bg-orange-500/10" : "hover:text-orange-500"}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="p-2 rounded-lg bg-zinc-100 cursor-pointer dark:bg-zinc-900"
              >
                {resolvedTheme === "dark" ? (
                  <FiSun size={16} />
                ) : (
                  <FiMoon size={16} />
                )}
              </button>

              {mounted &&
                !isPending &&
                (user ? (
                  <Popover placement="bottom-end">
                    <PopoverTrigger>
                      <button className="w-9 h-9 flex items-center justify-center rounded-xl overflow-hidden border border-orange-500/30 cursor-pointer bg-orange-500 text-white font-black hover:ring-2 ring-orange-500/30 transition-all">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.parentElement.innerText = getInitials(
                                user.name,
                              );
                            }}
                          />
                        ) : (
                          getInitials(user.name)
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 w-60 rounded-2xl">
                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black">
                            {getInitials(user.name)}
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-black">
                              {user.name || "Chef"}
                            </p>
                            <p className="text-[10px] text-zinc-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <Button
                          fullWidth
                          variant="flat"
                          color="danger"
                          onClick={handleLogout}
                          className="cursor-pointer font-bold text-xs"
                        >
                          <FiLogOut size={14} /> Sign Out
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <div className="hidden sm:flex gap-2">
                    <Link href="/login">
                      <Button variant="light" className="text-xs">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="bg-orange-500 text-white text-xs">
                        Register
                      </Button>
                    </Link>
                  </div>
                ))}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2"
              >
                <FiMenu />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
