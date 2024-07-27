import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchDialog from "@/components/SearchDialog";
import MobileNav from "./MobileNav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiUser } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { TbSettings } from "react-icons/tb";
import { signOut } from "@/auth";

const Header = () => {
  // const { data: session } = useSession();
  return (
    <>
      <div className="header-logo">
        <div className="rounded-full hover:bg-gray-50 p-2 cursor-pointer ease-in-out duration-200 max-md:hidden">
          <RxHamburgerMenu size={20} className="text-gray-700" />
        </div>

        <div className="rounded-full hover:bg-gray-50 p-2 cursor-pointer ease-in-out duration-200 hidden max-md:block">
          <Link href={"/"} className="mb-12 cursor-pointer items-start">
            <Image
              src={"/icons/logo2.1.png"}
              width={130}
              height={30}
              alt="logo"
            />
          </Link>
        </div>

        <SearchDialog />

        <div className="rounded-md hover:bg-gray-50 px-2 py-1 cursor-pointer ease-in-out duration-200 block max-md:hidden">
          <p className="text-14 text-gray-700">Calender</p>
        </div>

        <div className="rounded-md hover:bg-gray-50 px-2 py-1 cursor-pointer ease-in-out duration-200 block max-md:hidden">
          <p className="text-14 text-gray-700">Updates</p>
        </div>

        <div className="rounded-md hover:bg-gray-50 px-2 py-1 cursor-pointer ease-in-out duration-200 block max-md:hidden">
          <p className="text-14 text-gray-700">Alerts</p>
        </div>
      </div>

      <div className="header-avatar">
        <div className="rounded-full hover:bg-gray-50 p-2 cursor-pointer ease-in-out duration-200 hidden max-md:block">
          <MobileNav />
        </div>

        {/* <Link
          href={"/account"}
          className="hover:bg-gray-50 rounded-full p-3 ease-in-out duration-200"
        >
          <Avatar>
            <AvatarImage src="/icons/user-1.jpg" />
            <AvatarFallback className="font-semibold text-18 bg-blue-50">
              AD
            </AvatarFallback>
          </Avatar>
        </Link> */}

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none ring-0">
            <div className="hover:bg-gray-50 rounded-full p-3 ease-in-out duration-200">
              <Avatar>
                <AvatarImage src="/icons/user-1.jpg" />
                <AvatarFallback className="font-semibold text-18 bg-blue-50">
                  AD
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white outline-none ring-0">
            <DropdownMenuItem className="text-14 flex items-center gap-2 hover:bg-gray-50 rounded-md cursor-pointer">
              <FiUser />
              <Link href={"/account"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-14 flex items-center gap-2 hover:bg-gray-50 rounded-md cursor-pointer">
              <TbSettings />
              <Link href={"/settings"}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-14 flex items-center gap-2 hover:bg-gray-50 rounded-md cursor-pointer">
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
                className="flex items-center gap-2"
              >
                <IoMdLogOut />
                <button type="submit" className="bg-white p-0 mt-0">
                  Logout
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default Header;
