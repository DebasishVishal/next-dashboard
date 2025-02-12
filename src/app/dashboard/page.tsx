"use client"; // Ensure this is a client component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user", {
          credentials: "include", // Include cookies for session authentication
        });

        const responseStatus = await fetch("/api/onboarding/status", {
          credentials: "include",
        });

        if (response.ok && responseStatus.ok) {
          const userData = await response.json();
          setUser(userData.user); // Set user data from the API response
          console.log(userData);

          const status = await responseStatus.json();
          // console.log("Onboarding status:", status);

          if (status == false) {
            console.log("Redirecting to dashboard page");
            router.push("/onboarding");
          }
        } else {
          // If the user is not authenticated, the middleware will explicitly handle redirection
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      // Call the backend logout endpoint to clear session cookies
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include", // Include cookies
      });

      // Redirect to login page
      router.replace("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <p>
        Welcome, {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
      <img
        src={`${user.picture}?alt=media`}
        className="h-20 w-24"
        alt="Profile"
      />

      <Button className="m-4" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

// "use client"; // Ensure this is a client component

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// interface User {
//   email: string;
//   firstName: string;
//   lastName: string;
//   picture: string;
// }

// export default function Dashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch("/api/user", {
//           credentials: "include", // Include cookies for session authentication
//         });

//         if (response.ok) {
//           const userData = await response.json();
//           setUser(userData.user); // Set user data from the API response
//           console.log(userData);
//         } else {
//           // If the user is not authenticated, redirect to login
//           router.replace("/login");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         router.replace("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [router]);

//   const handleLogout = async () => {
//     try {
//       // Call the backend logout endpoint to clear session cookies
//       await fetch("http://localhost:5000/auth/logout", {
//         method: "POST",
//         credentials: "include", // Include cookies
//       });

//       // Redirect to login page
//       router.replace("/login");
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <div>Redirecting to login...</div>;
//   }

//   return (
//     <div className="p-4">
//       <h1>Dashboard</h1>
//       <p>
//         Welcome, {user.firstName} {user.lastName}
//       </p>
//       <p>Email: {user.email}</p>
//       <img
//         src={`${user.picture}?alt=media`}
//         className="h-20 w-24"
//         alt="Profile"
//       />

//       <Button className="m-4" onClick={handleLogout}>
//         Logout
//       </Button>
//     </div>
//   );
// }

// "use client"; // Ensure this is a client component

// import React, { useState, useEffect } from "react";
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
//   const searchParams = useSearchParams();
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const userQuery = searchParams.get("user");

//     if (userQuery) {
//       try {
//         const decodedUser = JSON.parse(decodeURIComponent(userQuery));
//         setUser(decodedUser.user);

//         // Store user in localStorage for future sessions
//         localStorage.setItem("user", JSON.stringify(decodedUser.user));

//         console.log(decodedUser.user);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//       }
//     } else {
//       // Fallback: Load from localStorage if no query param
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       } else {
//         // Redirect to login AFTER component renders
//         setTimeout(() => router.replace("/login"), 500);
//       }
//     }
//   }, [searchParams, router]);

//   const handleLogout = async () => {
//     // Clear user data from localStorage
//     localStorage.removeItem("user");

//     // Call the backend logout endpoint to clear session cookies
//     try {
//       await fetch("http://localhost:5000/auth/logout", {
//         method: "POST",
//         credentials: "include", // Include cookies
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }

//     document.cookie.split(";").forEach((cookie) => {
//       const [name] = cookie.split("=");
//       document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost`;
//     });

//     // Redirect to login page
//     router.replace("/login");
//   };

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
//       <img
//         src={`${user.picture}?alt=media`}
//         className="h-20 w-24"
//         alt="Profile"
//       />

//       <Button className="m-4" onClick={handleLogout}>
//         Logout
//       </Button>
//     </div>
//   );
// };

// export default Dashboard;

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
