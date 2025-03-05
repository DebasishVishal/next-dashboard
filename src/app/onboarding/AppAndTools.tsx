"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Check, Plus } from "lucide-react";
import { useOnboarding } from "./OnboardingContext";
import Image from "next/image";

const integrations = [
  {
    appId: "5e7100d6dd8a25eae7b75d50f0d897df",
    name: "BSS",
    image:
      "https://cdn.shopify.com/app-store/listing_images/5e7100d6dd8a25eae7b75d50f0d897df/icon/CMf4vuTKx_8CEAE=.png",
  },
  {
    appId: "7c8e03518d96c8f3941ce1e6a4124239",
    name: "AMP",
    image:
      "https://cdn.shopify.com/app-store/listing_images/7c8e03518d96c8f3941ce1e6a4124239/icon/CJ2vkIzD2_0CEAE=.jpeg",
  },
  {
    appId: "652129686e0fe8128d9f8a6a06d551de",
    name: "BixGrow",
    image:
      "https://cdn.shopify.com/app-store/listing_images/652129686e0fe8128d9f8a6a06d551de/icon/COfG8ITpifICEAE=.png",
  },
  {
    appId: "41ee878ae878378038e125b03310ced2",
    name: "Kbite",
    image:
      "https://cdn.shopify.com/app-store/listing_images/41ee878ae878378038e125b03310ced2/icon/CMPE3LTl2vYCEAE=.png",
  },
  {
    appId: "5edd9000b933a8fa88c152d1e498531f",
    name: "Klaviyo",
    image:
      "https://cdn.shopify.com/app-store/listing_images/5edd9000b933a8fa88c152d1e498531f/icon/CP6B2OOv3PYCEAE=.png",
  },
  {
    appId: "10c27a7f26b46f4dd35abc5219ea6717",
    name: "Ablestar",
    image:
      "https://cdn.shopify.com/app-store/listing_images/10c27a7f26b46f4dd35abc5219ea6717/icon/COjzqPLp9_QCEAE=.jpeg",
  },
  {
    appId: "55a595d2413473dd0c6e6a315690886a",
    name: "Also Bought",
    image:
      "https://cdn.shopify.com/app-store/listing_images/55a595d2413473dd0c6e6a315690886a/icon/CITkod-6vf0CEAE=.png",
  },
  {
    appId: "7c15306931eaaec4c575ca750dea3123",
    name: "Avada Badge",
    image:
      "https://cdn.shopify.com/app-store/listing_images/7c15306931eaaec4c575ca750dea3123/icon/CO717-Of-4gDEAE=.png",
  },
  {
    appId: "15e8255158a042a1eab34a4c45c72aa5",
    name: "Essential",
    image:
      "https://cdn.shopify.com/app-store/listing_images/15e8255158a042a1eab34a4c45c72aa5/icon/CMK1jPv9uoADEAE=.png",
  },
  {
    appId: "66b5bf2f2fdc7e07563c1b2874d987d6",
    name: "Instafeed + Story",
    image:
      "https://cdn.shopify.com/app-store/listing_images/66b5bf2f2fdc7e07563c1b2874d987d6/icon/CIy8hNT0lu8CEAE=.png",
  },
  {
    appId: "3fc6d6e0f301a340511d18bbb42cbf4d",
    name: "Mailchimp Forms",
    image:
      "https://cdn.shopify.com/app-store/listing_images/3fc6d6e0f301a340511d18bbb42cbf4d/icon/CN_urtzy2_oCEAE=.png",
  },
  {
    appId: "2fa0553c0faf41eaefabbfbc326a8637",
    name: "Mipler",
    image:
      "https://cdn.shopify.com/app-store/listing_images/2fa0553c0faf41eaefabbfbc326a8637/icon/CJvtpuCMlf0CEAE=.png",
  },
  {
    appId: "3f0b68db732b6704928d685690b753c8",
    name: "Pandectes",
    image:
      "https://cdn.shopify.com/app-store/listing_images/3f0b68db732b6704928d685690b753c8/icon/CNyiwYaTi_wCEAE=.png",
  },
  {
    appId: "00561339a53419266fc80ef160c12233",
    name: "TapOnIt SMS",
    image:
      "https://cdn.shopify.com/app-store/listing_images/00561339a53419266fc80ef160c12233/icon/COrs8e7z0_ACEAE=.png",
  },
  {
    appId: "1f557804be966078c1ca12ca6a0f9006",
    name: "Preorder",
    image:
      "https://cdn.shopify.com/app-store/listing_images/1f557804be966078c1ca12ca6a0f9006/icon/CPXQtOX0lu8CEAE=.png",
  },
  {
    appId: "6bac79c21731e1e8e59b127c6213010a",
    name: "Shopify Search",
    image:
      "https://cdn.shopify.com/app-store/listing_images/6bac79c21731e1e8e59b127c6213010a/icon/CM_yj4Kah4ADEAE=.png",
  },
  {
    appId: "b5aba6588464c37be7caf4c6c544a4c9",
    name: "Shopney",
    image:
      "https://cdn.shopify.com/app-store/listing_images/b5aba6588464c37be7caf4c6c544a4c9/icon/CKT_uaOW2_sCEAE=.png",
  },
  {
    appId: "59855db23a211ce9ce602feeb5b798c3",
    name: "Synctrack",
    image:
      "https://cdn.shopify.com/app-store/listing_images/59855db23a211ce9ce602feeb5b798c3/icon/CILe7eaCuIgDEAE=.png",
  },
  {
    appId: "0568c1f93d88b31a3f1455c20125a424",
    name: "WebPlanex",
    image:
      "https://cdn.shopify.com/app-store/listing_images/0568c1f93d88b31a3f1455c20125a424/icon/CIy9oN_0lu8CEAE=.png",
  },
  {
    appId: "f1836be17eaef1d0cefa5ac24d7186ae",
    name: "Wishify",
    image:
      "https://cdn.shopify.com/app-store/listing_images/f1836be17eaef1d0cefa5ac24d7186ae/icon/CJOGx8z0lu8CEAE=.png",
  },
  {
    appId: "28de7bc1e5ba302d70eed97bb19dc663",
    name: "Ads GTM TikTok",
    image:
      "https://cdn.shopify.com/app-store/listing_images/28de7bc1e5ba302d70eed97bb19dc663/icon/CO3Z67ClsoYDEAE=.png",
  },
  {
    appId: "2ae83feeeca949575729d68c2a27bc27",
    name: "Currency Bear",
    image:
      "https://cdn.shopify.com/app-store/listing_images/2ae83feeeca949575729d68c2a27bc27/icon/CLyrtd7W5O8CEAE=.png",
  },
  {
    appId: "1236793f762cc202398618719fbffea6",
    name: "Data Export IO",
    image:
      "https://cdn.shopify.com/app-store/listing_images/1236793f762cc202398618719fbffea6/icon/CMDd8cLO4vACEAE=.png",
  },
  {
    appId: "49a7da2f5f1af407d002b15b55189273",
    name: "Parcel Panel",
    image:
      "https://cdn.shopify.com/app-store/listing_images/49a7da2f5f1af407d002b15b55189273/icon/CLGmv7T9rYcDEAE=.png",
  },
  {
    appId: "4f0abcae9142b74f84ff409226f16220",
    name: "Rapi Discounts",
    image:
      "https://cdn.shopify.com/app-store/listing_images/4f0abcae9142b74f84ff409226f16220/icon/CJjMu9e-54QDEAE=.png",
  },
  {
    appId: "25be81443465e6699946f54e436f7a0b",
    name: "SK: Form Builder",
    image:
      "https://cdn.shopify.com/app-store/listing_images/25be81443465e6699946f54e436f7a0b/icon/CLSe3bzd_4QDEAE=.png",
  },
  {
    appId: "14711ad7477a3d0211488990623ad24c",
    name: "Shopify Email",
    image:
      "https://cdn.shopify.com/app-store/listing_images/14711ad7477a3d0211488990623ad24c/icon/CMzIkoWpiYADEAE=.png",
  },
];

