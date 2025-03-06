"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DashboardHome from "./DashboardHome";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await fetch("/api/user", {
  //         credentials: "include", // Include cookies for session authentication
  //       });

  //       const responseStatus = await fetch("/api/onboarding/status", {
  //         credentials: "include",
  //       });

  //       if (response.ok && responseStatus.ok) {
  //         const userData = await response.json();
  //         setUser(userData.user); // Set user data from the API response
  //         console.log(userData);

  //         const status = await responseStatus.json();
  //         // console.log("Onboarding status:", status);

  //         if (status == false) {
  //           console.log("Redirecting to dashboard page");
  //           router.push("/onboarding");
  //         }
  //       } else {
  //         // If the user is not authenticated, the middleware will explicitly handle redirection
  //         console.error("Failed to fetch user data");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, [router]);

  const handleLogout = async () => {
    try {
      // Call the backend logout endpoint to clear session cookies
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // Include cookies
      });

      // Redirect to login page
      router.replace("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center">
  //       <div className="w-10 h-10 border-4 border-neutral-900 border-t-transparent rounded-full animate-spin" />
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return <div>No user data found.</div>;
  // }

  return (
    <div className="pt-4 flex flex-col justify-center items-center">
      {/* <h1>Dashboard</h1>
      <p>
        Welcome, {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
      <img
        src={`${user.picture}?alt=media`}
        className="h-20 w-24"
        alt="Profile"
      />
      <Link
        href="/dashboard/following"
        className="text-blue-500 hover:underline"
      >
        Go to Following List
      </Link> */}

      <DashboardHome firstName={"User"} />

      <div>
        <Button className="mt-5" variant={"outline"} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

// "use client"; // Ensure this is a client component

// import React, { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// interface User {
//   email: string;
//   firstName: string;
//   lastName: string;
//   picture: string;
// }

// const Dashboard: React.FC = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams(); // ✅ Get query params dynamically

//   // Get user data from query params
//   const userQuery = searchParams.get("user");
//   let user: User | null = null;

//   if (userQuery) {
//     try {
//       const decodedUser = JSON.parse(decodeURIComponent(userQuery));
//       user = decodedUser.user;

//       // Store user in localStorage for future sessions
//       if (typeof window !== "undefined") {
//         localStorage.setItem("user", JSON.stringify(user));
//       }
//     } catch (error) {
//       console.error("Error parsing user data:", error);
//     }
//   } else if (typeof window !== "undefined") {
//     // Fallback: Load from localStorage if no query param
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       user = JSON.parse(storedUser);
//     } else {
//       router.replace("/login");
//     }
//   }

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-4">
//       <h1>Dashboard</h1>
//       <p>
//         Welcome, {user.firstName} {user.lastName}
//       </p>
//       <p>Email: {user.email}</p>
//       <img src={user.picture} alt="Profile" />

//       <Button
//         className="m-4"
//         onClick={() => {
//           localStorage.removeItem("user"); // Remove user on logout
//           router.replace("/login"); // Redirect to login
//         }}
//       >
//         Logout
//       </Button>
//     </div>
//   );
// };

// export default Dashboard;
