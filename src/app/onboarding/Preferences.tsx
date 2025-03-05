"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Check, Plus } from "lucide-react";
import { useOnboarding } from "./OnboardingContext";

const topics = [
  "Technology",
  "Politics",
  "Sports",
  "Science",
  "Business",
  "Health",
  "Music",
  "Entertainment",
  "Art",
  "Food",
  "Travel",
  "Fashion",
  "Education",
  "Environment",
  "History",
  "Culture",
  "Economy",
  "Lifestyle",
  "Climate Change",
  "Mental Health",
  "Social Media",
  "Artificial Intelligence",
  "Space Exploration",
  "Equality",
  "Globalization",
];

export default function Preferences() {
  const { data, updateData } = useOnboarding();
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    data.preferences.interests
  );
  const [searchTerm, setSearchTerm] = useState(""); // Added search state

  const filteredTopics = topics.filter((topic) =>
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filter topics based on search

  const toggleTopic = (topic: string) => {
    const updatedTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic)
      : [...selectedTopics, topic];
    setSelectedTopics(updatedTopics);
    updateData("preferences", { interests: updatedTopics });
  };

  return (
    <div className="space-y-4 mb-10">
      <div>
        <p className="text-muted-foreground">Step 4 of 4</p>
        <h1 className="text-2xl font-semibold">
          Select Topics to Personalize Your Experience
        </h1>
        <p className="text-muted-foreground text-sm">
          Select topics you're interested in to personalize your experience.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for topics"
            className="pl-8 pb-2 w-[180px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3 overflow-x-auto max-h-[188px] pb-2">
          {filteredTopics.map((topic) => (
            <Badge
              key={topic}
              variant={selectedTopics.includes(topic) ? "default" : "outline"}
              className={`
                cursor-pointer text-sm font-semibold px-3 py-2 flex items-center gap-2
                transition-colors duration-300
                ${
                  selectedTopics.includes(topic)
                    ? "hover:bg-neutral-700" // Darker neutral hover for selected badges
                    : "hover:bg-neutral-100" // Light neutral hover for unselected badges
                }
              `}
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
