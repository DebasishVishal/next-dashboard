"use client";

import { useState, useEffect } from "react";
import { AppCard } from "./AppCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SkeletonCard } from "./SkeletonCard";
import { DUMMY_APPS } from "./dummy-data"; // Import dummy data

export interface App {
  appId: string;
  name: string;
  platform: string;
  tagline: string;
  rating: number;
  reviews: number;
  iconUrl: string;
  isFollowing: boolean;
}

export function AppsList({ className = "" }: { className?: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use dummy data instead of fetching from API
    setApps(DUMMY_APPS);
    setLoading(false); // No async operation, so loading ends immediately
  }, []);

  const handleUnfollow = (appId: string) => {
    setApps((prevApps) => prevApps.filter((app) => app.appId !== appId));
  };

  // Pagination
  const totalItems = apps.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentApps = apps.slice(startIndex, endIndex);

  // Pagination logic
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= halfVisible + 1) {
        for (let i = 1; i <= halfVisible + 2; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - halfVisible) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - (halfVisible + 1); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="py-0">
      <div className="overflow-x-auto">
        <div className="min-w-[660px] overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-100">
                <th className="py-2 pl-6 text-left font-semibold text-gray-700 w-[50%]">
                  App
                </th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700 w-[20%]">
                  Rating
                </th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700 w-[20%]">
                  Total Reviews
                </th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700 w-[10%]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: rowsPerPage }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
                : currentApps.map((app) => (
                    <AppCard
                      key={app.appId}
                      app={app}
                      onUnfollow={handleUnfollow}
                    />
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={`flex flex-col lg:flex-row items-center justify-between px-4 rounded-b-lg py-2 ${className}`}
      >
        <span className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="text-neutral-900 font-semibold">
            {startIndex + 1}-{Math.min(endIndex, totalItems)}
          </span>{" "}
          out of{" "}
          <span className="text-neutral-900 font-semibold">{totalItems}</span>
        </span>

        <div className="flex flex-col md:flex-row items-center space-x-4 mt-2 md:mt-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Items per page
            </span>
            <Select
              value={String(rowsPerPage)}
              onValueChange={(value: any) => {
                setRowsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-16">
                <SelectValue>{rowsPerPage}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-10 w-10 hover:bg-neutral-100 rounded-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {getPageNumbers().map((page, index) => (
              <Button
                key={index}
                variant={currentPage === page ? "outline" : "ghost"}
                size="icon"
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                disabled={page === "..."}
                className={`h-10 w-10 hover:bg-neutral-100 rounded-md`}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-10 w-10 hover:bg-neutral-100 rounded-md"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
