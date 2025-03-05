"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Layout,
  Presentation,
  Share2,
  Video,
  Printer,
  Globe,
  Maximize,
  Upload,
  MoreHorizontal,
  ExternalLink,
  MoreVertical,
  List,
  LayoutList,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FollowingList from "./following/FollowingList";

export default function DashboardHome({ firstName = "" }) {
  return (
    <div className="container mx-auto space-y-12 max-w-[1210px]">
      {/* Header Section */}

      <section className="bg-neutral-100 rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-4">Welcome, {firstName} !</h1>
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          {[
            {
              icon: <FileText className="h-7 w-7" />,
              label: "Doc",
              color: "bg-teal-500",
            },
            {
              icon: <Layout className="h-7 w-7" />,
              label: "Whiteboard",
              color: "bg-green-500",
            },
            {
              icon: <Presentation className="h-7 w-7" />,
              label: "Presentation",
              color: "bg-orange-500",
            },
            {
              icon: <Share2 className="h-7 w-7" />,
              label: "Social media",
              color: "bg-rose-500",
            },
            {
              icon: <Video className="h-7 w-7" />,
              label: "Video",
              color: "bg-fuchsia-500",
            },
            {
              icon: <Printer className="h-7 w-7" />,
              label: "Printables",
              color: "bg-blue-500",
            },
            {
              icon: <Globe className="h-7 w-7" />,
              label: "Website",
              color: "bg-purple-500",
            },
            {
              icon: <Maximize className="h-7 w-7 text-neutral-700" />,
              label: "Custom size",
              color: "bg-gray-200",
            },
            {
              icon: <Upload className="h-7 w-7 text-neutral-700" />,
              label: "Upload",
              color: "bg-gray-200",
            },
            {
              icon: <MoreHorizontal className="h-7 w-7 text-neutral-700" />,
              label: "More",
              color: "bg-gray-200",
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <div className={`${item.color} p-3 rounded-full text-white`}>
                {item.icon}
              </div>
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Team Members Tools */}
      <section className="p-0">
        <span className="text-xl font-semibold">Team Members Tools</span>
        <p className="text-sm text-muted-foreground">
          Invite your team members to collaborate.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  mt-2">
          {[
            {
              title: "Top app bar",
              description: "The top app bar displays...",
              icon: "https://img.icons8.com/fluency/144/google-sheets--v2.png",
              color: "bg-pink-100",
            },
            {
              title: "Cards",
              description: "Containing content & links on a single...",
              icon: "https://img.icons8.com/fluency/144/google-sheets--v2.png",
              color: "bg-orange-100",
            },
            {
              title: "Side sheets",
              description: "Surfaces containing supplementary...",
              icon: "https://img.icons8.com/fluency/144/google-sheets--v2.png",
              color: "bg-blue-100",
            },
          ].map((tool, index) => (
            <Card key={index} className="p-4 flex items-start gap-4">
              <div className={`${tool.color} rounded-full`}>
                <Image
                  src={
                    "https://static.vecteezy.com/system/resources/previews/005/411/951/non_2x/blue-debit-card-illustration-business-concept-financial-awareness-flat-cartoon-style-suitable-for-icon-web-landing-page-banner-flyer-sticker-card-background-t-shirt-clip-art-free-vector.jpg"
                  }
                  alt="Icon"
                  width={60}
                  height={60}
                  className="bg-red-400 rounded-full"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{tool.title}</h3>
                  <Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-500 "
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* My Following List */}
      {/* <section className="space-y-4 height-[100px]">
        <h2 className="text-lg font-semibold">My Following List</h2>
        <FollowingList />
      </section> */}

      {/* <section className="space-y-4 relative">

        <div className="flex space-x-1.5 items-center">
          <h2 className="text-xl font-semibold">My Following List</h2>
          <Link
            href="/dashboard/following"
            className="text-gray-400 hover:text-gray-500"
          >
            <ExternalLink className="h-5 w-5" />
          </Link>
        </div>


        <div className="relative group cursor-pointer" onClick={handleClick}>
          <FollowingList />

          <div className="absolute inset-0 flex items-center justify-center group-hover:backdrop-blur-[2.5px] bg-gray-50 bg-opacity-0 group-hover:bg-opacity-65 group-hover:rounded-xl group-hover:border transition-all duration-150">
            <Button
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-600 bg-opacity-90 text-white rounded-md hidden group-hover:block"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              <div className="flex gap-2 text-md justify-center items-center">
                <LayoutList className="h-5 w-5" />
                <span>Go to My Following List</span>
              </div>
            </Button>
          </div>
        </div>
      </section> */}

      <section className="space-y-4 relative">
        {/* Heading */}
        <div className="flex space-x-1.5 items-center">
          <h2 className="text-xl font-semibold">My Following List</h2>
          <Link
            href="/dashboard/following"
            className="text-gray-400 hover:text-gray-500"
          >
            <ExternalLink className="h-5 w-5" />
          </Link>
        </div>

        <FollowingList className="hidden" />

        <div className="flex justify-center items-center">
          <Link href="/dashboard/following">
            <Button>
              <div className="flex gap-2 text-md justify-center items-center">
                <LayoutList className="h-5 w-5" />
                <span>Go to My Following List</span>
              </div>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
