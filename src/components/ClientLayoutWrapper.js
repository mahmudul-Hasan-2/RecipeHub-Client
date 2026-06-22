"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppNavbar from "@/components/Navbar";
import AppFooter from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <ThemeProvider>
      {!isDashboard && <AppNavbar />}
      <main className={!isDashboard ? "mt-20" : ""}>{children}</main>
      {!isDashboard && <AppFooter />}
      <Toaster toastOptions={{ style: { zIndex: 999999 } }} />
    </ThemeProvider>
  );
}
