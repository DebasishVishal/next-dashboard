"use client";

import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component

export function SkeletonCard() {
  return (
    <tr className="border-b hover:bg-gray-50 h-12">
      <td className="pl-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-6 w-6 rounded-md" />
          <div>
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </td>

      <td className="px-4">
        <Skeleton className="h-6 w-16" />
      </td>

      <td className="px-4">
        <Skeleton className="h-6 w-16" />
      </td>

      <td className="py-1.5">
        <div className="flex items-center space-x-2 mr-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </td>
    </tr>
  );
}
