import Sidebar from "@/components/dashboard/Sidebar";
import { getSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
export default async function DashboardLayout({ children }) {
  const session = await getSession();
  if (!session?.user) redirect("/login")

  return (
    <div className="flex min-h-screen pt-0 bg-zinc-50 dark:bg-black space-t-10">
      <Sidebar userRole={session?.user?.role} />

      {/* মেইন কন্টেন্ট এরিয়া */}
      {/* এখানে pb-24 বা pb-28 দিলে বটম বারের জন্য জায়গা তৈরি হবে */}
      <main className="flex-1 w-full p-4 md:p-8 pb-28 lg:pb-8">{children}</main>
    </div>
  );
}
