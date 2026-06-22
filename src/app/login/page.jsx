"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaEgg } from "react-icons/fa";
import { Button, Input } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

// এই হুকটি দিয়ে থিম মাউন্টিং হ্যান্ডেল করছি যাতে কালার ফ্ল্যাশ না করে
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resolvedTheme } = useTheme();
  const isMounted = useMounted();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // থিম মাউন্ট হওয়ার পর সঠিক ভ্যালু সেট হবে
  const isDark = isMounted ? resolvedTheme === "dark" : false;

  const handleCredentialLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: callbackUrl,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Invalid credentials, please try again.");
    } else {
      toast.success("Welcome back, Chef! Login successful.");
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({ provider: "google" });

    if (data?.data) {
      toast.success("Welcome back, Login successful.");
      router.push(callbackUrl);
      router.refresh();
    } else {
      toast.error(
        data?.error?.message || "Something went wrong. Please try again.",
      );
    }
  };

  // থিম লোড না হওয়া পর্যন্ত রেন্ডারিং আটকানোর দরকার নেই, শুধু ক্লাসের ওপর কন্ট্রোল রাখলেই হবে
  return (
    <div className="relative w-full max-w-[440px] z-10 px-4">
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
        className={`p-8 rounded-[32px] backdrop-blur-xl border transition-all duration-500 ${
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
            Welcome Back
          </h2>
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
            Enter your credentials to access your chef kitchen
          </p>
        </div>

        <form onSubmit={handleCredentialLogin} className="space-y-5">
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
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                Password
              </label>
              <button
                type="button"
                className="text-xs font-bold text-orange-500 hover:underline"
              >
                Forgot password?
              </button>
            </div>
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
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm h-12 rounded-xl shadow-lg shadow-orange-500/10 hover:opacity-95 transition-all mt-2 cursor-pointer"
          >
            Sign In
          </Button>
        </form>

        <div className="relative flex py-6 items-center">
          <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800/40"></div>
          <span className="flex-shrink mx-4 text-zinc-400 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
            Or continue with
          </span>
          <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800/40"></div>
        </div>

        <Button
          onClick={handleGoogleLogin}
          variant="bordered"
          className="w-full font-bold text-sm h-12 rounded-xl border-zinc-200 dark:border-zinc-700 bg-white/20 dark:bg-zinc-900/20 hover:bg-white/40 dark:hover:bg-zinc-800/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <FcGoogle size={18} /> Sign in with Google
        </Button>

        <p className="text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-6">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-orange-500 font-bold hover:underline ml-1"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
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
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full blur-[100px] sm:blur-[130px] transition-all duration-500 ${isDark ? "bg-orange-500/10" : "bg-gradient-to-r from-orange-500/15 via-amber-400/15 to-transparent"}`}
        />
      </div>
      <Suspense
        fallback={
          <div className="text-sm font-bold text-orange-500 animate-pulse">
            Loading Auth...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </section>
  );
}
