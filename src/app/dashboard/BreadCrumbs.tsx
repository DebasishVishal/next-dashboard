"use client";

import { useBreadcrumb } from "./BreadCrumbsContext"; // Import the context
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define breadcrumb mappings based on sidebar menu
const breadcrumbMap: Record<
  string,
  { label: string; parent?: string; href?: string }
> = {
  "/": { label: "Home", href: "/" },
  "/dashboard": { label: "Home", href: "/dashboard" }, // Redirects to home for consistency
  "/dashboard/profile": { label: "Profile", href: "/dashboard/profile" },
  "/dashboard/following": {
    label: "My Following List",
    parent: "/dashboard/subscriptions",
    href: "/dashboard/following",
  },
  "/dashboard/subscriptions": {
    label: "Subscriptions",
    href: "/dashboard/subscriptions",
  },
  "/dashboard/starred": {
    label: "Starred",
    parent: "/dashboard/subscriptions",
    href: "/dashboard/starred",
  },
  "/dashboard/subscriptions-settings": {
    label: "Settings",
    parent: "/dashboard/subscriptions",
    href: "/dashboard/subscriptions-settings",
  },
  "/dashboard/models": { label: "Models", href: "/dashboard/models" },
  "/dashboard/models/genesis": {
    label: "Genesis",
    parent: "/dashboard/models",
    href: "/dashboard/models/genesis",
  },
  "/dashboard/models/explorer": {
    label: "Explorer",
    parent: "/dashboard/models",
    href: "/dashboard/models/explorer",
  },
  "/dashboard/models/quantum": {
    label: "Quantum",
    parent: "/dashboard/models",
    href: "/dashboard/models/quantum",
  },
  "/dashboard/documentation": {
    label: "Documentation",
    href: "/dashboard/documentation",
  },
  "/dashboard/documentation/introduction": {
    label: "Introduction",
    parent: "/dashboard/documentation",
    href: "/dashboard/documentation/introduction",
  },
  "/dashboard/documentation/get-started": {
    label: "Get Started",
    parent: "/dashboard/documentation",
    href: "/dashboard/documentation/get-started",
  },
  "/dashboard/documentation/tutorials": {
    label: "Tutorials",
    parent: "/dashboard/documentation",
    href: "/dashboard/documentation/tutorials",
  },
  "/dashboard/documentation/changelog": {
    label: "Changelog",
    parent: "/dashboard/documentation",
    href: "/dashboard/documentation/changelog",
  },
  "/dashboard/settings": { label: "Settings", href: "/dashboard/settings" },
  "/dashboard/settings/general": {
    label: "General",
    parent: "/dashboard/settings",
    href: "/dashboard/settings/general",
  },
  "/dashboard/settings/team": {
    label: "Team",
    parent: "/dashboard/settings",
    href: "/dashboard/settings/team",
  },
  "/dashboard/settings/billing": {
    label: "Billing",
    parent: "/dashboard/settings",
    href: "/dashboard/settings/billing",
  },
  "/dashboard/settings/limits": {
    label: "Limits",
    parent: "/dashboard/settings",
    href: "/dashboard/settings/limits",
  },
  "/dashboard/contact": { label: "Support", href: "/dashboard/contact" },
  "/dashboard/feedback": { label: "Feedback", href: "/dashboard/feedback" },
};

export function Breadcrumbs() {
  const { activeItem } = useBreadcrumb();

  // Find the current breadcrumb data
  const current = breadcrumbMap[activeItem] || { label: "" };
  const path: { label: string; href?: string }[] = [];

  // Build the breadcrumb path by following parents
  let currentPath = activeItem;
  while (currentPath) {
    const item = breadcrumbMap[currentPath];
    if (!item) break;
    path.unshift({ label: item.label, href: item.href });
    currentPath = item.parent || "";
  }

  // Special case: If activeItem is "/", show only "Home"
  if (activeItem === "/" || activeItem === "/dashboard") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // Special case: For top-level items like Profile, show only their label
  if (activeItem === "/dashboard/profile") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // For nested items, exclude "Home" and start with the parent
  if (path.length > 0 && current.parent) {
    const filteredPath = path.filter((item) => item.label !== "Home");
    if (filteredPath.length > 0) {
      const breadcrumbItems = filteredPath.map((item, index) => {
        if (index === filteredPath.length - 1) {
          return (
            <BreadcrumbItem key={item.href || item.label}>
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            </BreadcrumbItem>
          );
        }

        return (
          <BreadcrumbItem key={item.href || item.label}>
            <BreadcrumbLink href={item.href || "#"}>
              {item.label}
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
        );
      });

      return (
        <Breadcrumb>
          <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
        </Breadcrumb>
      );
    }
  }

  // Fallback for unknown or direct items (shouldn't reach here with current setup)
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>{current.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
