"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type ProductsProps = {
  _id: string;
  code: string;
  name: string;
  category: string;
  shop: string;
  quantity: number;
  status: string;
};

export const columns: ColumnDef<ProductsProps>[] = [
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
      const quantity = parseInt(row.getValue("qty"));
      return <div className="text-15">{quantity}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="font-semibold text-center">Status</div>,
    cell: ({ row }) => {
      const quantity = parseInt(row.getValue("qty"));
      return (
        <div
          className={`${
            quantity > 0
              ? "bg-success-100 text-success-150"
              : "bg-orange-100 text-orange-150"
          }  text-center p-1 rounded-md font-semibold max-lg:font-normal tex-15`}
        >
          {quantity > 0 ? "In stock" : "Out of stock"}
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
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end" className="bg-white">
  //             <DropdownMenuItem className="text-14 flex items-center gap-2 hover:bg-gray-50 cursor-pointer ease-in-out duration-200">
  //               <FiEdit size={16} />
  //               Edit
  //             </DropdownMenuItem>
  //             <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-50 cursor-pointer ease-in-out duration-200">
  //               <IoTrashOutline size={17} />
  //               Delete
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </div>
  //     );
  //   },
  // },
];
