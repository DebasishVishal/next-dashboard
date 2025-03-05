import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import TopNav from "@/components/TopNav";
import Navbar from "@/components/Navbar";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopDigest | Home",
  description: "ShopDigest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const headersList = await headers();
  // const headerUrl = headersList.get("x-url") || "";

  // // console.log(headerUrl);

  // // If headerUrl is an absolute URL, extract its pathname.
  // let currentPath = headerUrl;
  // try {
  //   currentPath = new URL(headerUrl).pathname;
  // } catch (error) {
  //   console.error(error);
  // }

  // // console.log(currentPath);

  // Note: Use when exact path is required
  // const isLogin =
  //   currentPath === "/login" ||
  //   currentPath === "/dashboard" ||
  //   currentPath === "/onboarding";

  // console.log("isLogin: ", isLogin);

  // Use when nested path is required
  // const loginPaths = ["/login", "/dashboard", "/onboarding"];

  // // Check if currentPath starts with any login path
  // const isLogin = loginPaths.some((path) => currentPath.startsWith(path));

  return (
    <html lang="en">
      <body className={`${GeistSans.className} antialiased`}>
        <Toaster />
        <TopNav />
        <Navbar />
        {children}
        {/* {!isLogin && (
          <>
            <div className="w-full border-t"></div>
            <Footer />
            <BottomFooter />
          </>
        )}
        <Analytics /> */}
      </body>
    </html>
  );
}
