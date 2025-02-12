"use client";

import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOnboarding } from "./onboarding-context";
import Image from "next/image";

const platforms = [
  { name: "Shopify", logo: "/shopify-logo.svg" },
  { name: "Wordpress", logo: "/Wordpress-Logo.svg" },
  { name: "Bigcommerce", logo: "/bigcommerce-logo.svg" },
];

const roles = [
  "Store Owner or Website Owner",
  "App or Plugin Developer",
  "Theme Developer",
  "Service Provider",
  "Agency Owner",
  "E-commerce Expert",
  "Other Solutions Provider",
  "Other (please specify)",
];

const businessFocuses = [
  "Sharing my success story",
  "Recruitment or finding jobs",
  "Tracking app rankings",
  "Finding the best agencies for my work",
  "Finding the best deals",
  "Finding the best apps and themes",
  "Tech provider",
  "Sharing my expertise with the world",
  "Finding more clients",
];

export default function AccountSetup() {
  const { data, updateData } = useOnboarding();
  const {
    platforms: selectedPlatforms,
    roles: selectedRoles,
    businessFocus: selectedBusinessFocus,
    otherRole,
  } = data.accountSetup;
  const [otherRoleText, setOtherRoleText] = useState(otherRole || "");

  const handlePlatformToggle = (platform: string) => {
    const updatedPlatforms = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter((p) => p !== platform)
      : [...selectedPlatforms, platform];
    updateData("accountSetup", { platforms: updatedPlatforms });
  };

  const handleRoleToggle = (role: string) => {
    const updatedRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((r) => r !== role)
      : [...selectedRoles, role];
    updateData("accountSetup", { roles: updatedRoles });
    if (
      role !== "Other (please specify)" &&
      selectedRoles.includes("Other (please specify)")
    ) {
      updateData("accountSetup", { otherRole: undefined });
      setOtherRoleText("");
    }
  };

  const handleBusinessFocusToggle = (focus: string) => {
    const updatedFocus = selectedBusinessFocus.includes(focus)
      ? selectedBusinessFocus.filter((f) => f !== focus)
      : [...selectedBusinessFocus, focus];
    updateData("accountSetup", { businessFocus: updatedFocus });
  };

  const handleOtherRoleChange = (value: string) => {
    setOtherRoleText(value);
    updateData("accountSetup", { otherRole: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Account Setup</h1>
        <p className="text-muted-foreground">
          Tell us more about your business and how you plan to use our platform.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-md font-medium">
          Which platforms do you actively use? (Select all that apply) *
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {platforms.map(({ name, logo }) => (
            <Card
              key={name}
              className={cn(
                "cursor-pointer border-2 transition-colors hover:bg-accent",
                selectedPlatforms.includes(name) && "border-primary"
              )}
              onClick={() => handlePlatformToggle(name)}
            >
              <CardContent className="flex flex-col h-24 items-center justify-center p-6">
                <Image src={logo} alt={name} width={40} height={40} />
                <span className="text-sm">{name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-md font-medium">
          Which best describes your role? (Select all that apply) *
        </h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedRoles.length > 0
                ? `${selectedRoles.length} selected`
                : "Select roles"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search roles..." />
              <CommandList>
                <CommandEmpty>No role found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-72">
                    {roles.map((role) => (
                      <CommandItem
                        key={role}
                        onSelect={() => handleRoleToggle(role)}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox checked={selectedRoles.includes(role)} />
                        <span>{role}</span>
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {selectedRoles.includes("Other (please specify)") && (
          <div className="space-y-2">
            <Label htmlFor="otherRole">Please specify your role:</Label>
            <Input
              id="otherRole"
              value={otherRoleText}
              onChange={(e) => handleOtherRoleChange(e.target.value)}
              placeholder="Enter your role"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-md font-medium">
          What is your current business focus? (Select all that apply) *
        </h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedBusinessFocus.length > 0
                ? `${selectedBusinessFocus.length} selected`
                : "Select focus areas"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search focus areas..." />
              <CommandList>
                <CommandEmpty>No focus area found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-72">
                    {businessFocuses.map((focus) => (
                      <CommandItem
                        key={focus}
                        onSelect={() => handleBusinessFocusToggle(focus)}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={selectedBusinessFocus.includes(focus)}
                        />
                        <span>{focus}</span>
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

// If other fill is required use below code
// "use client";

// import { useState } from "react";
// import { ChevronsUpDown } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useOnboarding } from "./onboarding-context";
// import Image from "next/image";

// const platforms = [
//   { name: "Shopify", logo: "/shopify-logo.svg" },
//   { name: "Wordpress", logo: "/Wordpress-Logo.svg" },
//   { name: "Bigcommerce", logo: "/bigcommerce-logo.svg" },
// ];

// const roles = [
//   "Store Owner or Website Owner",
//   "App or Plugin Developer",
//   "Theme Developer",
//   "Service Provider",
//   "Agency Owner",
//   "E-commerce Expert",
//   "Other Solutions Provider",
//   "Other (please specify)",
// ];

// const businessFocuses = [
//   "Sharing my success story",
//   "Recruitment or finding jobs",
//   "Tracking app rankings",
//   "Finding the best agencies for my work",
//   "Finding the best deals",
//   "Finding the best apps and themes",
//   "Tech provider",
//   "Sharing my expertise with the world",
//   "Finding more clients",
// ];

// export default function AccountSetup() {
//   const { data, updateData, isStepValid } = useOnboarding();
//   const {
//     platforms: selectedPlatforms,
//     roles: selectedRoles,
//     businessFocus: selectedBusinessFocus,
//     otherRole,
//   } = data.accountSetup;
//   const [otherRoleText, setOtherRoleText] = useState(otherRole || "");

//   const handlePlatformToggle = (platform: string) => {
//     const updatedPlatforms = selectedPlatforms.includes(platform)
//       ? selectedPlatforms.filter((p) => p !== platform)
//       : [...selectedPlatforms, platform];
//     updateData("accountSetup", { platforms: updatedPlatforms });
//   };

//   const handleRoleToggle = (role: string) => {
//     const updatedRoles = selectedRoles.includes(role)
//       ? selectedRoles.filter((r) => r !== role)
//       : [...selectedRoles, role];
//     updateData("accountSetup", { roles: updatedRoles });

//     if (role === "Other (please specify)" && !updatedRoles.includes(role)) {
//       updateData("accountSetup", { otherRole: undefined });
//       setOtherRoleText("");
//     }
//   };

//   const handleBusinessFocusToggle = (focus: string) => {
//     const updatedFocus = selectedBusinessFocus.includes(focus)
//       ? selectedBusinessFocus.filter((f) => f !== focus)
//       : [...selectedBusinessFocus, focus];
//     updateData("accountSetup", { businessFocus: updatedFocus });
//   };

//   const handleOtherRoleChange = (value: string) => {
//     setOtherRoleText(value);
//     updateData("accountSetup", { otherRole: value });
//   };

//   // Validate "Other (please specify)" field
//   const isOtherRoleValid =
//     !selectedRoles.includes("Other (please specify)") || otherRoleText.trim() !== "";

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-semibold">Account Setup</h1>
//         <p className="text-muted-foreground">
//           Tell us more about your business and how you plan to use our platform.
//         </p>
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-lg font-medium">
//           Which platforms do you actively use? (Select all that apply)
//         </h2>
//         <div className="grid gap-4 sm:grid-cols-3">
//           {platforms.map(({ name, logo }) => (
//             <Card
//               key={name}
//               className={cn(
//                 "cursor-pointer border-2 transition-colors hover:bg-accent",
//                 selectedPlatforms.includes(name) && "border-primary"
//               )}
//               onClick={() => handlePlatformToggle(name)}
//             >
//               <CardContent className="flex h-24 items-center justify-center p-6">
//                 <Image src={logo} alt={name} width={40} height={40} />
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-lg font-medium">
//           Which best describes your role? (Select all that apply)
//         </h2>
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button variant="outline" className="w-full justify-between">
//               {selectedRoles.length > 0
//                 ? `${selectedRoles.length} selected`
//                 : "Select roles"}
//               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-full p-0">
//             <Command>
//               <CommandInput placeholder="Search roles..." />
//               <CommandList>
//                 <CommandEmpty>No role found.</CommandEmpty>
//                 <CommandGroup>
//                   <ScrollArea className="h-72">
//                     {roles.map((role) => (
//                       <CommandItem
//                         key={role}
//                         onSelect={() => handleRoleToggle(role)}
//                         className="flex items-center space-x-2"
//                       >
//                         <Checkbox checked={selectedRoles.includes(role)} />
//                         <span>{role}</span>
//                       </CommandItem>
//                     ))}
//                   </ScrollArea>
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>
//         {selectedRoles.includes("Other (please specify)") && (
//           <div className="space-y-2">
//             <Label htmlFor="otherRole">Please specify your role:</Label>
//             <Input
//               id="otherRole"
//               value={otherRoleText}
//               onChange={(e) => handleOtherRoleChange(e.target.value)}
//               placeholder="Enter your role"
//               className={!isOtherRoleValid ? "border-red-500" : ""}
//             />
//             {!isOtherRoleValid && (
//               <p className="text-sm text-red-500">
//                 Please specify your role.
//               </p>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-lg font-medium">
//           What is your current business focus? (Select all that apply)
//         </h2>
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button variant="outline" className="w-full justify-between">
//               {selectedBusinessFocus.length > 0
//                 ? `${selectedBusinessFocus.length} selected`
//                 : "Select focus areas"}
//               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-full p-0">
//             <Command>
//               <CommandInput placeholder="Search focus areas..." />
//               <CommandList>
//                 <CommandEmpty>No focus area found.</CommandEmpty>
//                 <CommandGroup>
//                   <ScrollArea className="h-72">
//                     {businessFocuses.map((focus) => (
//                       <CommandItem
//                         key={focus}
//                         onSelect={() => handleBusinessFocusToggle(focus)}
//                         className="flex items-center space-x-2"
//                       >
//                         <Checkbox
//                           checked={selectedBusinessFocus.includes(focus)}
//                         />
//                         <span>{focus}</span>
//                       </CommandItem>
//                     ))}
//                   </ScrollArea>
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>
//       </div>
//     </div>
//   );
// }
