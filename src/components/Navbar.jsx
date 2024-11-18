import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Settings } from "lucide-react";
import { TextHoverEffect } from "./ui/text-hover-effect";
import { ModeToggle } from "./ui/mode_toggle";

export default function Topbar() {
  return (
    <Navbar className="w-screen p-5 h-20 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-15">
      <NavbarBrand>
        <div>{/* LOGO */}</div>
        {/* <p className="font-bold text-inherit text-3xl">Power Forecast</p> */}
        <TextHoverEffect text="Power Forecast" duration={1} />
      </NavbarBrand>
      {/* <div>
        <Ripple />
      </div> */}
      <NavbarContent>
        <NavbarItem className="font-bold rounded-md ml-auto gap-4 text-black dark:text-white flex h-full w-full justify-center items-center pr-1">
          Hi, {"User"}
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton className="" />
          </SignedIn>
          <Link href="/settings" aria-current="page">
            <Settings />
          </Link>
          <div>
            <ModeToggle />
          </div>
        </NavbarItem>
      </NavbarContent>
      {/* <NavbarContent className="font-bold hidden sm:flex">
        <NavbarItem isActive>
        </NavbarItem>
      </NavbarContent> */}
    </Navbar>
  );
}
