"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Check, Plus } from "lucide-react";
import { useOnboarding } from "./onboarding-context";
import Image from "next/image";

import pinterest_logo from "./images/pinterest-logo.png";
import klaviyo_logo from "./images/klaviyo-logo.png";
import shopify_email_logo from "./images/shopify-email-logo.png";
import instafeed_logo from "./images/instafeed-logo.png";
import shopify_search_logo from "./images/shopify-search-logo.png";
import mailchimp_logo from "./images/mailchimp-logo.png";

const integrations = [
  {
    name: "Pinterest",
    image: pinterest_logo, // Replace with actual image URL
  },
  {
    name: "Klaviyo",
    image: klaviyo_logo, // Replace with actual image URL
  },
  {
    name: "Shopify Email",
    image: shopify_email_logo, // Replace with actual image URL
  },
  {
    name: "Instafeed",
    image: instafeed_logo, // Replace with actual image URL
  },
  {
    name: "Shopify",
    image: shopify_search_logo, // Replace with actual image URL
  },
  {
    name: "Mailchimp",
    image: mailchimp_logo, // Replace with actual image URL
  },
];

export default function AppAndTools() {
  const { data, updateData } = useOnboarding();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIntegrations = integrations.filter((integration) =>
    integration.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleIntegration = (integration: string) => {
    const updatedApps = data.appAndTool.apps.includes(integration)
      ? data.appAndTool.apps.filter((app) => app !== integration)
      : [...data.appAndTool.apps, integration];

    updateData("appAndTool", { apps: updatedApps });
  };

  console.log(data);

  return (
    <div className="space-y-4 min-h-[300px] w-full lg:w-[670px]">
      <div>
        <p className="text-muted-foreground">Step 3 of 4</p>
        <h1 className="text-2xl font-semibold">What are you interested in?</h1>
        <p className="text-muted-foreground text-sm">
          Select apps you&apos;re interested in to personalize your experience.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for apps to follow"
            className="pl-8 pb-2 w-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3.5">
          {filteredIntegrations.map((integration) => (
            <Badge
              key={integration.name}
              variant={
                data.appAndTool.apps.includes(integration.name)
                  ? "default"
                  : "outline"
              }
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground flex items-center gap-2 text-sm px-[10px] py-2"
              onClick={() => toggleIntegration(integration.name)}
            >
              <Image
                src={integration.image}
                alt={"Logo of " + integration.name}
                width={20}
                height={20}
                className="rounded-lg"
              />
              <span className="font-normal">{integration.name}</span>
              {data.appAndTool.apps.includes(integration.name) ? (
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
