"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsShop } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { RiExchange2Line } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <div className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href={"/"}
          className="mb-12 cursor-pointer items-start gap-2 flex flex-col"
        >
          <Image
            src={"/icons/logo2.1.png"}
            width={180}
            height={30}
            alt="logo"
            className=""
          />
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link text-black-2", {
                "bg-primary": isActive,
                "hover:bg-primaryLight hover:text-primary ease-in-out duration-200":
                  !isActive,
              })}
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
                className={cn("sidebar-label ", {
                  "!text-white": isActive,
                  // "hover:text-primary ease-in-out duration-200": !isActive,
                })}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
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
              <p className="text-16 font-semibold  text-black-1">Chamila</p>
              <p className="text-14 font-semibold  text-gray-600">Admin</p>
            </div>
          </div>

          <div className="justify-end">
            <IoMdLogOut className="text-sky-150" size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