export default function AppAndTools() {
  const { data, updateData } = useOnboarding();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIntegrations = integrations.filter((integration) =>
    integration.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const toggleIntegration = (integration: string) => {
  //   const updatedApps = data.appAndTool.apps.includes(integration)
  //     ? data.appAndTool.apps.filter((app) => app !== integration)
  //     : [...data.appAndTool.apps, integration];
  //   updateData("appAndTool", { apps: updatedApps });
  // };

  const toggleIntegration = (integration: { appId: string; name: string }) => {
    const appArray = data.appAndTool.apps;
    const isSelected = appArray.some((app) => app.appId === integration.appId);
    const updatedApps = isSelected
      ? appArray.filter((app) => app.appId !== integration.appId)
      : [...appArray, { appId: integration.appId, name: integration.name }];
    updateData("appAndTool", { apps: updatedApps });
  };

  return (
    <div className="space-y-4 mb-10">
      <div>
        <p className="text-muted-foreground">Step 3 of 4</p>
        <h1 className="text-2xl font-semibold">What are you interested in?</h1>
        <p className="text-muted-foreground text-sm">
          Select apps you're interested in to personalize your experience.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for apps"
            className="pl-8 pb-2 w-[180px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3 overflow-x-auto max-h-[188px] pb-2">
          {filteredIntegrations.map((integration) => (
            <Badge
              key={integration.name}
              variant={
                data.appAndTool.apps.some(
                  (app) => app.appId === integration.appId
                )
                  ? "default"
                  : "outline"
              }
              className={`
                cursor-pointer flex items-center gap-2 text-sm px-[10px] py-2 flex-shrink-0 whitespace-nowrap 
                transition-colors duration-300
                ${
                  data.appAndTool.apps.some(
                    (app) => app.appId === integration.appId
                  )
                    ? "hover:bg-neutral-700" // Darker neutral hover for selected badges
                    : "hover:bg-neutral-100" // Light neutral hover for unselected badges
                }
              `}
              onClick={() => toggleIntegration(integration)}
            >
              <Image
                src={integration.image}
                alt={"Logo of " + integration.name}
                width={20}
                height={20}
                className="rounded-lg"
              />
              <span className="font-normal">{integration.name}</span>
              {data.appAndTool.apps.some(
                (app) => app.appId === integration.appId
              ) ? (
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
