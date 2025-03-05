"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DUMMY_CATEGORIES } from "./dummy-data";

interface Category {
  id: number;
  name: string;
  description: string;
  itemCount: number;
  isFollowing: boolean;
}

export function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>(DUMMY_CATEGORIES);

  const toggleFollow = (id: number) => {
    setCategories((cats) =>
      cats.map((c) => (c.id === id ? { ...c, isFollowing: !c.isFollowing } : c))
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
      {categories.map((category) => (
        <Card key={category.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
              <span className="text-sm text-muted-foreground mt-2 block">
                {category.itemCount} items
              </span>
            </div>
            <Button
              variant={category.isFollowing ? "outline" : "default"}
              onClick={() => toggleFollow(category.id)}
            >
              {category.isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
