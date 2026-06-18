import { ThemeProvider } from "@/components/ThemeProvider"; // প্রোভাইডার ইমপোর্ট করো
import AppNavbar from "@/components/Navbar"; // তোমার নেভবার কম্পোনেন্ট
import "./globals.css";

export const metadata = {
  title: "RecipeHub",
  description: "Browse and share delicious recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* suppressHydrationWarning দেওয়া জরুরি যাতে থিম পরিবর্তনের সময় কনসোলে ওয়ার্নিং না আসে */}
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider>
          <AppNavbar />
          <main className="flex-1 pt-24">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
