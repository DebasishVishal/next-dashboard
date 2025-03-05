"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUpIcon as Trending, Hash } from "lucide-react";
import { DUMMY_KEYWORDS } from "./dummy-data";

interface Keyword {
  id: number;
  keyword: string;
  searchVolume: number;
  trending: boolean;
  isFollowing: boolean;
}

export function KeywordsList() {
  const [keywords, setKeywords] = useState<Keyword[]>(DUMMY_KEYWORDS);

  const toggleFollow = (id: number) => {
    setKeywords((kws) =>
      kws.map((k) => (k.id === id ? { ...k, isFollowing: !k.isFollowing } : k))
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
      {keywords.map((keyword) => (
        <Card key={keyword.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">{keyword.keyword}</h3>
                {keyword.trending && (
                  <Badge variant="secondary">
                    <Trending className="h-3 w-3 mr-1 text-white" />
                    <span className="text-white">Trending</span>
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {keyword.searchVolume.toLocaleString()} monthly searches
              </p>
            </div>
            <Button
              variant={keyword.isFollowing ? "outline" : "default"}
              onClick={() => toggleFollow(keyword.id)}
            >
              {keyword.isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
