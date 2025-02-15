"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Check, Plus } from "lucide-react";
import { useOnboarding } from "./onboarding-context";

const topics = [
  "Technology",
  "Politics",
  "Sports",
  "Entertainment",
  "Science",
  "Business",
  "Health",
  "Music",
  "Art",
  "Food",
  "Travel",
  "Fashion",
];

export default function Preferences() {
  const { data, updateData } = useOnboarding();
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    data.preferences.interests
  );

  const toggleTopic = (topic: string) => {
    const updatedTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic) // Remove topic if already selected
      : [...selectedTopics, topic]; // Add topic if not selected

    setSelectedTopics(updatedTopics);
    updateData("preferences", { interests: updatedTopics });
  };

  console.log(data);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-muted-foreground">Step 4 of 4</p>
        <h1 className="text-2xl font-semibold">
          Select Topics to Personalize Your Experience
        </h1>
        <p className="text-muted-foreground text-sm">
          Select topics you&apos;re interested in to personalize your
          experience.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          {topics.map((topic) => (
            <Badge
              key={topic}
              variant={selectedTopics.includes(topic) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-sm font-semibold px-3 py-2 flex items-center gap-2"
              onClick={() => toggleTopic(topic)}
            >
              <span>{topic}</span>

              {selectedTopics.includes(topic) ? (
                <Check className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
