// components/NavMain.tsx
"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight, House, User, type LucideIcon } from "lucide-react";

export function NavMain({
  items,
  onItemClick,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  onItemClick?: (href: string) => void;
}) {
  return (
    <SidebarGroup className="pt-[3px]">
      <SidebarMenuButton
        asChild
        tooltip="Home"
        onClick={(e) => {
          e.preventDefault();
          onItemClick?.("/dashboard");
        }}
      >
        <a href="/dashboard">
          <House />
          <span>Home</span>
        </a>
      </SidebarMenuButton>

      <SidebarMenuButton
        asChild
        tooltip="Profile"
        onClick={(e) => {
          e.preventDefault();
          onItemClick?.("/dashboard/profile");
        }}
      >
        <a href="/dashboard/profile">
          <User />
          <span>Profile</span>
        </a>
      </SidebarMenuButton>

      <div className="border my-1"></div>

      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                onClick={(e) => {
                  e.preventDefault();
                  // Do not update activeItem or navigate for parent items with children
                  if (!item.items?.length) {
                    onItemClick?.(item.url);
                  }
                }}
              >
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            onClick={(e) => {
                              e.preventDefault();
                              onItemClick?.(subItem.url);
                            }}
                          >
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
