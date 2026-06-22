"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome } from "react-icons/fi";
import {
  Soup,
  ChefHat,
  Heart,
  User,
  ChartBar,
  Users,
  ArrowLeft,
} from "lucide-react"; // ArrowLeft আইকন নিলাম

const Sidebar = ({ userRole }) => {
  const pathname = usePathname();

  const menuItems =
    userRole === "admin"
      ? [
          { name: "Overview", href: "/dashboard/admin", icon: FiHome },
          { name: "Users", href: "/dashboard/admin/users", icon: Users },
          { name: "Recipes", href: "/dashboard/admin/recipes", icon: Soup },
          { name: "Reports", href: "/dashboard/admin/reports", icon: ChartBar },
        ]
      : [
          {
            name: "Overview",
            short: "Home",
            href: "/dashboard/user",
            icon: FiHome,
          },
          {
            name: "My Recipes",
            short: "Recipes",
            href: "/dashboard/user/recipes",
            icon: Soup,
          },
          {
            name: "Add Recipe",
            short: "Add",
            href: "/dashboard/user/recipes/add",
            icon: ChefHat,
          },
          {
            name: "My Favorites",
            short: "Favs",
            href: "/dashboard/user/favorites",
            icon: Heart,
          },
          {
            name: "Profile",
            short: "Profile",
            href: "/dashboard/user/profile",
            icon: User,
          },
        ];

  return (
    <>
      {/* ডেস্কটপ সাইডবার */}
      <aside className="hidden lg:flex w-64 flex-col h-screen sticky top-0 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-2xl border-r border-zinc-200/20 p-5">
        <Link href="/" className="flex items-center gap-3 px-4 py-8 group">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg shadow-orange-500/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
            <Soup size={20} />
          </div>
          <h2 className="font-black text-xl tracking-tighter text-zinc-900 dark:text-white">
            RecipeHub
          </h2>
        </Link>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={i}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${isActive ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "text-zinc-500 hover:bg-zinc-100"}`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />{" "}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* মোবাইল বটম বার */}
      <nav className="lg:hidden fixed gap-3 bottom-0 left-0 w-full h-[72px] bg-white/20 border-t border-zinc-100/20 flex justify-around items-center z-50 px-2 shadow-2xl">
        {/* হোম বাটন */}
        <Link
          href="/"
          className="flex flex-col items-center gap-1.5 p-2 text-zinc-400 hover:text-orange-500"
        >
          <ArrowLeft size={24} />
          <span className="text-[10px] font-black">Home</span>
        </Link>

        {menuItems.slice(0, 5).map((item, i) => {
          // মোবাইলে জায়গা বাঁচাতে প্রথম ৪টি মেনু আইটেম
          const isActive = pathname === item.href;
          return (
            <Link
              key={i}
              href={item.href}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${isActive ? "text-orange-500" : "text-zinc-400"}`}
            >
              <item.icon size={16} />
              <span className="text-[10px] font-black">{item.short || item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
