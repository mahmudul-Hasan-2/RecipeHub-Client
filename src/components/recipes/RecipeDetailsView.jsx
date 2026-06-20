"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock3,
  Heart,
  ChefHat,
  Mail,
  Tag,
  BookOpen,
  CreditCard,
  Bookmark,
  AlertTriangle,
} from "lucide-react";
import { FiAlertOctagon, FiX } from "react-icons/fi";
import { Button, Chip, Card } from "@heroui/react";
import toast from "react-hot-toast";

// 🛠️ প্রোজেক্টের ডিরেক্টরি অনুযায়ী পাথগুলো ঠিক রেখো মামা
import { authClient } from "@/lib/auth-client";
import { updateLikeCount } from "@/lib/actions/recipes";
import { getLikes } from "@/lib/api/Likes";
import { useRouter } from "next/navigation";
import { addFavouriteRecipe } from "@/lib/actions/Favourites";
import { getFavourites } from "@/lib/api/Favourites";

const RecipeDetailsView = ({ recipe }) => {
  // 🔐 Auth সেশন থেকে ইউজার এবং ইমেইল ডিটেইলস বের করা
  const { data } = authClient.useSession();
  const user = data?.user;

  const router = useRouter();

  // 🔘 UI States
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");

  // 🔄 পেজ লোড হওয়ার সময় ইউজার আগে লাইক করেছে কি না তা চেক করার জন্য useEffect
  useEffect(() => {
    const checkInitialLike = async () => {
      if (!user?.id || !recipe?._id) return;

      try {
        const allLikes = await getLikes();
        const hasLiked = allLikes.some(
          (like) => like.recipeId === recipe._id && like.userId === user.id,
        );
        setIsLiked(hasLiked);
      } catch (error) {
        console.error("Error fetching initial likes:", error);
      }
    };

    checkInitialLike();
  }, [user?.id, recipe?._id]);

  // 🔄 পেজ লোড হওয়ার সময় ইউজার অলরেডি ফেভারিট করেছে কি না তা getFavourites দিয়ে চেক করা
  useEffect(() => {
    let isMounted = true;

    const checkInitialFavorite = async () => {
      // ইউজার বা রেসিপি না থাকলে রিটার্ন
      if (!user?.id || !recipe?._id) return;

      try {
        // সরাসরি getFavourites ফাংশন কল করা হচ্ছে
        const data = await getFavourites(user.id);

        if (isMounted) {
          // যদি ডেটা আসে এবং সেটি একটি অ্যারে হয়, তবেই চেক করো
          const favoriteList = Array.isArray(data) ? data : [];
          const hasFavorited = favoriteList.some(
            (fav) => fav.recipeId === recipe._id,
          );

          // স্টেট আপডেট করো
          setIsFavorited(hasFavorited);
        }
      } catch (error) {
        console.error("Error fetching initial favorites:", error);
      }
    };

    checkInitialFavorite();

    // ক্লিনআপ ফাংশন
    return () => {
      isMounted = false;
    };
  }, [user?.id, recipe?._id]);

  if (!recipe || !recipe.recipeName) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4 antialiased">
        <p className="text-default-400 text-sm font-medium">
          Recipe data is unavailable.
        </p>
        <Link href="/browse-recipes" passHref>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            className="rounded-xl font-semibold"
          >
            Back to Browse
          </Button>
        </Link>
      </div>
    );
  }

  const {
    recipeName,
    recipeImage,
    category,
    cuisineType,
    preparationTime,
    ingredients = [],
    instructions = [],
    authorName,
    authorEmail,
    likesCount,
    price = "$4.99",
  } = recipe;

  // ❤️ Like & Unlike Handler Function
  const handleLikeClick = async () => {
    if (!user || !user.email) {
      toast.error(
        "Dear chef, please login first to appreciate this recipe! 🔒",
      );
      router.push("/login");
      return;
    }

    const likedPayload = {
      recipeId: recipe._id,
      userId: user?.id,
    };

    const previousLikedState = isLiked;

    try {
      setIsLiked(!previousLikedState);

      await updateLikeCount(recipe._id, likedPayload);

      toast.success(
        previousLikedState ? "Like removed! 💔" : "Recipe appreciated! ❤️",
      );

      window.location.reload();
    } catch (error) {
      console.error("Error updating like count:", error);
      setIsLiked(previousLikedState);
      toast.error("Failed to update appreciation. Please try again.");
    }
  };

  // 🔖 Favorite / Bookmark Handler Function (একই আইটেম একবারই বুকমার্ক হবে)
  const handleFavoriteClick = async () => {
    // ১. লগইন চেক
    if (!user?.id) {
      toast.error("Please login first! 🔒");
      router.push("/login");
      return;
    }

    // ২. ডুপ্লিকেট চেক (UI Level)
    if (isFavorited) {
      toast.error("You have already bookmarked this recipe! 🔖");
      return;
    }

    const previousFavoriteState = isFavorited;
    const currentISOString = new Date().toISOString();

    // 📦 পেলোড স্ট্রাকচার
    const favoritePayload = {
      recipeId: recipe._id,
      recipeName: recipe.recipeName,
      recipeImage: recipe.recipeImage || undefined,
      category: recipe.category || "Main Course",
      cuisineType: recipe.cuisineType || "International",
      difficultyLevel: recipe.difficultyLevel || "Medium",
      preparationTime: recipe.preparationTime || "45 mins",
      ingredients: (recipe.ingredients || []).filter(Boolean),
      instructions: (recipe.instructions || []).filter(Boolean),
      authorId: user?.id,
      authorName: user?.name || "Mahmudul Hasan Nirab",
      authorEmail: user?.email || "mahmuduljasan@gmail.com",
      likesCount: recipe.likesCount || 0,
      isFeatured: recipe.isFeatured || false,
      status: recipe.status || "pending",
      createdAt: recipe.createdAt || currentISOString,
      updatedAt: currentISOString,
    };

    try {
      setIsFavorited(true); // অপটিমিস্টিক আপডেট

      const data = await addFavouriteRecipe(favoritePayload);

      if (data && data.success) {
        toast.success("Added to favorites! ❤️");
        // উইন্ডো রিলোড না করে যদি স্টেট চেঞ্জ করতে চাও তবে রিলোড লাইনটি মুছে দিতে পারো
        window.location.reload();
      } else {
        // ব্যাকএন্ড থেকে আসা মেসেজটি এখানে দেখাবে
        throw new Error(data?.message || "Failed to bookmark");
      }
    } catch (error) {
      setIsFavorited(false); // এরর হলে আবার অফ করে দাও
      console.error("Detailed Error:", error);
      toast.error(error.message || "Failed to bookmark. Please try again.");
    }
  };

  // 🚨 Report Modal Submit Handler (UI only)
  const handleReportSubmit = (e) => {
    e.preventDefault();
    alert(`Reported for: ${reportReason || "Not specified"}`);
    setIsReportModalOpen(false);
    setReportReason("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 antialiased text-foreground bg-background transition-colors duration-300">
      {/* ⬅️ Back Button */}
      <div className="mb-8">
        <Link href="/browse-recipes" passHref>
          <Button
            variant="flat"
            size="sm"
            className="bg-default-100/70 dark:bg-default-100/20 hover:bg-primary hover:text-white transition-all duration-300 rounded-xl font-bold text-default-600 dark:text-default-400"
            startContent={<ArrowLeft size={16} />}
          >
            Back to Recipes
          </Button>
        </Link>
      </div>

      {/* 🎬 Cinematic Hero Banner */}
      <div className="relative overflow-hidden rounded-[2rem] mb-8 h-[300px] sm:h-[400px] md:h-[480px] shadow-xl group bg-default-100">
        {recipeImage && (
          <img
            src={recipeImage}
            alt={recipeName}
            className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700 ease-out"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 z-20 flex flex-col justify-end h-full">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-sm max-w-3xl leading-tight">
            {recipeName}
          </h1>
        </div>
      </div>

      {/* ⚡ Glossy Interaction & Meta Row */}
      <div className="mb-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-divider/60 pb-8">
        {/* Left Side: Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Chip
            color="primary"
            variant="flat"
            size="md"
            className="font-bold px-3 py-1 bg-primary/10 text-primary"
          >
            {category || "Main Course"}
          </Chip>
          <Chip
            variant="flat"
            size="md"
            className="font-bold bg-default-100 dark:bg-default-100/30 text-default-600 dark:text-default-400 px-3 py-1"
          >
            {cuisineType || "International"}
          </Chip>
          <div className="flex items-center gap-1.5 bg-default-50 dark:bg-default-100/40 px-3 py-1.5 rounded-full border border-divider/40 text-xs sm:text-sm font-bold text-default-500">
            <Clock3 size={16} className="text-primary" />
            <span>{preparationTime || "45 mins"}</span>
          </div>
        </div>

        {/* Right Side: Interactive Action Buttons (Like, Fav, Report) */}
        <div className="flex flex-wrap items-center gap-3">
          {/* ❤️ Like/Unlike Button */}
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all active:scale-95 text-sm font-bold ${
              isLiked
                ? "bg-danger-500 text-white border-danger-500 shadow-lg shadow-danger-500/20"
                : "bg-danger-50/60 dark:bg-danger-950/20 text-danger-600 dark:text-danger-400 border-danger-100/30 dark:border-danger-900/20 hover:bg-danger-500 hover:text-white"
            }`}
          >
            <Heart size={18} className={isLiked ? "fill-current" : ""} />
            <span>{likesCount}</span>
          </button>

          {/* 🔖 Favorite Button */}
          {/* 🔖 Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            // বাটনটি অলরেডি ফেভারিট থাকলে আমরা সেটাকে 'active' লুক দিচ্ছি
            className={`p-2.5 rounded-2xl border transition-all active:scale-95 ${
              isFavorited
                ? "bg-warning-500 text-white border-warning-500 shadow-lg shadow-warning-500/20" // এটিই হলো তোমার অ্যাক্টিভ স্টাইল
                : "bg-default-100/70 dark:bg-default-100/20 text-default-600 dark:text-default-400 border-divider/40 hover:bg-warning-500 hover:text-white"
            }`}
          >
            <Bookmark
              size={18}
              className={isFavorited ? "fill-current" : ""} // অ্যাক্টিভ থাকলে আইকনটি পূর্ণ (fill) হয়ে যাবে
            />
          </button>

          {/* 🚨 Report Button */}
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="p-2.5 rounded-2xl border border-divider/40 bg-default-100/70 dark:bg-default-100/20 text-default-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all active:scale-95"
            title="Report Recipe"
          >
            <AlertTriangle size={18} />
          </button>
        </div>
      </div>

      {/* 📊 Main Bento Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16 items-start">
        {/* Ingredients Card */}
        <Card className="lg:col-span-2 border border-divider/50 shadow-sm dark:shadow-none rounded-[2rem] bg-content1/50 dark:bg-content1/30 backdrop-blur-md p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <ChefHat className="text-primary" size={24} />
            <h2 className="text-base md:text-2xl font-black tracking-tight text-foreground">
              Required Ingredients
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl bg-default-50/80 dark:bg-default-100/20 hover:bg-primary-50/30 dark:hover:bg-primary-950/10 border border-divider/30 hover:border-primary/20 transition-all duration-200 group/item"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-primary/40 group-hover/item:bg-primary transform group-hover/item:scale-110 transition-all duration-200 shrink-0" />
                <span className="text-base text-default-600 dark:text-default-400 font-semibold tracking-wide truncate">
                  {ingredient}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Side Stack: Author Profile & Premium Purchase Card */}
        <div className="space-y-6">
          {/* 💳 Purchase CTA Card */}
          <Card className="border-2 border-primary/30 shadow-xl rounded-[2rem] bg-gradient-to-br from-primary/10 via-content1 to-content1 p-6 md:p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl -mr-6 -mt-6" />

            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
              Premium Access
            </span>
            <h3 className="text-xl font-black text-foreground tracking-tight">
              Unlock Full Cookbook
            </h3>
            <p className="text-default-400 text-xs mt-1 leading-relaxed">
              Get lifetime access to high-res video tutorials and secret chef
              tips.
            </p>
            <div className="my-5">
              <span className="text-3xl font-black text-foreground">
                {price}
              </span>
              <span className="text-default-400 text-xs font-bold">
                {" "}
                /one-time
              </span>
            </div>

            {/* 🛒 Purchase Button */}
            <form action="/api/checkout_sessions" method="POST">
              <section>
                <button type="submit" role="link">
                  <Button
                    color="primary"
                    size="lg"
                    className="w-full font-black uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 h-12"
                    onClick={() =>
                      alert("Redirecting to Stripe Checkout workflow... 💳")
                    }
                  >
                    <CreditCard size={18} /> Buy This Recipe
                  </Button>
                </button>
              </section>
            </form>
          </Card>

          {/* Author Profile Card */}
          <Card className="border border-divider/50 shadow-sm dark:shadow-none rounded-[2rem] bg-content1/50 dark:bg-content1/30 backdrop-blur-md p-6 md:p-8">
            <h2 className="text-xs font-black mb-6 tracking-wider text-default-400 uppercase">
              Recipe Curator
            </h2>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-default-50/50 dark:bg-default-100/20 border border-divider/30 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-2xl font-black shadow-md shadow-primary/10 mb-3 shrink-0 text-white">
                {authorName?.charAt(0)?.toUpperCase() || "C"}
              </div>
              <h3 className="font-extrabold text-lg text-foreground tracking-tight">
                {authorName || "Anonymous Chef"}
              </h3>
              {authorEmail && (
                <div className="flex items-center gap-1.5 text-xs text-default-400 mt-1 max-w-full">
                  <Mail size={12} className="shrink-0" />
                  <span className="truncate max-w-[160px]">{authorEmail}</span>
                </div>
              )}
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-default-400 flex items-center gap-1.5">
                  <Tag size={14} /> Taxonomy
                </span>
                <span className="text-default-600 dark:text-default-400">
                  {category || "Unassigned"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-default-400 flex items-center gap-1.5">
                  <BookOpen size={14} /> Total Steps
                </span>
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-lg text-xs font-bold">
                  {instructions.length} Steps
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 📝 Preparation Process Section */}
      <section className="bg-default-50/30 dark:bg-default-100/10 border border-divider/40 p-6 md:p-10 rounded-[2.5rem]">
        <div className="max-w-3xl mb-12">
          <h2 className="text-base md:text-3xl font-black tracking-tight mb-2 text-foreground">
            Preparation Process
          </h2>
          <p className="text-default-400 text-sm font-medium">
            Follow these precise steps carefully to recreate the authentic
            flavor profile.
          </p>
        </div>

        <div className="flex flex-col">
          {instructions.map((step, index) => (
            <div key={index} className="flex gap-6 relative group/step">
              <div className="flex flex-col items-center shrink-0 w-10">
                <div className="w-10 h-10 rounded-full bg-content1 dark:bg-content2 border border-divider group-hover/step:border-primary group-hover/step:bg-primary text-default-500 flex items-center justify-center font-bold text-sm transition-all duration-300 z-10 shadow-sm">
                  {index + 1}
                </div>
                {index !== instructions.length - 1 && (
                  <div className="w-0.5 flex-1 bg-divider dark:bg-default-100/50 my-2 min-h-[50px]" />
                )}
              </div>

              <div className="pt-1.5 pb-10 max-w-3xl flex-1">
                <h3 className="font-extrabold text-foreground text-lg mb-1.5 group-hover/step:text-primary transition-colors duration-200">
                  Step {index + 1}
                </h3>
                <p className="leading-relaxed text-default-500 dark:text-default-400 text-base font-normal tracking-wide">
                  {step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ⚠️ Report Recipe Modal Layer */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsReportModalOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-[2rem] border border-divider bg-background p-6 sm:p-8 shadow-2xl text-foreground animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-default-100 text-default-500 hover:bg-default-200 transition-colors"
            >
              <FiX size={16} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-danger-500/10 flex items-center justify-center text-danger mx-auto mb-4 border border-danger/20">
              <FiAlertOctagon size={24} />
            </div>

            <h3 className="text-xl font-black text-center tracking-tight mb-2">
              Report This Recipe
            </h3>
            <p className="text-default-400 text-xs text-center leading-relaxed mb-6">
              Help us maintain community standards. Please describe why this
              recipe violates policies.
            </p>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <textarea
                required
                rows={4}
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Provide a detailed description of the issue (e.g., plagiarized text, inappropriate imagery, dangerous ingredients)..."
                className="w-full rounded-2xl border border-divider bg-default-50/50 p-4 text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-default-400 text-foreground transition-all resize-none"
              />

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="flat"
                  className="flex-1 rounded-xl font-bold"
                  onClick={() => setIsReportModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="danger"
                  className="flex-1 rounded-xl font-extrabold uppercase tracking-wider"
                >
                  Submit Report
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetailsView;
