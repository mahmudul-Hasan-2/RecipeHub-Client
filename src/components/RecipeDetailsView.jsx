import Link from "next/link";
import React from "react";
import {
  ArrowLeft,
  Clock3,
  Heart,
  ChefHat,
  Mail,
  Tag,
  BookOpen,
} from "lucide-react";
import { Button, Chip, Card } from "@heroui/react";

const RecipeDetailsView = ({ recipe }) => {
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
    likeCount,
  } = recipe;

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

      {/* 🎬 Cinematic Hero Banner (Next.js config এর ঝামেলা এড়াতে <img> দিয়ে ফিক্সড করা) */}
      <div className="relative overflow-hidden rounded-[2rem] mb-12 h-[300px] sm:h-[400px] md:h-[480px] shadow-xl group bg-default-100">
        {recipeImage && (
          <img
            src={recipeImage}
            alt={recipeName}
            className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700 ease-out"
          />
        )}
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 z-20 flex flex-col justify-end h-full">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-sm max-w-3xl leading-tight">
            {recipeName}
          </h1>
        </div>
      </div>

      {/* 🏷️ Glossy Meta Row */}
      <div className="mb-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-divider/60 pb-8">
        <div className="flex flex-wrap gap-2.5">
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
        </div>

        <div className="flex flex-wrap items-center gap-4 text-default-500 font-bold text-sm md:text-base">
          <div className="flex items-center gap-2 bg-default-50 dark:bg-default-100/40 px-4 py-2 rounded-2xl border border-divider/40">
            <Clock3 size={18} className="text-primary" />
            <span>{preparationTime || "45 mins"} Cooking</span>
          </div>
          <div className="flex items-center gap-2 bg-danger-50/60 dark:bg-danger-950/20 text-danger-600 dark:text-danger-400 px-4 py-2 rounded-2xl border border-danger-100/30 dark:border-danger-900/20">
            <Heart size={18} className="fill-current" />
            <span>{likeCount || 0} Appreciations</span>
          </div>
        </div>
      </div>

      {/* 📊 Main Bento Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16 items-start">
        {/* Ingredients Card (প্যাডিং এবং স্পেসিং বাড়ানো হয়েছে) */}
        <Card className="lg:col-span-2 border border-divider/50 shadow-sm dark:shadow-none rounded-[2rem] bg-content1/50 dark:bg-content1/30 backdrop-blur-md p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <ChefHat className="text-primary" size={24} />
            <h2 className="text-2xl font-black tracking-tight text-foreground">
              Required Ingredients
            </h2>
          </div>

          {/* আইটেমগুলোর ভেতরের গ্যাপ বাড়িয়ে gap-5 এবং p-4.5 করা হয়েছে */}
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

        {/* Author Profile Card */}
        <Card className="border border-divider/50 shadow-sm dark:shadow-none rounded-[2rem] bg-content1/50 dark:bg-content1/30 backdrop-blur-md p-8 md:p-10">
          <h2 className="text-xs font-black mb-6 tracking-wider text-default-400 uppercase">
            Recipe Curator
          </h2>

          <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-default-50/50 dark:bg-default-100/20 border border-divider/30 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary  flex items-center justify-center text-2xl font-black shadow-md shadow-primary/10 mb-3 shrink-0">
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

      {/* 📝 Preparation Process Section */}
      <section className="bg-default-50/30 dark:bg-default-100/10 border border-divider/40 p-6 md:p-10 rounded-[2.5rem]">
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2 text-foreground">
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
    </div>
  );
};

export default RecipeDetailsView;
