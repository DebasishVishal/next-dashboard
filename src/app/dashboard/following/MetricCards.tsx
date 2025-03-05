"use client";

import { useState, useEffect } from "react";
import { AppWindowIcon as Apps, Grid2X2, Hash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSidebarContext } from "../layout";

// Skeleton component for loading
const SkeletonCard = () => (
  <Card className="p-5 animate-pulse">
    <div className="flex flex-col justify-center h-full">
      <div className="flex items-center justify-between">
        <div className="h-6 w-16 bg-gray-100 rounded"></div>
        <div className="h-5 w-5 bg-gray-100 rounded"></div>
      </div>
      <div className="h-12 w-24 bg-gray-100 rounded mt-4"></div>
    </div>
  </Card>
);

export default function MetricCards() {
  const [appsCount, setAppsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [keywordsCount, setKeywordsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { isOpen, isMobile } = useSidebarContext();

  // Determine the effective breakpoint based on sidebar state
  const breakpoint1 = isOpen ? "lg" : "md";
  const breakpoint2 = isOpen ? "md" : "sm";

  useEffect(() => {
    const fetchFollowedCounts = async () => {
      try {
        const response = await fetch("/api/following/counts", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          console.warn(
            `Failed to fetch followed counts: ${response.status} - Using default values`
          );
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setAppsCount(data.appsCount);
        setCategoriesCount(data.categoriesCount);
        setKeywordsCount(data.keywordsCount);
      } catch (error) {
        console.warn(
          "Error fetching followed counts - Using default values",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowedCounts();
  }, []);

  return (
    <>
      <div className="mt-10 mb-2">
        <span className="text-xl font-semibold">Followed Insights</span>
      </div>
      <div
        className={`mt-2 mb-8 grid grid-cols-1 gap-4 ${breakpoint2}:gap-5 ${breakpoint2}:grid-cols-2 ${breakpoint1}:grid-cols-3`}
      >
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <Card className="p-4">
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between text-lg font-semibold text-neutral-900">
                  <span>Apps</span>
                  <Apps className="mr-2 h-5 w-5" />
                </div>
                <p className="text-4xl font-bold">{48}</p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between text-lg font-semibold text-neutral-900">
                  <span>Categories</span>
                  <Grid2X2 className="mr-2 h-5 w-5" />
                </div>
                <p className="text-4xl font-bold">{10}</p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between text-lg font-semibold text-neutral-900">
                  <span>Keywords</span>
                  <Hash className="mr-2 h-5 w-5" />
                </div>
                <p className="text-4xl font-bold">{12}</p>
              </div>
            </Card>
          </>
        )}
      </div>
    </>
  );
}
