"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { MiniGraph } from "./mini-graph";
import RatingsBadge from "@/components/RatingsBadge";

interface AppCardProps {
  app: {
    appId: string;
    name: string;
    platform: string;
    tagline: string;
    rating: number;
    reviews: number;
    iconUrl: string;
    // graphData: number[];
    isFollowing: boolean;
  };
  onUnfollow?: (appId: string) => void;
}

export function AppCard({ app, onUnfollow }: AppCardProps) {
  const [isFollowing, setIsFollowing] = useState(app.isFollowing);

  const handleUnfollowConfirm = async () => {
    try {
      setIsFollowing(false);

      const response = await fetch("/api/following/apps/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ appId: app.appId }),
      });

      if (!response.ok) {
        throw new Error("Failed to unfollow app");
      }

      if (onUnfollow) {
        onUnfollow(app.appId);
      }

      // window.location.reload(); If want to render real time update for count of apps, categories and keywords
    } catch (error) {
      console.error("Error unfollowing app:", error);
      setIsFollowing(true); // Revert if the unfollow fails
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="pl-6">
        <div className="flex items-center space-x-4">
          <Image
            src={app.iconUrl || "/placeholder.svg"}
            alt={app.name}
            width={24}
            height={24}
            className="rounded-md"
          />
          <div>
            <h2 className="font-medium text-sm">{app.name}</h2>
            {/* <p className="text-sm text-muted-foreground w-64 truncate hidden lg:inline">
              {app.tagline}
            </p> */}
          </div>
        </div>
      </td>

      <td className="px-4 text-gray-900">
        <div className="flex items-center space-x-2">
          <RatingsBadge rating={app.rating} />
        </div>
      </td>

      <td className="px-4 text-gray-900 text-sm">
        <p className="flex items-center gap-1">
          <span>{app.reviews.toLocaleString("en-US")}</span>
        </p>
      </td>

      <td className="py-1 text-gray-900">
        <div className="flex items-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className={
                  isFollowing
                    ? "h-8 border-2 rounded-full border-blue-400 bg-white text-blue-400 hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
                    : "h-8 bg-blue-400 text-white rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
                }
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you really want to unfollow {app.name}? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No</AlertDialogCancel>
                <AlertDialogAction onClick={handleUnfollowConfirm}>
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="border-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}
