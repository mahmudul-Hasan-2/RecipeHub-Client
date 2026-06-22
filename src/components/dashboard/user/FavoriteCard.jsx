import React from "react";
import { Clock3, Tag, ArrowRight } from "lucide-react";
import { Card, Button, Chip } from "@heroui/react";
import Link from "next/link";
import DeleteFavoriteRecipeModal from "./DeleteFavoriteRecipeModal";

const FavoriteCard = ({ recipe }) => {
  const {
    recipeId,
    recipeName,
    recipeImage,
    category,
    cuisineType,
    preparationTime,
    authorName,
  } = recipe;

  return (
    <Card className="border border-divider/50 shadow-sm rounded-[2rem] bg-content1/50 dark:bg-content1/30 backdrop-blur-md p-5 flex flex-col justify-between hover:border-primary/40 transition-all duration-300 group">
      <div>
        {/* 🎬 Recipe Image */}
        <div className="relative overflow-hidden rounded-2xl h-48 w-full bg-default-100 mb-4">
          <img
            src={
              recipeImage ||
              "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=500"
            }
            alt={recipeName}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <Chip
              size="sm"
              color="primary"
              variant="flat"
              className="font-bold bg-background/80 backdrop-blur-md"
            >
              {category}
            </Chip>
          </div>
        </div>

        {/* 📝 Content */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-default-400">
            By {authorName}
          </span>
          <h3 className="text-lg font-black tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {recipeName}
          </h3>

          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center gap-1 text-xs font-semibold text-default-500">
              <Clock3 size={14} className="text-primary" />
              <span>{preparationTime}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-default-500">
              <Tag size={14} className="text-secondary" />
              <span>{cuisineType}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🔗 Action Button */}
      <div className="pt-5 flex items-center justify-between">
        <Link href={`/recipe/${recipeId}`} passHref>
          <Button
            size="sm"
            color="primary"
            variant="flat"
            className="w-full font-bold rounded-xl flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white transition-all"
          >
            View Details <ArrowRight size={14} />
          </Button>
        </Link>
        <DeleteFavoriteRecipeModal
          favoriteId={recipe._id} // অথবা তোমার ডাটাবেজের প্রিয় আইডির কী
          recipeName={recipeName}
        />
      </div>
    </Card>
  );
};

export default FavoriteCard;
