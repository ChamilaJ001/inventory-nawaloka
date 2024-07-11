"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductsProps = {
  _id: string;
  code: string;
  name: string;
  category: string;
  shop: string;
  qty?: number;
  status: string;
};

export const columns: ColumnDef<ProductsProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold text-left"
        >
          Product Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const code: string = row.getValue("code");
      return <div className="text-15">{code}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="font-semibold">Name</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return <div className="text-15">{name}</div>;
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="font-semibold">Category</div>,
    cell: ({ row }) => {
      const category: string = row.getValue("category");
      return <div className="text-15">{category}</div>;
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
      return <div className="text-15">{qty}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="font-semibold text-center">Status</div>,
    cell: ({ row }) => {
      const qty: number = parseFloat(row.getValue("qty"));
      return (
        <div
          className={`${
            qty > 0
              ? "bg-success-100 text-success-150"
              : "bg-orange-100 text-orange-150"
          }  text-center p-1 rounded-md font-semibold max-lg:font-normal tex-15`}
        >
          {qty > 0 ? "In stock" : "Out of stock"}
        </div>
      );
    },
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <div className="text-right">
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0 ">
  //               <span className="sr-only">Open menu</span>
  //               <SalesDialog />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           {/* <DropdownMenuContent align="end" className="bg-white">
  //             <DropdownMenuItem className="text-14 flex items-center gap-2 hover:bg-gray-50 cursor-pointer ease-in-out duration-200">
  //               <SalesDialog />
  //             </DropdownMenuItem>
  //           </DropdownMenuContent> */}
  //         </DropdownMenu>
  //       </div>
  //     );
  //   },
  // },
];
