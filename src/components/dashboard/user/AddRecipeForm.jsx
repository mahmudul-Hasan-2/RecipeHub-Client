"use client";

import React, { useState, useRef } from "react";
import { FiPlus, FiTrash, FiLoader, FiCheckCircle } from "react-icons/fi";
import { FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { addRecipe } from "@/lib/actions/recipes";

const AddRecipeForm = () => {
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);

  // Cloudinary স্টেটস
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Auth সেশন
  const { data } = useSession();
  const user = data?.user;

  // 🌐 Cloudinary ইমেজ আপলোড হ্যান্ডলার
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      toast.error(
        "Cloudinary env variables are missing! Please restart your server.",
      );
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (response.ok && data.secure_url) {
        setImageUrl(data.secure_url);
        toast.success("Image successfully hosted on Cloudinary!");
      } else {
        console.error("Cloudinary Error Log:", data);
        toast.error(data.error?.message || "Cloudinary upload failed.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast.error("Network error during image upload.");
    } finally {
      setIsUploading(false);
    }
  };

  // Ingredients ডাইনামিক হ্যান্ডলার
  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };
  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  // Instructions ডাইনামিক হ্যান্ডলার
  const handleInstructionChange = (index, value) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };
  const addInstruction = () => setInstructions([...instructions, ""]);
  const removeInstruction = (index) =>
    setInstructions(instructions.filter((_, i) => i !== index));

  // 🚀 ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      toast.error("Please upload a recipe image first!");
      return;
    }

    const formData = new FormData(e.target);
    const currentISOString = new Date().toISOString();

    // 🎯 হুবহু তোমার অবজেক্ট ফরম্যাট
    const recipeData = {
      recipeName: formData.get("recipeName"),
      recipeImage: imageUrl || undefined,
      category: formData.get("category"),
      cuisineType: formData.get("cuisineType"),
      difficultyLevel: formData.get("difficultyLevel"),
      preparationTime: formData.get("preparationTime"),
      ingredients: ingredients.filter(Boolean),
      instructions: instructions.filter(Boolean),

      // 👤 অথর ইনফরমেশন (সেশন থেকে ডাইনামিক)
      authorId: user?.id || "6a3396f3d1664cacad046bc5",
      authorName: user?.name || "Mahmudul Hasan Nirab",
      authorEmail: user?.email || "mahmuduljasan@gmail.com",

      // ⚙️ মেটা ডেটা কাউন্টার্স ও ফ্ল্যাগস
      likesCount: 0,
      isFeatured: false,
      status: "pending",

      // 📅 টাইমস্ট্যাম্পস
      createdAt: currentISOString,
      updatedAt: currentISOString,
    };

    console.log("Submitting Raw Data Format to Database:", recipeData);

    try {
      const response = await addRecipe(recipeData);

      if (response?.insertedId || response?.ok) {
        toast.success("Recipe published successfully!");
        e.target.reset();
        setImageUrl("");
        setIngredients([""]);
        setInstructions([""]);
        window.location.reload();
      } else {
        toast.error("Failed to publish recipe. Please try again.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Something went wrong on the server.");
    }
  };

  const dropdownClassName =
    "w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 focus:outline-none focus:border-orange-500 text-zinc-700 dark:text-zinc-300 font-semibold cursor-pointer transition-all appearance-none pr-10";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-sm font-medium">
      {/* 📸 Recipe Image */}
      <div className="space-y-2">
        <label className="text-zinc-700 dark:text-zinc-300 font-bold">
          Recipe Image
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />

        <div
          onClick={() => !isUploading && fileInputRef.current.click()}
          className={`w-full h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all p-4 overflow-hidden relative
            ${imageUrl ? "border-emerald-500/50 bg-emerald-500/[0.02]" : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-orange-500"}`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-orange-500">
              <FiLoader className="animate-spin" size={28} />
              <span className="text-xs font-bold tracking-wide">
                Hosting to Cloudinary...
              </span>
            </div>
          ) : imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-20"
              />
              <div className="z-10 flex flex-col items-center gap-1.5 text-emerald-500">
                <FiCheckCircle size={28} />
                <span className="text-xs font-black uppercase tracking-wider">
                  Successfully Hosted!
                </span>
                <span className="text-[11px] text-zinc-500 line-clamp-1 max-w-xs">
                  {imageUrl}
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-500">
              <FaUpload
                size={32}
                className="text-zinc-300 dark:text-zinc-700"
              />
              <p className="font-bold text-zinc-600 dark:text-zinc-400">
                Click to upload recipe cover
              </p>
              <p className="text-[11px]">Supports JPG, PNG, WEBP up to 10MB</p>
            </div>
          )}
        </div>
      </div>

      {/* Recipe Name */}
      <div className="space-y-2">
        <label className="text-zinc-700 dark:text-zinc-300 font-bold">
          Recipe Name
        </label>
        <input
          type="text"
          name="recipeName"
          required
          placeholder="e.g., Kacchi Biryani, Beef Bhuna"
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 focus:outline-none focus:border-orange-500 text-zinc-800 dark:text-zinc-100 transition-colors"
        />
      </div>

      {/* 🌟 Dropdowns Group (Updated based on your dataset) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Category */}
        <div className="space-y-2">
          <label className="text-zinc-700 dark:text-zinc-300 font-bold">
            Category
          </label>
          <div className="relative after:content-['▼'] after:text-[10px] after:text-zinc-400 dark:after:text-zinc-600 after:absolute after:right-4 after:top-1/2 after:-translate-y-1/2 after:pointer-events-none">
            <select name="category" required className={dropdownClassName}>
              <option
                value="Main Course"
                className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200"
              >
                Main Course
              </option>
              <option
                value="Dessert"
                className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200"
              >
                Dessert
              </option>
              <option
                value="Appetizer"
                className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200"
              >
                Appetizer
              </option>
            </select>
          </div>
        </div>

        {/* Cuisine Type */}
        <div className="space-y-2">
          <label className="text-zinc-700 dark:text-zinc-300 font-bold">
            Cuisine Type
          </label>
          <div className="relative after:content-['▼'] after:text-[10px] after:text-zinc-400 dark:after:text-zinc-600 after:absolute after:right-4 after:top-1/2 after:-translate-y-1/2 after:pointer-events-none">
            <select name="cuisineType" required className={dropdownClassName}>
              <option
                value="Bangladeshi"
                className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200"
              >
                Bangladeshi
              </option>
              <option
                value="Indian"
                className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200"
              >
                Indian
              </option>
              <option
                value="Asian"
                className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200"
              >
                Asian
              </option>
            </select>
          </div>
        </div>

        {/* Difficulty Level */}
        <div className="space-y-2">
          <label className="text-zinc-700 dark:text-zinc-300 font-bold">
            Difficulty Level
          </label>
          <div className="relative after:content-['▼'] after:text-[10px] after:text-zinc-400 dark:after:text-zinc-600 after:absolute after:right-4 after:top-1/2 after:-translate-y-1/2 after:pointer-events-none">
            <select
              name="difficultyLevel"
              required
              className={dropdownClassName}
            >
              <option
                value="Easy"
                className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200"
              >
                Easy
              </option>
              <option
                value="Medium"
                className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200"
              >
                Medium
              </option>
              <option
                value="Hard"
                className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200"
              >
                Hard
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Preparation Time */}
      <div className="space-y-2 w-full">
        <label className="text-zinc-700 dark:text-zinc-300 font-bold">
          Preparation Time
        </label>
        <input
          type="text"
          name="preparationTime"
          required
          placeholder="e.g., 60 mins, 120 mins"
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 focus:outline-none focus:border-orange-500 text-zinc-800 dark:text-zinc-100 transition-colors"
        />
      </div>

      {/* Ingredients */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-zinc-700 dark:text-zinc-300 font-bold">
            Ingredients
          </label>
          <button
            type="button"
            onClick={addIngredient}
            className="inline-flex items-center gap-1 text-xs font-black text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-lg hover:bg-orange-500 hover:text-white transition-all"
          >
            <FiPlus size={14} /> Add Ingredient
          </button>
        </div>
        <div className="space-y-2">
          {ingredients.map((ing, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={ing}
                required
                placeholder={`Ingredient #${index + 1}`}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 focus:outline-none focus:border-orange-500 text-zinc-800 dark:text-zinc-100 transition-colors"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-400 hover:text-rose-500 transition-colors"
                >
                  <FiTrash size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-zinc-700 dark:text-zinc-300 font-bold">
            Instructions Steps
          </label>
          <button
            type="button"
            onClick={addInstruction}
            className="inline-flex items-center gap-1 text-xs font-black text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-lg hover:bg-orange-500 hover:text-white transition-all"
          >
            <FiPlus size={14} /> Add Step
          </button>
        </div>
        <div className="space-y-2">
          {instructions.map((ins, index) => (
            <div key={index} className="flex items-center gap-2">
              <textarea
                value={ins}
                required
                rows={2}
                placeholder={`Step #${index + 1}`}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 focus:outline-none focus:border-orange-500 text-zinc-800 dark:text-zinc-100 transition-colors resize-none"
              />
              {instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-400 hover:text-rose-500 transition-colors"
                >
                  <FiTrash size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900/60">
        <button
          type="submit"
          disabled={isUploading}
          className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white font-black uppercase tracking-wider text-xs rounded-xl shadow-md shadow-orange-500/10 hover:bg-orange-600 transition-all active:scale-95 disabled:bg-zinc-400 disabled:shadow-none disabled:scale-100"
        >
          Publish Recipe
        </button>
      </div>
    </form>
  );
};

export default AddRecipeForm;
