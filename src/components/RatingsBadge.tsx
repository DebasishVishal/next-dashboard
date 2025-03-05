import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface RatingsBadgeProps {
  rating: number
  totalReviews?: number
}

export default function RatingsBadge({ rating, totalReviews }: RatingsBadgeProps) {
  let ratingStyle: string;

  if (rating > 3.0) ratingStyle = "bg-green-500";
  else if (rating <= 3.0 && rating > 1.0) ratingStyle = "bg-orange-500";
  else ratingStyle = "bg-red-500";

  if (rating === 0) return <p>-</p>;

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={cn("w-[50px] flex justify-center items-center gap-1 px-1.5 py-0.5 rounded-md text-white font-semibold", ratingStyle)}>
        <p>{rating.toFixed(1)}</p>
        <Star className="shrink-0 h-3 w-3 fill-white" />
      </div>
      {totalReviews && <p className="text-muted-foreground text-sm">{`(${totalReviews.toLocaleString("en-US")})`}</p>}
    </div>
  );
}
