import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, Command, Menu, UserCircle } from "lucide-react";
import NavigationMenuMid from "@/components/NavigationMenu";

export default function Navbar() {
  return (
    <nav className="z-50 sticky top-0 border-b py-2 flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-[85rem] px-4 lg:px-10 flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="block lg:hidden">
              <Menu className="h-5 w-5 text-neutral-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Apps</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Developers</DropdownMenuItem>
              <DropdownMenuItem>Companies</DropdownMenuItem>
              <DropdownMenuItem>Jobs</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/"
            className="block md:hidden text-2xl text-secondary font-bold"
          >
            <div className="rounded-full bg-secondary text-white p-1.5 h-max">
              <Command className="h-5 w-5 shrink-0" />
            </div>
          </Link>
          <Link
            href="/"
            className="hidden md:flex items-center justify-center gap-2 text-2xl font-bold"
          >
            <div className="rounded-full bg-secondary text-white p-1.5 h-max">
              <Command className="h-5 w-5 shrink-0" />
            </div>
            ShopDigest
          </Link>
          <h1 className="text-neutral-200 font-extralight">|</h1>
          <Select>
            <SelectTrigger className="text-xs md:text-sm w-[125px] md:w-[150px] border-0 font-semibold">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shopify">Shopify</SelectItem>
              <SelectItem value="wordpress">Wordpress</SelectItem>
              <SelectItem value="bigcommerce">Bigcommerce</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <NavigationMenuMid />

        <div className="flex items-center gap-4">
          <Link href="/login" passHref>
            <Button
              variant="outline"
              className="h-9 hidden lg:flex rounded-full items-center border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary"
            >
              Login
            </Button>
          </Link>
          <Button className="h-9 hidden lg:flex rounded-full bg-secondary hover:bg-secondary/80">
            Add Post <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          {/* <Button
            size="xs"
            className="block lg:hidden bg-secondary hover:bg-secondary/80"
          >
            Add Post
          </Button> */}
          <UserCircle className="block lg:hidden h-5 w-5" />
        </div>
      </div>
      <div
        id="navbar-search-container"
        className="navbar-search-container"
      ></div>
    </nav>
  );
}
