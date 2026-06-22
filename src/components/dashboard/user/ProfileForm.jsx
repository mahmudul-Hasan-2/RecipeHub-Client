"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client"; // তোমার authClient ইমপোর্ট করো
import toast from "react-hot-toast"; // নোটিফিকেশনের জন্য

const ProfileForm = ({ user }) => {
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Better Auth এর updateUser ফাংশন
      const { data, error } = await authClient.updateUser({
        name: name,
        image: image,
      });

      if (error) {
        toast.error(error.message || "Something went wrong!");
      } else {
        toast.success("Profile updated successfully!");
        window.location.reload();
      }
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-8">
      {/* Name Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-500 uppercase">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Enter your name"
        />
      </div>

      {/* Image URL Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-500 uppercase">
          Profile Image URL
        </label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Paste image link here"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-zinc-200 dark:shadow-none disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfileForm;
