"use client";
import React from "react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { updateUserStatus } from "@/lib/actions/users";

const UserTable = ({ users }) => {
  console.log(users);
  const handleStatusUpdate = async (id, status) => {
    console.log(id, status);
    const data = await updateUserStatus(id, status);
    console.log(data);
    if (data.modifiedCount > 0) {
      toast.success(`User ${status ? "blocked" : "unblocked"} successfully!`);
      window.location.reload();
    } else {
      toast.error("Failed to update user status. Please try again.");
    }
  };

  return (
    <div className="w-full">
      {/* Container: সব ডিভাইসে কাজ করবে */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* ডেস্কটপ হেডলাইন (মোবাইলে হাইড থাকবে) */}
        <div className="hidden md:grid grid-cols-4 bg-zinc-50 dark:bg-zinc-800 p-4 text-xs font-bold text-zinc-500 uppercase">
          <div>User</div>
          <div>Email</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {/* ইউজার লিস্ট */}
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {users.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-1 md:grid-cols-4 items-center p-4 gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              {/* User Name */}
              <div className="font-bold text-sm">{user.name}</div>

              {/* Email */}
              <div className="text-sm text-zinc-500 truncate">{user.email}</div>

              {/* Status */}
              <div>
                <span
                  className={`px-2 py-1 rounded-full text-[10px] font-bold ${user.isBlocked ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"}`}
                >
                  {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                </span>
              </div>

              {/* Actions */}
              <div className="text-right">
                <Button
                  size="sm"
                  variant="flat"
                  color={user.isBlocked ? "success" : "danger"}
                  onClick={() =>
                    handleStatusUpdate(user._id, user.isBlocked ? false : true)
                  }
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
