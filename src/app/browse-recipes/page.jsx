import { getRecipes } from "@/lib/api/recipes";
import React from "react";
import RecipeCard from "@/components/recipes/RecipeCard";
import Pagination from "@/components/recipes/Pagination";
import FilterPanel from "@/components/recipes/FilterPanel";
import { getSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

const BrowseRecipes = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  const perPage = Number(resolvedParams?.perPage) || 12;

  const session = await getSession();

  const user = session?.user;

  const search = resolvedParams?.search || "";
  const category = resolvedParams?.category || "";
  const cuisine = resolvedParams?.cuisine || "";

  const {
    recipes = [],
    totalPages = 1,
    totalRecipes = 0,
  } = (await getRecipes(currentPage, perPage, search, category, cuisine)) || {};

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 md:px-8 antialiased">
      <div className="max-w-6xl mx-auto space-y-10">
        <FilterPanel
          currentSearch={search}
          currentCategory={category}
          currentCuisine={cuisine}
        />

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
