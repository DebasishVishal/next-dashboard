"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppsList } from "./AppList";
import { CategoriesList } from "./CategoryList";
import { KeywordsList } from "./KeywordList";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { useSidebarContext } from "../layout";

export default function FollowingList({
  className = "",
}: {
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState("apps");
  const { isOpen, isMobile } = useSidebarContext();

  // Determine the effective breakpoint based on sidebar state
  const breakpoint = isOpen ? `lg` : `md`;

  // Function to handle tab changes and update the active tab state
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs
      defaultValue="apps"
      value={activeTab}
      onValueChange={handleTabChange}
      className="max-w-full border rounded-xl pt-4"
    >
      <div
        className={`flex flex-col ${breakpoint}:flex-row justify-between items-start`}
      >
        <TabsList className="ml-4 mb-2">
          <TabsTrigger value="apps" className="text-primary">
            Apps
          </TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
        </TabsList>
        <Button className="mx-4">
          <LayoutGrid className="mr-1 h-4 w-4" />
          {`Add new ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
        </Button>
      </div>
      <TabsContent value="apps">
        <AppsList className={className} />
      </TabsContent>
      <TabsContent value="categories">
        <CategoriesList />
      </TabsContent>
      <TabsContent value="keywords">
        <KeywordsList />
      </TabsContent>
    </Tabs>
  );
}
