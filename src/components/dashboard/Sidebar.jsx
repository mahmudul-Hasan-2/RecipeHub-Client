import React from "react";
import Link from "next/link";
import { getSession } from "@/lib/core/session";
import {
  Soup,
  ChefHat,
  Heart,
  ShoppingCart,
  User,
  ChartBar,
  LayoutDashboard,
  Users,
  ShieldAlert,
} from "lucide-react";
import { FiHome } from "react-icons/fi";
import Image from "next/image";

const Sidebar = async () => {
  const session = await getSession();
  const user = session?.user;

  const userMenuItems = [
    { name: "Overview", href: "/dashboard/user", icon: FiHome },
    { name: "My Recipes", href: "/dashboard/user/recipes", icon: Soup },
    { name: "Add Recipe", href: "/dashboard/user/recipes/add", icon: ChefHat },
    { name: "My Favorites", href: "/dashboard/user/favorites", icon: Heart },
    {
      name: "Purchased",
      href: "/dashboard/user/purchased-recipes",
      icon: ShoppingCart,
    },
    { name: "Profile", href: "/dashboard/user/profile", icon: User },
  ];

  const adminMenuItems = [
    { name: "Overview", href: "/dashboard/admin", icon: FiHome },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { name: "Manage Recipes", href: "/dashboard/admin/recipes", icon: Soup },
    { name: "Reports", href: "/dashboard/admin/reports", icon: ChartBar },
  ];

  const userRole = {
    user: userMenuItems,
    admin: adminMenuItems,
  };

  const menuItems = userRole[user?.role] || [];

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white/70 dark:bg-zinc-950/40 backdrop-blur-xl border-r border-zinc-200/60 dark:border-zinc-800/80 p-6 pt-24 justify-between antialiased transition-all duration-300 z-[100]">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 py-1.5 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/40">
            <Image
              src={user?.image}
              alt={user?.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h4 className="text-sm font-black text-zinc-800 dark:text-zinc-100 line-clamp-1 capitalize">
                {user?.name || "Culinary Chef"}
              </h4>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500 bg-orange-500/10 dark:bg-orange-500/20 px-2 py-0.5 rounded-md">
                {user?.role || "User"}
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-orange-500 dark:hover:text-orange-500 transition-all duration-250 group"
                >
                  <Icon
                    size={18}
                    className="text-zinc-400 dark:text-zinc-500 group-hover:text-orange-500 transition-colors"
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-900/60">
          <Link
            href="/"
            className="flex items-center justify-center w-full px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 bg-zinc-100/80 dark:bg-zinc-900/60 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white shadow-sm transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-zinc-950/60 backdrop-blur-xl border-t border-zinc-200/60 dark:border-zinc-800/80 px-4 flex items-center justify-around z-50 transition-colors duration-300 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        {menuItems.slice(0, 5).map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-500 active:scale-95 transition-all"
            >
              <Icon size={20} />
              <span className="text-[10px] font-black tracking-tight">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
