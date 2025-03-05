"use client";

import { AppSidebar } from "@/components/AppSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Breadcrumbs } from "./BreadCrumbs"; // Import the updated component
import { BreadcrumbProvider } from "./BreadCrumbsContext"; // Import the provider
import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

// Create SidebarContext
interface SidebarContextType {
  isOpen: boolean;
  isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// SidebarContext Provider component
function SidebarContextProvider({ children }: { children: ReactNode }) {
  const { open, isMobile } = useSidebar();

  return (
    <SidebarContext.Provider value={{ isOpen: open, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Custom hook to use SidebarContext
export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error(
      "useSidebarContext must be used within a SidebarContextProvider"
    );
  }
  return context;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerHeight, setHeaderHeight] = useState(90);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Function to calculate the total height of TopNav + Navbar based on viewport visibility
    const updateHeaderHeight = () => {
      const topNav = document.querySelector(".top-nav");
      const navbar = document.querySelector("nav.sticky");
      let totalHeight = 0;

      if (topNav) {
        const topNavRect = topNav.getBoundingClientRect();
        // Check if TopNav is completely out of the viewport
        const isVisible =
          topNavRect.top < window.innerHeight && topNavRect.bottom > 0;
        if (isVisible) {
          totalHeight += topNavRect.height;
        }
      }
      if (navbar) {
        totalHeight += navbar.getBoundingClientRect().height;
      }

      setHeaderHeight(totalHeight);
    };

    // Initial height calculation
    updateHeaderHeight();

    // Immediate scroll handler for instant updates
    const handleScroll = () => {
      requestAnimationFrame(updateHeaderHeight);
    };

    // Resize handler
    const handleResize = () => {
      requestAnimationFrame(updateHeaderHeight);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // // Pass sidebar state to children via a prop
  // const EnhancedChildren = React.cloneElement(children as React.ReactElement, {
  //   isSidebarOpen, // Pass the manual sidebar state (true on desktop by default, false on mobile or when closed)
  // });

  // // Debugging: Log sidebar state changes
  // useEffect(() => {
  //   console.log("Sidebar state changed:", isSidebarOpen);
  // }, [isSidebarOpen]);

  return (
    <BreadcrumbProvider>
      <SidebarProvider>
        <SidebarContextProvider>
          <AppSidebar
            className="fixed transition-all duration-150 pt-0"
            style={{
              top: `${headerHeight}px`,
              height: `calc(100svh - ${headerHeight}px)`,
            }}
          />
          <SidebarInset className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-x-auto">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumbs />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-x-auto">
              {children}
            </div>
          </SidebarInset>
        </SidebarContextProvider>
      </SidebarProvider>
    </BreadcrumbProvider>
  );
}

// import { AppSidebar } from "@/components/AppSidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Breadcrumbs } from "./BreadCrumbs";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <SidebarProvider>
//       <AppSidebar className="z-50" />
//       <SidebarInset className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-x-auto">
//         <header className="flex h-16 shrink-0 items-center gap-2 border-b">
//           <div className="flex items-center gap-2 px-4">
//             {/* Optional: Add a trigger or breadcrumb if needed */}
//             {/* For now, we'll keep it simple */}
//             <SidebarTrigger className="-ml-1" />
//             <Separator orientation="vertical" className="mr-2 h-4" />
//             {/* <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem className="hidden md:block">
//                   <BreadcrumbLink href="#">Home</BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator className="hidden md:block" />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage>Data Fetching</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb> */}
//             <Breadcrumbs />
//           </div>
//         </header>
//         <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-x-auto">
//           {children}
//         </div>
//         {/* {children} */}
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }
