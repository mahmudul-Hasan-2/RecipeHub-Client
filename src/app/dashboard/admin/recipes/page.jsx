import RecipeTable from "@/components/dashboard/admin/RecipeTable"; // তোমার পাথ অনুযায়ী চেক করো
import ReportTable from "@/components/dashboard/admin/ReportTable";
import { getAllRecipes } from "@/lib/api/recipes";
import { getReports } from "@/lib/api/reports";

export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-black mb-6">Manage Recipes</h1>
      <RecipeTable recipes={recipes} />
    </div>
  );
}
