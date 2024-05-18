"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsShop } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { RiExchange2Line } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <RxHamburgerMenu size={20} className="text-gray-700" />
        </SheetTrigger>
        <SheetContent side={"left"} className="border-none bg-white">
          <Link href={"/"} className="cursor-pointer flex items-center gap-2">
            <Image
              src={"/icons/logo2.1.png"}
              width={180}
              height={30}
              alt="logo"
            />
          </Link>

          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-12 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);
                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          "mobilenav-sheet_close w-full text-black-2",
                          {
                            "bg-primary": isActive,
                            "hover:bg-primaryLight hover:text-primary ease-in-out duration-200":
                              !isActive,
                          }
                        )}
                      >
                        <div className="relative size-6">
                          {item.label === "Home" ? (
                            <TbLayoutDashboardFilled
                              className={cn({
                                "!text-white": isActive,
                              })}
                              size={25}
                            />
                          ) : item.label === "Shops" ? (
                            <BsShop
                              className={cn({
                                "!text-white": isActive,
                              })}
                              size={23}
                            />
                          ) : item.label === "Categories" ? (
                            <BiCategoryAlt
                              className={cn({
                                "!text-white": isActive,
                              })}
                              size={25}
                            />
                          ) : item.label === "Products" ? (
                            <IoCartOutline
                              className={cn({
                                "!text-white": isActive,
                              })}
                              size={25}
                            />
                          ) : item.label === "Users" ? (
                            <LuUsers
                              className={cn({
                                "!text-white": isActive,
                              })}
                              size={23}
                            />
                          ) : item.label === "Transfer History" ? (
                            <RiExchange2Line
                              className={cn({
                                "!text-white": isActive,
                              })}
                              size={23}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <p
                          className={cn("text-16 font-semibold text-black-1 ", {
                            "text-white": isActive,
                            // "hover:text-primary ease-in-out duration-200": !isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
            {/* logout */}
            <div className="bg-sky-100 rounded-md py-4 px-4 cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Image
                    src={"/icons/user-1.jpg"}
                    alt="user"
                    width={45}
                    height={40}
                    className="rounded-full"
                  />

                  <div className="flex flex-col">
                    <p className="text-16 font-semibold  text-black-1">
                      Chamila
                    </p>
                    <p className="text-14 font-semibold  text-gray-600">
                      Admin
                    </p>
                  </div>
                </div>

                <div className="justify-end">
                  <IoMdLogOut className="text-sky-150" size={25} />
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
