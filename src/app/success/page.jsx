import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";
import Link from "next/link";
import { updateIsPremium } from "@/lib/actions/users";
import { getSession } from "@/lib/core/session";
import { createTransaction } from "@/lib/actions/transaction";
import { getRecipeById } from "@/lib/api/recipes";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, customer_details, metadata } = session;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const recipe = await getRecipeById(metadata?.recipeId);
    const data = await getSession();
    const user = data?.user;
    console.log(metadata);
    const transactionPayload = {
      userName: user?.name,
      userEmail: user?.email,
      userImage: user?.image,
      userId: user?.id,
      recipeName: recipe.recipeName,
      recipeImage: recipe.recipeImage,
      category: recipe.category,
      cuisineType: recipe.cuisineType,
      difficultyLevel: recipe.difficultyLevel,
      preparationTime: recipe.preparationTime,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      amount: session.amount_total,
      authorId: recipe.authorId,
      authorName: recipe.authorName,
      authorEmail: recipe.authorEmail,
      authorImage: recipe.authorImage,
      date: new Date(),
      paymentStatus: status,
      transactonId: session_id,
    };
    await updateIsPremium(user?.id);
    const result = await createTransaction(transactionPayload);
    console.log(result);
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm text-center">
          {/* সাকসেস আইকন */}
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-500">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">
            Payment Successful!
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
            Thank you for your business! A confirmation email has been sent to
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 block mt-1">
              {customer_details.email}
            </span>
          </p>

          {/* Session Info Section */}
          <div className="space-y-3 mb-8">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 text-left">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                Session ID
              </p>
              <p className="text-sm font-mono mt-1 text-zinc-900 dark:text-zinc-200 truncate">
                {session_id}
              </p>
            </div>

            <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 text-left">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                Status
              </p>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 capitalize">
                {status}
              </span>
            </div>
          </div>

          <Link
            href="/dashboard/user"
            className="block w-full py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            Back to Dashboard
          </Link>

          <Link
            href="/browse-recipes"
            className="block w-full py-3.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            ← Go back to recipes
          </Link>
        </div>
      </div>
    );
  }
}
