import icon from "@/public/img/bubble-svg.svg";
import Image from "next/image";
import { ToggleTheme } from "../ui/toggle-button";
import HeaderSearch from "./header-search";
import { SignedIn, UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <div className="flex w-full py-3 px-8">
      <div className="flex items-center gap-x-1 w-[25%]">
        <Image src={icon} alt="Bubbles" width={40} height={40} />
        <h1 className="font-semibold text-2xl">BitBubble</h1>
      </div>
      <div className="flex-1">
        <div className="w-1/2 mx-auto">
          <HeaderSearch />
        </div>
      </div>
      <div className="w-[25%] flex items-center justify-end">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ToggleTheme />
      </div>
    </div>
  );
}

export default Header;
