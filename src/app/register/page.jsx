"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { FaEgg } from "react-icons/fa";
import { Button, Input } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

// এইটুকুই এড করো, এটা থিম মাউন্ট হওয়া নিশ্চিত করে
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resolvedTheme } = useTheme();
  const isMounted = useMounted(); // এটা দিয়ে চেক করবো

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleRegister = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters long and include both uppercase and lowercase letters.",
      );
      return;
    }
    setIsLoading(true);
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      image: imageUrl || undefined,
      role: "user",
      isPremium: false,
      isBlocked: false,
      callbackURL: callbackUrl,
    });
    setIsLoading(false);
    if (error) {
      toast.error(error.message || "Registration failed, please try again.");
    } else {
      toast.success("Account created successfully! Welcome to the kitchen.");
      router.push(callbackUrl);
      router.refresh();
    }
  };

  // থিম মাউন্ট না হওয়া পর্যন্ত সার্ভার সাইড রেন্ডার থেকে বাঁচাবে
  const isDark = isMounted ? resolvedTheme === "dark" : false;

  return (
    <div className="relative w-full max-w-[440px] z-10 px-4">
      {/* বাকি সব তোমার কোড */}
      <div className="mb-5 flex justify-start">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors group"
        >
          <FiArrowLeft
            className="group-hover:-translate-x-0.5 transition-transform"
            size={14}
          />
          Back to home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`p-8 rounded-[32px] backdrop-blur-xl border transition-all duration-500
          ${
            isDark
              ? "bg-zinc-950/40 border-zinc-800/60 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)]"
              : "bg-white/40 border-white/40 shadow-[0_24px_60px_-15px_rgba(249,115,22,0.08)]"
          }`}
      >
        <div className="flex flex-col items-center text-center gap-2 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20">
            <FaEgg className="rotate-12" size={20} />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-zinc-800 dark:text-zinc-50 mt-2">
            Create Account
          </h2>
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
            Join us to manage your own chef kitchen
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
              Full Name
            </label>
            <Input
              type="text"
              placeholder="Chef John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              variant="bordered"
              className="w-full h-12 rounded-xl border border-zinc-200/80 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/20 backdrop-blur-md text-zinc-800 dark:text-zinc-100 font-semibold text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-within:border-orange-500 transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="chef@recipehub.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="bordered"
              className="w-full h-12 rounded-xl border border-zinc-200/80 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/20 backdrop-blur-md text-zinc-800 dark:text-zinc-100 font-semibold text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-within:border-orange-500 transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
              Image URL{" "}
              <span className="text-[10px] text-zinc-400 font-normal">
                (Optional)
              </span>
            </label>
            <Input
              type="url"
              placeholder="https://example.com/chef-avatar.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              variant="bordered"
              className="w-full h-12 rounded-xl border border-zinc-200/80 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/20 backdrop-blur-md text-zinc-800 dark:text-zinc-100 font-semibold text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-within:border-orange-500 transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
              Password
            </label>
            <div className="relative w-full flex items-center">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="bordered"
                className="w-full h-12 rounded-xl border border-zinc-200/80 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/20 backdrop-blur-md text-zinc-800 dark:text-zinc-100 font-semibold text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-within:border-orange-500 transition-all duration-200 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-zinc-400 dark:text-zinc-500 hover:text-orange-500 transition-colors z-20 flex items-center justify-center h-full"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm h-12 rounded-xl shadow-lg shadow-orange-500/10 hover:opacity-95 transition-all mt-4 cursor-pointer"
          >
            Sign Up
          </Button>
        </form>

        <p className="text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-orange-500 font-bold hover:underline ml-1"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  const { resolvedTheme } = useTheme();
  const isMounted = useMounted();
  const isDark = isMounted ? resolvedTheme === "dark" : false;

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-14 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            opacity: isDark ? [0.3, 0.45, 0.3] : [0.5, 0.7, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full blur-[100px] sm:blur-[130px] transition-all duration-500
            ${isDark ? "bg-orange-500/10" : "bg-gradient-to-r from-orange-500/15 via-amber-400/15 to-transparent"}`}
        />
      </div>

      <Suspense
        fallback={
          <div className="text-sm font-bold text-orange-500 animate-pulse">
            Loading Auth...
          </div>
        }
      >
        <RegisterForm />
      </Suspense>
    </section>
  );
}
