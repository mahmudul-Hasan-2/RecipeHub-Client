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
import { Button, Chip, Card } from "@heroui/react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { updateLikeCount } from "@/lib/actions/recipes";
import { getLikes } from "@/lib/api/Likes";
import { useRouter } from "next/navigation";
import { addFavouriteRecipe } from "@/lib/actions/Favourites";
import { getFavourites } from "@/lib/api/Favourites";
import { addReport } from "@/lib/actions/reports";

const RecipeDetailsView = ({ recipe }) => {
  const { data } = authClient.useSession();
  const user = data?.user;

  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");

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

  useEffect(() => {
    let isMounted = true;
    const checkInitialFavorite = async () => {
      if (!user?.id || !recipe?._id) return;
      try {
        const data = await getFavourites(user.id);
        if (isMounted) {
          const favoriteList = Array.isArray(data) ? data : [];
          const hasFavorited = favoriteList.some(
            (fav) => fav.recipeId === recipe._id,
          );
          setIsFavorited(hasFavorited);
        }
      } catch (error) {
        console.error("Error fetching initial favorites:", error);
      }
    };
    checkInitialFavorite();
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

  const handleFavoriteClick = async () => {
    if (!user?.id) {
      toast.error("Please login first! 🔒");
      router.push("/login");
      return;
    }

    if (isFavorited) {
      toast.error("You have already bookmarked this recipe! 🔖");
      return;
    }

    const previousFavoriteState = isFavorited;
    const currentISOString = new Date().toISOString();

    const safeCreatedAt =
      recipe.createdAt && !isNaN(new Date(recipe.createdAt).getTime())
        ? new Date(recipe.createdAt).toISOString()
        : currentISOString;

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
      authorName: user?.name || "Anonymous Chef",
      authorEmail: user?.email || "",
      likesCount: recipe.likesCount || 0,
      isFeatured: recipe.isFeatured || false,
      status: recipe.status || "pending",
      createdAt: safeCreatedAt,
      updatedAt: currentISOString,
    };

    try {
      setIsFavorited(true);
      const data = await addFavouriteRecipe(favoritePayload);
      if (data && data.success) {
        toast.success("Added to favorites! ❤️");
        window.location.reload();
      } else {
        throw new Error(data?.message || "Failed to bookmark");
      }
    } catch (error) {
      setIsFavorited(false);
      console.error("Detailed Error:", error);
      toast.error(error.message || "Failed to bookmark. Please try again.");
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();

    if (!reportReason) {
      toast.error("Please select a reason!");
      return;
    }

    const reportPayload = {
      recipeId: recipe._id,
      recipeName: recipe.recipeName,
      reason: reportReason,
      details: reportDetails,
      userId: user?.id,
      reporterName: user?.name,
      reporterEmail: user?.email,
      timestamp: new Date().toISOString(),
    };

    const data = await addReport(reportPayload);

    if (data?.insertedId) {
      setIsReportModalOpen(false);
      toast.success("Report submitted successfully. Thank you!");
    } else {
      toast.error("Failed to submit report. Please try again.");
    }

    setReportReason("");
    setReportDetails("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 antialiased text-foreground bg-background transition-colors duration-300">
      <div className="mb-8">
        <Link href="/browse-recipes" passHref>
          <Button
            variant="flat"
            size="sm"
            className="bg-default-100/70 dark:bg-default-100/20 hover:bg-primary hover:text-black hover:dark:text-white transition-all duration-300 rounded-xl font-bold text-default-600 dark:text-default-400"
            startContent={<ArrowLeft size={16} />}
          >
            Back to Recipes
          </Button>
        </Link>
      </div>

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

      <div className="mb-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-divider/60 pb-8">
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

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all active:scale-95 text-sm font-bold ${
              isLiked
                ? "bg-red-800 text-white shadow-lg shadow-danger-500/20"
                : "bg-danger-50/60 dark:bg-danger-950/20 text-black dark:text-white border-danger-100/30 dark:border-danger-900/20 hover:bg-danger-500"
            }`}
          >
            <Heart size={18} className={isLiked ? "fill-current" : ""} />
            <span>{likesCount}</span>
          </button>

          <button
            onClick={handleFavoriteClick}
            className={`p-2.5 rounded-2xl border transition-all active:scale-95 ${
              isFavorited
                ? "bg-yellow-800 text-yellow-500 shadow-lg shadow-warning-500/20"
                : "bg-default-100/70 dark:bg-default-100/20 text-default-600 dark:text-default-400 border-divider/40 hover:bg-warning-500"
            }`}
          >
            <Bookmark size={18} className={isFavorited ? "fill-current" : ""} />
          </button>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="p-2.5 rounded-2xl border border-divider/40 bg-default-100/70 dark:bg-default-100/20 text-default-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all active:scale-95"
            title="Report Recipe"
          >
            <AlertTriangle size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16 items-start">
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

        <div className="space-y-6">
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
            <form
              action={`/api/checkout_sessions?recipeId=${recipe._id}`}
              method="POST"
            >
              <section>
                <input type="hidden" value="recipe" name="pricing-name" />
                <button
                  type="submit"
                  role="link"
                  className="w-full font-black uppercase tracking-wider cursor-pointer bg-blue-500 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 h-12"
                >
                  <CreditCard size={18} /> Buy This Recipe
                </button>
              </section>
            </form>
          </Card>

          <Card className="border border-divider/50 shadow-sm dark:shadow-none rounded-[2rem] bg-content1/50 dark:bg-content1/30 backdrop-blur-md p-6 md:p-8">
            <h2 className="text-xs font-black mb-6 tracking-wider text-default-400 uppercase">
              Recipe Curator
            </h2>
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-default-50/50 dark:bg-default-100/20 border border-divider/30 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-2xl font-black shadow-md shadow-primary/10 mb-3 shrink-0 dark:text-white text-black">
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

      {isReportModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsReportModalOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-[2rem] border border-divider bg-background p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto mb-4">
              <AlertTriangle size={28} />
            </div>
            <h3 className="text-xl font-black text-center mb-1">
              Report Content
            </h3>
            <p className="text-default-400 text-xs text-center mb-6">
              Why are you reporting this recipe?
            </p>
            <form onSubmit={handleReportSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-2">
                {["Spam", "Offensive Content", "Copyright Issue"].map(
                  (reason) => (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => setReportReason(reason)}
                      className={`w-full p-3 text-left text-sm font-bold rounded-xl border transition-all ${
                        reportReason === reason
                          ? "border-rose-500 bg-rose-500/10 text-rose-600"
                          : "border-divider bg-default-100/50 hover:bg-default-200 text-default-600"
                      }`}
                    >
                      {reason}
                    </button>
                  ),
                )}
              </div>
              <textarea
                rows={3}
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                placeholder="Optional: Provide more details..."
                className="w-full rounded-xl border border-divider bg-default-50 p-4 text-sm focus:border-primary outline-none transition-all resize-none"
              />
              <div className="flex gap-3">
                <Button
                  variant="flat"
                  className="flex-1 rounded-xl"
                  onClick={() => setIsReportModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="danger"
                  className="flex-1 rounded-xl font-bold"
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

// Into src folder I took it