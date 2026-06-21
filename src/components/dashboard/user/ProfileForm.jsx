"use client";
import React, { useState } from "react";

const ProfileForm = ({ user }) => {
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating profile:", { name, image });
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
        className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-zinc-200 dark:shadow-none"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProfileForm;
