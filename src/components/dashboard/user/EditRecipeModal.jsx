"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FiPlus,
  FiTrash,
  FiLoader,
  FiCheckCircle,
  FiEdit3,
  FiArrowLeft,
  FiX,
  FiSave,
} from "react-icons/fi";
import { FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import { updateRecipe } from "@/lib/actions/recipes";
import { useRouter } from "next/navigation";

const EditRecipeModal = ({ recipe = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 🌟 Form States
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState("Main Course");
  const [cuisineType, setCuisineType] = useState("Bangladeshi");
  const [difficultyLevel, setDifficultyLevel] = useState("Easy");
  const [preparationTime, setPreparationTime] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [imageUrl, setImageUrl] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  // 🔄 মোডাল ওপেন হলে অথবা প্রোসের রেসিপি চেঞ্জ হলে স্টেট সিঙ্ক করার জন্য ইফেক্ট
  useEffect(() => {
    if (isOpen && recipe) {
      setRecipeName(recipe.recipeName || "");
      setCategory(recipe.category || "Main Course");
      setCuisineType(recipe.cuisineType || "Bangladeshi");
      setDifficultyLevel(recipe.difficultyLevel || "Easy");
      setPreparationTime(recipe.preparationTime || "");
      setIngredients(
        recipe.ingredients?.length ? [...recipe.ingredients] : [""],
      );
      setInstructions(
        recipe.instructions?.length ? [...recipe.instructions] : [""],
      );
      setImageUrl(recipe.recipeImage || "");
    }
  }, [isOpen, recipe]);

  // 🌐 Cloudinary Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary env variables are missing!");
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData },
      );
      const data = await response.json();

      if (response.ok && data.secure_url) {
        setImageUrl(data.secure_url);
        toast.success("Image successfully updated!");
      } else {
        toast.error(data.error?.message || "Upload failed.");
      }
    } catch (error) {
      toast.error("Network error during image upload.");
    } finally {
      setIsUploading(false);
    }
  };

  // Dynamic Array Handlers
  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };
  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  const handleInstructionChange = (index, value) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };
  const addInstruction = () => setInstructions([...instructions, ""]);
  const removeInstruction = (index) =>
    setInstructions(instructions.filter((_, i) => i !== index));

  // 💾 Form Submit / Save
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!recipeName.trim()) {
      toast.error("Recipe name is required!");
      return;
    }

    setIsSaving(true);
    const updatedRecipeData = {
      recipeName,
      recipeImage: imageUrl || undefined,
      category,
      cuisineType,
      difficultyLevel,
      preparationTime,
      ingredients: ingredients.filter(Boolean),
      instructions: instructions.filter(Boolean),
      updatedAt: new Date().toISOString(),
    };

    try {
      // 🚀 আপনার সার্ভার অ্যাকশন কল হচ্ছে এখানে
      const response = await updateRecipe(updatedRecipeData, recipe._id);
        
      console.log(response);

      // আপনার সার্ভার অ্যাকশনের রিটার্ন টাইপের উপর ভিত্তি করে কন্ডিশন (নরমালি response.ok বা success চেক করা ভালো)
      if (response?.modifiedCount || response?.ok || response?.success) {
        toast.success("Recipe updated successfully!");
        handleCloseModal(); // মোডাল বন্ধ এবং স্টেট রিসেট
        router.refresh(); // নতুন ডাটা ফেচ করার জন্য পেজ রিফ্রেশ
      } else {
        toast.error("Failed to update recipe. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setShowForm(false);
  };

  const dropdownClassName =
    "w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 focus:outline-none focus:border-orange-500 text-zinc-700 dark:text-zinc-300 font-semibold cursor-pointer transition-all appearance-none pr-10 text-xs sm:text-sm";

  // 📋 Portal Content
  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={handleCloseModal}
      />

      {/* Main Modal Panel */}
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-6 right-6 p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-rose-500 hover:text-white transition-colors z-50"
        >
          <FiX size={16} />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto custom-scrollbar pr-1 flex-1">
          {/* STEP 1: OVERVIEW SCREEN */}
          {!showForm ? (
            <div className="flex flex-col items-center text-center py-8 my-auto animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-5 border border-orange-500/20">
                <FiEdit3 size={32} />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                Edit "{recipeName || "Royal Pasta"}" Dataset
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mt-3 leading-relaxed text-xs sm:text-sm">
                You are about to modify the core specifications, ingredients,
                and instructions for this recipe. Changes will be synchronized
                across the database seamlessly.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-8 px-6 py-3.5 w-full max-w-xs rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all text-xs uppercase tracking-wider"
              >
                Modify Custom Form Fields
              </button>
            </div>
          ) : (
            /* STEP 2: FULL COMPATIBLE FORM */
            <form
              onSubmit={handleSaveChanges}
              className="space-y-6 text-sm font-medium pt-2 pb-4 animate-in fade-in duration-200"
            >
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-orange-500 mb-2 transition-colors font-bold"
              >
                <FiArrowLeft size={14} /> Back to Overview
              </button>

              {/* 📸 Recipe Image Input */}
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
                  className={`w-full h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all p-4 overflow-hidden relative ${
                    imageUrl
                      ? "border-emerald-500/50 bg-emerald-500/[0.02]"
                      : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-orange-500"
                  }`}
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
                      <p className="text-[11px]">
                        Supports JPG, PNG, WEBP up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* 📝 Recipe Name */}
              <div className="space-y-2">
                <label className="text-zinc-700 dark:text-zinc-300 font-bold">
                  Recipe Name
                </label>
                <input
                  type="text"
                  required
                  value={recipeName}
                  placeholder="e.g., Kacchi Biryani, Beef Bhuna"
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 focus:outline-none focus:border-orange-500 text-zinc-800 dark:text-zinc-100 transition-colors"
                />
              </div>

              {/* 🌟 Dropdowns Group */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Category */}
                <div className="space-y-2">
                  <label className="text-zinc-700 dark:text-zinc-300 font-bold">
                    Category
                  </label>
                  <div className="relative after:content-['▼'] after:text-[10px] after:text-zinc-400 dark:after:text-zinc-600 after:absolute after:right-4 after:top-1/2 after:-translate-y-1/2 after:pointer-events-none">
                    <select
                      value={category}
                      required
                      onChange={(e) => setCategory(e.target.value)}
                      className={dropdownClassName}
                    >
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
                    <select
                      value={cuisineType}
                      required
                      onChange={(e) => setCuisineType(e.target.value)}
                      className={dropdownClassName}
                    >
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
                      value={difficultyLevel}
                      required
                      onChange={(e) => setDifficultyLevel(e.target.value)}
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

              {/* ⏱️ Preparation Time */}
              <div className="space-y-2 w-full">
                <label className="text-zinc-700 dark:text-zinc-300 font-bold">
                  Preparation Time
                </label>
                <input
                  type="text"
                  required
                  value={preparationTime}
                  placeholder="e.g., 60 mins, 120 mins"
                  onChange={(e) => setPreparationTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 focus:outline-none focus:border-orange-500 text-zinc-800 dark:text-zinc-100 transition-colors"
                />
              </div>

              {/* 🍳 Ingredients */}
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
                        required
                        value={ing}
                        placeholder={`Ingredient #${index + 1}`}
                        onChange={(e) =>
                          handleIngredientChange(index, e.target.value)
                        }
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

              {/* 📖 Instructions */}
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
                        required
                        value={ins}
                        rows={2}
                        placeholder={`Step #${index + 1}`}
                        onChange={(e) =>
                          handleInstructionChange(index, e.target.value)
                        }
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

              {/* 🎯 Sticky Footer Save Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-900/60 sticky bottom-0 bg-white dark:bg-zinc-950 z-10">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-xs font-bold transition-all active:scale-95"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-400 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md shadow-orange-500/10 transition-all active:scale-95"
                >
                  {isSaving ? (
                    <>
                      <FiLoader className="animate-spin" size={14} /> Saving...
                    </>
                  ) : (
                    <>
                      <FiSave size={14} /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ✏️ Pencil Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-orange-500 hover:text-white transition-all active:scale-95 flex items-center justify-center shadow-md border border-zinc-200 dark:border-zinc-800/60"
        title="Edit Recipe"
      >
        <FiEdit3 size={16} />
      </button>

      {/* 🚀 React Portal Magic */}
      {isOpen && mounted && createPortal(modalContent, document.body)}
    </>
  );
};

export default EditRecipeModal;
