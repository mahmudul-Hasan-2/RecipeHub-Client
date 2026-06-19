import { getRecipes } from "@/lib/api/recipes";
import React from "react";
import { Utensils, Users, Globe2, Sparkles } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import Pagination from "@/components/Pagination";

const BrowseRecipes = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  const perPage = Number(resolvedParams?.perPage) || 12;

  const {
    recipes = [],
    totalPages = 1,
    totalRecipes = 0,
  } = (await getRecipes(currentPage, perPage)) || {};

  const uniqueCuisines = new Set(
    recipes.map((r) => r.cuisineType).filter(Boolean),
  ).size;
  const uniqueChefs = new Set(recipes.map((r) => r.authorName).filter(Boolean))
    .size;

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 md:px-8 antialiased">
      <div className="max-w-6xl mx-auto space-y-14">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 border border-divider/40 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">
              <Sparkles size={12} /> Culinary Collection
            </div>
            <h1 className="text-2xl font-black tracking-tight text-foreground md:text-3xl lg:text-5xl leading-tight">
              Discover & Cook <br />
              <span className="text-primary">Authentic Recipes</span>
            </h1>
            <p className="text-default-400 text-sm md:text-base font-medium max-w-lg leading-relaxed">
              Explore our chef-curated kitchen catalog. Filter, search, and
              recreate masterclass dishes right from your home.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 sm:gap-10 md:gap-12 shrink-0 md:pt-0 pt-4 w-full md:w-auto border-t md:border-t-0 border-divider/40">
            <div className="space-y-1">
              <span className="text-default-400 block text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Utensils size={14} className="text-primary" /> Recipes
              </span>
              <span className="text-3xl font-black text-foreground">
                {totalRecipes}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-default-400 block text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Globe2 size={14} className="text-primary" /> Cuisines
              </span>
              <span className="text-3xl font-black text-foreground">
                {uniqueCuisines || 1}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-default-400 block text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Users size={14} className="text-primary" /> Chefs
              </span>
              <span className="text-3xl font-black text-foreground">
                {uniqueChefs || 1}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tight text-foreground md:text-2xl">
              All Available Recipes
            </h2>
            <span className="text-xs font-bold text-default-400 bg-default-100 px-2.5 py-1 rounded-lg">
              Showing {recipes.length} of {totalRecipes} results
            </span>
          </div>

          {recipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-default-400 font-medium">
                No recipes found at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={perPage}
                totalItems={totalRecipes}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseRecipes;
