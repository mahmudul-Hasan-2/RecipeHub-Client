"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { updateUserStatus } from "@/lib/actions/users";

const UserTable = ({ users: initialUsers }) => {
  // পেজ রিফ্রেশ না করে ডাটা আপডেট করার জন্য স্টেট ব্যবহার
  const [users, setUsers] = useState(initialUsers);

  // কোনো ইউজার বা প্রপস চেঞ্জ হলে স্টেট আপডেট করা
  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = !currentStatus; // উল্টোটি করো

    // API কল
    const data = await updateUserStatus(id, newStatus);

    if (data.modifiedCount > 0) {
      toast.success(
        `User ${newStatus ? "blocked" : "unblocked"} successfully!`,
      );

      // স্টেট আপডেট করো যাতে UI সাথে সাথে পরিবর্তন হয়
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isBlocked: newStatus } : user,
        ),
      );
    } else {
      toast.error("Failed to update user status.");
    }
  };

  return (
    <div className="w-full">
      {/* Container: থিম অনুযায়ী ব্যাকগ্রাউন্ড এবং বর্ডার */}
      <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200  overflow-hidden shadow-sm">
        {/* ডেস্কটপ হেডলাইন */}
        <div className="hidden md:grid grid-cols-4 bg-zinc-50 dark:bg-zinc-900 p-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
          <div>User</div>
          <div>Email</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {/* ইউজার লিস্ট */}
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {users.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-1 md:grid-cols-4 items-center p-4 gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
            >
              <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                {user.name}
              </div>

              <div className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
                {user.email}
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    user.isBlocked
                      ? "bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400"
                      : "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                </span>
              </div>

              <div className="text-right">
                <Button
                  size="sm"
                  variant="flat"
                  color={user.isBlocked ? "success" : "danger"}
                  onClick={() => handleStatusUpdate(user._id, user.isBlocked)}
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
