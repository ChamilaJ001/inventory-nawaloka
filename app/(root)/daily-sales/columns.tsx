"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SalesProps = {
  id: string;
  invoice: string;
  code: string;
  name: string;
  shop: string;
  qty: number;
  total: number;
  payment: string;
  date: string;
};

export const columns: ColumnDef<SalesProps>[] = [
  {
    accessorKey: "invoice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold text-left"
        >
          Invoice No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const invoice: string = row.getValue("invoice");
      return <div className="text-15 ">{invoice}</div>;
    },
  },
  {
    accessorKey: "code",
    header: () => <div className="font-semibold">Product Code</div>,
    cell: ({ row }) => {
      const code: string = row.getValue("code");
      return <div className="text-15">{code}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="font-semibold">Product Name</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return <div className="text-15">{name}</div>;
    },
  },
  {
    accessorKey: "shop",
    header: () => <div className="font-semibold">Shop</div>,
    cell: ({ row }) => {
      const shop: string = row.getValue("shop");
      return <div className="text-15">{shop}</div>;
    },
  },
  {
    accessorKey: "qty",
    header: () => <div className="font-semibold">Quantity</div>,
    cell: ({ row }) => {
      const qty: number = parseFloat(row.getValue("qty"));
      return <div className="text-15 text-center">{qty}</div>;
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="font-semibold">Total</div>,
    cell: ({ row }) => {
      const total: number = parseFloat(row.getValue("total"));
      return <div className="text-15">{total}</div>;
    },
  },
  {
    accessorKey: "payment",
    header: () => <div className="font-semibold text-center">Status</div>,
    cell: ({ row }) => {
      const payment: string = row.getValue("payment");
      return (
        <div
          className={`${
            payment === "Success"
              ? "bg-success-100 text-success-150"
              : "bg-orange-100 text-orange-150"
          }  text-center p-1 rounded-md font-semibold max-lg:font-normal tex-15`}
        >
          {payment}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="font-semibold">Date</div>,
    cell: ({ row }) => {
      const date: string = row.getValue("date");
      return <div className="text-15">{date}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 ">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem className="text-14 flex items-center gap-2 hover:bg-gray-50 cursor-pointer ease-in-out duration-200">
                <FiEdit size={16} />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-50 cursor-pointer ease-in-out duration-200">
                <IoTrashOutline size={17} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
