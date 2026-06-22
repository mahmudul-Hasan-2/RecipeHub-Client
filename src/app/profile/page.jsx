"use client";
import ProfileForm from "@/components/dashboard/user/ProfileForm";
import { authClient } from "@/lib/auth-client";
import React from "react";

const Profile = () => {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  if (isPending) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className="p-6 text-center">Please log in to view your profile.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-black mb-8">My Profile</h1>

      {/* ইউজার ইনফো সেকশন */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-6 mb-8">
        <img
          src={user.image || "/default-avatar.png"}
          alt={user.name}
          className="w-20 h-20 rounded-full border-2 border-zinc-100 dark:border-zinc-800 object-cover"
        />
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {user.name}
          </h2>
          <p className="text-zinc-500">{user.email}</p>
        </div>
      </div>

      {/* প্রোফাইল ফর্ম */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-bold mb-6">Edit Information</h3>
        <ProfileForm user={user} />
      </div>
    </div>
  );
};

export default Profile;
