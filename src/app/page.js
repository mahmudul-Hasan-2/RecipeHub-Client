import AppBanner from "@/components/homepage/Banner";
import FeaturedCard from "@/components/homepage/FeaturedCard";
import { getFeaturedRecipes } from "@/lib/api/recipes";
import Image from "next/image";

export default async function Home() {
  const featuredRecipes = await getFeaturedRecipes();
  return (
    <div className="space-y-20 mb-20">
      <AppBanner></AppBanner>
      <div className="grid grid-cols-3 gap-10 container mx-auto">
        {featuredRecipes.map((recipe) => (
          <FeaturedCard key={recipe._id} recipe={recipe}></FeaturedCard>
        ))}
      </div>
    </div>
  );
}
