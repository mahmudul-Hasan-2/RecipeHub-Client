import { ThemeProvider } from "@/components/ThemeProvider";
import AppNavbar from "@/components/Navbar";
import "./globals.css";
import AppFooter from "@/components/recipes/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "RecipeHub",
  description: "Browse and share delicious recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 🚀 body-তে min-h-screen এবং w-full নিশ্চিত করা হয়েছে */}
      <body className="min-h-screen w-full flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider>
          <AppNavbar />
          <main className="pt-24 w-full flex-1 flex flex-col">{children}</main>
          <AppFooter />
        </ThemeProvider>
        <Toaster
          containerStyle={{
            zIndex: 99999,
          }}
        />
      </body>
    </html>
  );
}
