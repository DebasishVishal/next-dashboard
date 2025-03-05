import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

export default function TopNav() {
  return (
    <div
      className="top-nav z-50 bg-neutral-50 text-neutral-700 border-b flex justify-center text-xs font-medium"
      style={{
        backgroundImage:
          "url(https://online.citi.com/JRS/banners/hero_background/Citi-futuristic-angles-bg-compressed.jpg)",
      }}
    >
      <div className="w-full max-w-[85rem] px-4 lg:px-10 py-4 lg:py-2 flex justify-between">
        <ul className="flex gap-8">
          <li className="hover:text-secondary transition cursor-pointer">
            <Link href="/">Email Updates</Link>
          </li>
          <li className="hover:text-secondary transition cursor-pointer">
            <Link href="/">Subscribe</Link>
          </li>
          <li className="hover:text-secondary transition cursor-pointer">
            <Link href="/">Contact</Link>
          </li>
          <li className="hidden sm:block hover:text-secondary transition cursor-pointer">
            <Link href="/">Careers</Link>
          </li>
          <li className="hidden sm:block hover:text-secondary transition cursor-pointer">
            <Link href="/">Advertise</Link>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Ellipsis className="block sm:hidden h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Careers</DropdownMenuItem>
                <DropdownMenuItem>Advertise</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
        <ul className="hidden lg:flex gap-8">
          <li>
            Become a <span className="underline">Partner</span>
          </li>
          <li>
            Create a <span className="underline">Store</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
