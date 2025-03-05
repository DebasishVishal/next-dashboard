"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { handleProfileSubmit } from "./action";
import { countries } from "../../../lib/countries";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebarContext } from "../layout";

export default function ProfilePage({
  isSidebarOpen = true,
}: {
  isSidebarOpen?: boolean;
}) {
  const [formData, setFormData] = useState({
    email: "johndoe@gmail.com",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+91 81230 10203",
    username: "doe_john",
    bio: "",
    company: "Shop Digest",
    website: "www.shopdigest.com",
    streetAddress: "A202, Shikshapatri Elegance",
    zipCode: "",
    city: "Ahmedabad",
    country: "", // Default empty, will be updated by Select
    newsletter: false,
  });

  const [bioLength, setBioLength] = useState(formData.bio.length);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { isOpen, isMobile } = useSidebarContext();

  // Determine the effective breakpoint based on sidebar state
  const breakpoint = isOpen
    ? `lg:grid-cols-[200px_1fr]`
    : `md:grid-cols-[200px_1fr]`;

  console.log(breakpoint);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "bio") {
      setBioLength(value.length);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, newsletter: checked });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, country: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (formData: FormData) => {
    const result = await handleProfileSubmit(formData);
    if (result.success) {
      toast.success("Profile updated successfully!");
      // formRef.current?.reset(); // to reset the form
    } else {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="container mx-auto max-w-[1010px] mt-2 px-4 sm:px-6 lg:px-8 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <Tabs defaultValue="information">
        <TabsList className="border-b w-full bg-white justify-start rounded-none h-auto p-0 mb-6 overflow-x-auto">
          <TabsTrigger
            value="information"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 px-4 sm:px-6 py-2"
          >
            Information
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 px-4 sm:px-6 py-2"
          >
            Password
          </TabsTrigger>
          <TabsTrigger
            value="legal"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 px-4 sm:px-6 py-2"
          >
            Legal Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="information" className="mt-0">
          <form ref={formRef} action={onSubmit}>
            {/* Personal Information Section */}
            <div className={`mb-8 grid ${breakpoint} gap-6`}>
              <h2 className="text-lg font-medium">Personal information</h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="email" className="block mb-2">
                    Email address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="block mb-2">
                      First name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastName" className="block mb-2">
                      Last name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber" className="block mb-2">
                      Phone number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="username" className="block mb-2">
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="bio">
                      Bio <span className="text-gray-400">(optional)</span>
                    </Label>
                    <span className="text-gray-400 text-sm">
                      {bioLength}/40
                    </span>
                  </div>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full"
                    maxLength={40}
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="block mb-2">Upload avatar</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 border border-dashed border-neutral-300 rounded flex items-center justify-center overflow-hidden">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl || "/placeholder.svg"}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("avatar-upload")?.click()
                        }
                        className="mb-1"
                      >
                        Upload
                      </Button>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <p className="text-xs text-gray-500">
                        Recommended size: 400x400px
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Information Section */}
            <div className={`mb-8 grid ${breakpoint} gap-6`}>
              <h2 className="text-lg font-medium">Company information</h2>

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company" className="block mb-2">
                      Company / Organization{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="website" className="block mb-2">
                      Website <span className="text-gray-400">(optional)</span>
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="streetAddress" className="block mb-2">
                    Street address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="streetAddress"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zipCode" className="block mb-2">
                      ZIP code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="city" className="block mb-2">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country" className="text-sm">
                    Choose your country
                  </Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.country}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger className="[&[data-placeholder]]:font-normal [&[data-placeholder]]:text-neutral-500 max-w-[353px]">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <ScrollArea className="h-60 w-full">
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.name} {country.flag}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Hidden input to include country in FormData */}
                  <Input
                    type="hidden"
                    name="country"
                    value={formData.country}
                  />
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className={`mb-8 grid ${breakpoint} gap-6`}>
              <h2 className="text-lg font-medium">Newsletter</h2>

              <div className="flex gap-2 items-center">
                <Checkbox
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="newsletter" className="font-normal">
                  Keep me updated with marketing tips and the latest ShopDigest
                  news
                </Label>
              </div>
            </div>

            <div className={`mb-8 grid ${breakpoint} gap-6`}>
              <div className="w-[200px]"></div>
              <Button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 max-w-[200px]"
              >
                Update my profile
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="information" className="mt-0"></TabsContent>

        <TabsContent value="password">
          <div className="py-4">
            <p>Password settings will be displayed here.</p>
          </div>
        </TabsContent>

        <TabsContent value="legal">
          <div className="py-4">
            <p>Legal documents will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
