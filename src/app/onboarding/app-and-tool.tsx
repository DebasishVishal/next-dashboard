"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Check } from "lucide-react";
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
    name: "Klaviyo: Email Marketing & SMS",
    image: klaviyo_logo, // Replace with actual image URL
  },
  {
    name: "Shopify Email",
    image: shopify_email_logo, // Replace with actual image URL
  },
  {
    name: "Instafeed - Instagram Feed",
    image: instafeed_logo, // Replace with actual image URL
  },
  {
    name: "Shopify Search & Discovery",
    image: shopify_search_logo, // Replace with actual image URL
  },
  {
    name: "Mailchimp: Email & SMS",
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
    <div className="space-y-6 min-h-[300px] w-full lg:w-[670px]">
      <div>
        <h1 className="text-2xl font-semibold">What are you interested in?</h1>
        <p className="text-muted-foreground">
          Select apps you&apos;re interested in to personalize your experience.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for apps to follow"
            className="pl-8"
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
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground py-1 flex items-center gap-2 text-sm"
              onClick={() => toggleIntegration(integration.name)}
            >
              <Image
                src={integration.image}
                alt={"Logo of " + integration.name}
                width={30}
                height={40}
                className="rounded-md"
              />
              {integration.name}
              {data.appAndTool.apps.includes(integration.name) && (
                <Check className="h-4 w-4 ml-2" />
              )}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
