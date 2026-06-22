// app/layout.js
import "@/app/globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export const metadata = {
  title: "RecipeHub | Your Kitchen Partner",
  description: "Discover and share amazing recipes with the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* এখানে আমরা আমাদের Client Wrapper টি কল করবো */}
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
