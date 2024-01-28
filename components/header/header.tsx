import icon from "@/public/img/bubble-svg.svg";
import Image from "next/image";
import { ToggleTheme } from "../ui/toggle-button";
import HeaderSearch from "./header-search";
import { SignedIn } from "@clerk/nextjs";
import UserMenu from "./user-menu";

function Header() {
  return (
    <div className="flex w-full py-2 md:px-8 px-3 bg-secondary z-30">
      <div className="flex items-center gap-x-1 w-[25%]">
        <Image src={icon} alt="Bubbles" width={40} height={40} />
        <h1 className="font-semibold text-2xl sm:block hidden">BitBubble</h1>
      </div>
      <div className="flex-1">
        <div className="sm:w-4/5 md:w-2/3 lg:w-1/2 mx-auto">
          <HeaderSearch />
        </div>
      </div>
      <div className="w-[25%] flex items-center justify-end">
        <SignedIn>
          <UserMenu />
        </SignedIn>
        <div className="sm:block hidden">
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
}

export default Header;
