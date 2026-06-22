import { getUsers } from "@/lib/api/users";
import UserTable from "@/components/dashboard/admin/UserTable";
import React from "react";

const UsersPage = async () => {
  const allUsers = await getUsers();

  const users = allUsers.filter((user) => user.role !== "admin");

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">All Registered Users</h2>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <UserTable users={users} />
      </div>
    </div>
  );
};

export default UsersPage;
