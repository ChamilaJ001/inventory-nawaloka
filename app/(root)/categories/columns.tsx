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
export type CategoriesProps = {
  id: string;
  code: string;
  name: string;
  status: string;
};

export const columns: ColumnDef<CategoriesProps>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold "
        >
          Category Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const shop: string = row.getValue("name");
      return <div className="text-15">{shop}</div>;
    },
  },
  {
    accessorKey: "code",
    header: () => <div className="font-semibold">Code</div>,
    cell: ({ row }) => {
      const code: string = row.getValue("code");
      return <div className="text-15">{code}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="font-semibold text-center">Status</div>,
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return (
        <div
          className={`${
            status === "Active"
              ? "bg-success-100 text-success-150"
              : "bg-orange-100 text-orange-150"
          }  text-center p-1 rounded-md font-semibold max-lg:font-normal tex-15`}
        >
          {status}
        </div>
      );
    },
  },
];
