"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { UserIcon } from "lucide-react";
import useModal from "@/hooks/use-modal";

function UserMenu() {
  const { signOut } = useClerk();
  const { onOpen } = useModal();
  const router = useRouter();
  return (
    <Menubar className="bg-transparent">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <UserIcon />
        </MenubarTrigger>
        <MenubarContent align="end">
          <MenubarItem className="cursor-pointer">New Tab</MenubarItem>
          <MenubarItem className="cursor-pointer">
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            className="cursor-pointer"
            onClick={() => onOpen("createBubble")}
          >
            Create a Bubble
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            className="cursor-pointer"
            onClick={() => signOut(() => router.push("/sign-in"))}
          >
            Sign Out
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default UserMenu;
