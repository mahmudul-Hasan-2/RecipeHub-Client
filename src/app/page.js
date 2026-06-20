import AppBanner from "@/components/homepage/Banner";
import FeaturedCard from "@/components/homepage/FeaturedCard";
import TestimonialsSection from "@/components/homepage/Testimonials";
import { getFeaturedRecipes } from "@/lib/api/recipes";
import TopChefsSection from "@/components/homepage/TopChefsSection";
import MostLiked from "@/components/homepage/MostLiked";
import Link from "next/link";

export default async function Home() {
  const featuredRecipes = await getFeaturedRecipes();
  return (
    <div className="space-y-20 mb-20">
      <AppBanner></AppBanner>
      <section className="py-16 bg-transparent px-4">
        <div className="container mx-auto">
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500 bg-orange-50 dark:bg-orange-950/30 px-3 py-1 rounded-full">
                Our Top Picks
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 mt-3 tracking-tight">
                Featured Recipes
              </h2>
              <p className="text-zinc-400 dark:text-zinc-500 font-normal text-base mt-2">
                Handpicked delicious dishes highly recommended by our expert
                chefs
              </p>
            </div>

            <Link href="/browse-recipes">
              {" "}
              <button className="hidden md:flex items-center gap-2 text-sm font-extrabold text-orange-500 hover:text-orange-600 transition-colors group">
                Explore All Recipes
                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {featuredRecipes.map((recipe) => (
              <FeaturedCard key={recipe._id} recipe={recipe} />
            ))}
          </div>

          <div className="mt-12 text-center block md:hidden">
            <Link href="/browse-recipes">
              <button className="w-full cursor-pointer bg-zinc-900 dark:bg-zinc-800 text-white font-bold text-sm px-6 py-4 rounded-xl transition-all active:scale-95">
                Explore All Recipes
              </button>
            </Link>
          </div>
        </div>
      </section>
      <MostLiked></MostLiked>
      <TopChefsSection></TopChefsSection>
      <TestimonialsSection></TestimonialsSection>
    </div>
  );
}
