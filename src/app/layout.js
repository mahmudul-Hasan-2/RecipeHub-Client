"use client"; // এটি 'use client' হতে হবে কারণ আমরা usePathname ব্যবহার করছি

import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppNavbar from "@/components/Navbar"; // তোর Navbar
import AppFooter from "@/components/Footer"; // তোর Footer
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // চেক করো পাথটি '/dashboard' দিয়ে শুরু হয়েছে কি না
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {/* যদি ড্যাশবোর্ডে থাকে, Navbar দেখাবে না */}
          {!isDashboard ? <AppNavbar></AppNavbar> : null}

          <main className="mt-20">{children}</main>

          {/* যদি ড্যাশবোর্ডে থাকে, Footer দেখাবে না */}
          {!isDashboard ? <AppFooter></AppFooter> : null}
        </ThemeProvider>
        <Toaster toastOptions={{ style: { zIndex: 999999 } }}></Toaster>
      </body>
    </html>
  );
}
