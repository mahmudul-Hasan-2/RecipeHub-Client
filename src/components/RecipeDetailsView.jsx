import Link from "next/link";
import Image from "next/image";
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
import { Button, Chip, Separator, Card } from "@heroui/react";

const RecipeDetailsView = ({ recipe }) => {
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
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 antialiased text-default-800 dark:text-default-900 transition-colors duration-300">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/browse-recipes" passHref>
          <Button
            variant="flat"
            size="sm"
            className="bg-default-100/80 dark:bg-default-100/40 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300 rounded-xl font-medium text-default-700 dark:text-default-800"
            startContent={<ArrowLeft size={16} />}
          >
            Back to Recipes
          </Button>
        </Link>
      </div>

      {/* Cinematic Hero Banner */}
      <div className="relative overflow-hidden rounded-[2rem] mb-10 h-[350px] md:h-[520px] shadow-2xl group">
        <Image
          src={recipeImage}
          alt={recipeName}
          fill
          priority
          className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Adjusted gradient opacity for better visibility in both modes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 z-20 flex flex-col justify-end h-full">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-md max-w-3xl leading-tight">
            {recipeName}
          </h1>
        </div>
      </div>

      {/* Glossy Meta Row */}
      <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-default-100 dark:border-default-200 pb-8">
        <div className="flex flex-wrap gap-2.5">
          <Chip
            color="primary"
            variant="shadow"
            size="md"
            className="font-semibold shadow-md shadow-primary/20 dark:shadow-primary/10 px-3 py-1 text-white"
          >
            {category}
          </Chip>
          <Chip
            variant="flat"
            color="secondary"
            size="md"
            className="font-semibold bg-secondary-50 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400 px-3 py-1"
          >
            {cuisineType}
          </Chip>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-default-600 dark:text-default-500 font-semibold text-sm md:text-base">
          <div className="flex items-center gap-2.5 bg-default-50 dark:bg-default-100 px-4 py-2 rounded-2xl border border-default-100 dark:border-default-200/50">
            <Clock3 size={18} className="text-primary" />
            <span>{preparationTime} Cooking</span>
          </div>
          <div className="flex items-center gap-2.5 bg-danger-50/50 dark:bg-danger-950/20 text-danger-600 dark:text-danger-400 px-4 py-2 rounded-2xl border border-danger-100/50 dark:border-danger-900/30">
            <Heart size={18} className="fill-current" />
            <span>{likeCount || 0} Appreciations</span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16 items-start">
        {/* Ingredients Bento Card */}
        <Card className="lg:col-span-2 border border-default-200/60 dark:border-default-100/80 shadow-xl shadow-default-100/40 dark:shadow-none rounded-[2rem] overflow-hidden bg-content1 dark:bg-content1/70 backdrop-blur-md">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <ChefHat className="text-primary" size={26} />
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-default-900 dark:text-default-900">
                Required Ingredients
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-default-50 dark:bg-default-100/50 hover:bg-primary-50/40 dark:hover:bg-primary-950/20 border border-default-100/50 dark:border-default-200/30 hover:border-primary-100 dark:hover:border-primary-800 transition-colors duration-200 group/item"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/30 dark:bg-primary/20 group-hover/item:bg-primary transform group-hover/item:scale-120 transition-all duration-200 flex-shrink-0" />
                  <span className="text-base text-default-700 dark:text-default-600 font-medium tracking-wide">
                    {ingredient}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Author Premium Profile Card */}
        <Card className="border border-default-200/60 dark:border-default-100/80 shadow-xl shadow-default-100/40 dark:shadow-none rounded-[2rem] overflow-hidden bg-content1 dark:bg-content1/70 backdrop-blur-md">
          <div className="p-6 md:p-8">
            <h2 className="text-xs font-extrabold mb-6 tracking-tight text-default-400 dark:text-default-500 uppercase">
              Recipe Curator
            </h2>

            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-gradient-to-b from-default-50 to-transparent dark:from-default-100/50 dark:to-transparent border border-default-100/50 dark:border-default-200/30 mb-6">
              {/* Fixed text contrast for Author initial circle */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-primary/20 mb-3">
                {authorName?.charAt(0)?.toUpperCase()}
              </div>
              <h3 className="font-bold text-lg text-default-800 dark:text-default-900 tracking-tight">
                {authorName}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-default-400 dark:text-default-500 mt-1 max-w-full">
                <Mail size={12} className="flex-shrink-0" />
                <span className="truncate max-w-[180px]">{authorEmail}</span>
              </div>
            </div>

            <Separator className="my-2 bg-default-100 dark:bg-default-200/60" />

            <div className="space-y-4 pt-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-default-400 dark:text-default-500 flex items-center gap-1.5">
                  <Tag size={14} /> Taxonomy
                </span>
                <span className="font-bold text-default-700 dark:text-default-600">
                  {category}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-default-400 dark:text-default-500 flex items-center gap-1.5">
                  <BookOpen size={14} /> Total Steps
                </span>
                <span className="font-bold bg-primary-100 dark:bg-primary-950/40 text-primary-700 dark:text-primary-400 px-2 py-0.5 rounded-md text-xs">
                  {instructions.length} Steps
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Preparation Process Section */}
      <section className="bg-default-50/50 dark:bg-default-100/20 border border-default-200/50 dark:border-default-200/30 p-6 md:p-12 rounded-[2.5rem] shadow-sm">
        <div className="max-w-3xl mb-10">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-default-900 dark:text-default-900">
            Preparation Process
          </h2>
          <p className="text-default-400 dark:text-default-500 text-sm">
            Follow these precise steps carefully to recreate the authentic
            flavor profile.
          </p>
        </div>

        <div className="flex flex-col">
          {instructions.map((step, index) => (
            <div key={index} className="flex gap-6 relative group/step">
              <div className="flex flex-col items-center flex-shrink-0 w-11">
                {/* Fixed timeline circle background colors for dark mode */}
                <div className="w-11 h-11 rounded-full bg-content1 dark:bg-content2 border-2 border-default-200 dark:border-default-300 group-hover/step:border-primary group-hover/step:bg-primary group-hover/step:text-white text-default-600 dark:text-default-600 flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm group-hover/step:shadow-md group-hover/step:shadow-primary/30 z-10">
                  {index + 1}
                </div>
                {index !== instructions.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/40 via-default-200 to-default-200 dark:via-default-200/50 dark:to-default-200/20 my-2 min-h-[40px]" />
                )}
              </div>

              <div className="pt-2 pb-8 max-w-3xl flex-1">
                <h3 className="font-bold text-default-900 dark:text-default-900 text-lg mb-2 group-hover/step:text-primary transition-colors duration-200">
                  Step {index + 1}
                </h3>
                <p className="leading-relaxed text-default-600 dark:text-default-500 text-base md:text-md tracking-wide font-normal">
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
