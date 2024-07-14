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
  _id: string;
  invoice: string;
  code: string;
  products: [];
  shop: string;
  qty: number;
  total: number;
  status: string;
  createdAt: string;
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
    accessorKey: "shop",
    header: () => <div className="font-semibold">Shop</div>,
    cell: ({ row }) => {
      const shop: string = row.getValue("shop");
      return <div className="text-15">{shop}</div>;
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="font-semibold">Total Amount</div>,
    cell: ({ row }) => {
      const total: number = parseFloat(row.getValue("total"));
      return <div className="text-15">{total}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="font-semibold text-center">Payment Status</div>
    ),
    cell: ({ row }) => {
      const payment: string = row.getValue("status");
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
    accessorKey: "createdAt",
    header: () => <div className="font-semibold">Date</div>,
    cell: ({ row }) => {
      const date: string = row.getValue("createdAt");
      return <div className="text-15">{date}</div>;
    },
  },
];
