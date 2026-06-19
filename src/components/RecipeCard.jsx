"use client";

import React from "react";
import { Card, Button, Chip } from "@heroui/react";
import { Clock3, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null;

  const {
    _id,
    recipeName,
    recipeImage,
    category,
    cuisineType,
    preparationTime,
    likeCount,
  } = recipe;

  return (
    <Card className="border border-divider/50 bg-content1/50 backdrop-blur-md rounded-[2rem] overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 group flex flex-col h-full">
      {/* 📸 রেসিপি ইমেজ */}
      <div className="relative h-56 w-full overflow-hidden bg-default-100 shrink-0">
        {recipeImage ? (
          <img
            src={recipeImage}
            alt={recipeName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-default-400 text-sm">
            No Image Available
          </div>
        )}
        {/* ক্যাটাগরি চিপ */}
        <div className="absolute top-4 left-4 z-10">
          <Chip
            color="primary"
            variant="flat"
            size="sm"
            className="font-bold bg-background/80 backdrop-blur-md"
          >
            {category || "Main Course"}
          </Chip>
        </div>
      </div>

      {/* 📝 রেసిপি কন্টেন্ট */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-default-400 uppercase tracking-wider">
            {cuisineType || "International"}
          </span>
          <h3 className="text-xl font-black text-foreground tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-250">
            {recipeName}
          </h3>
        </div>

        {/* 📊 কুইক মেটা ইনফো */}
        <div className="flex items-center justify-between text-sm font-bold text-default-500 border-t border-divider/40 pt-4">
          <div className="flex items-center gap-1.5">
            <Clock3 size={16} className="text-primary" />
            <span>{preparationTime || "45 mins"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-danger-500">
            <Heart size={16} className="fill-current" />
            <span>{likeCount || 0}</span>
          </div>
        </div>

        {/* 🔗 ভিউ রেসিপি বাটন */}
        <Link href={`/browse-recipes/${_id}`} passHref className="w-full pt-2">
          <Button
            className="w-full font-bold rounded-xl bg-default-100/80 hover:bg-primary hover:text-white transition-all duration-300"
            endContent={
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            }
          >
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default RecipeCard;
