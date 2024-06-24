"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { DataTablePagination } from "@/components/DataTablePagination";

import EditDialog from "@/components/Shops/EditDialog";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteAlertBox from "@/components/Reusable/DeleteAlertBox";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setShopData: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setShopData,
}: DataTableProps<TData, TValue>) {
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const [selectedShop, setSelectedShop] = useState(null);

  const handleEditClick = (shopData: any) => {
    setSelectedShop(shopData);
  };

  const handleGetId = (id: any) => {
    setSelectedShop(id);
  };

  const handleDelete = async () => {
    setLoading(true);
    const id = selectedShop?._id;
    try {
      const res = await axios.delete("/api/shops", {
        data: { id },
      });

      if (res.status === 404) {
        toast.error("Shop not found!");
      }

      if (res.status === 200) {
        const deletedShop = res.data;
        const updatedShopData = data.filter(
          (shop: any) => shop._id !== deletedShop._id
        );

        setShopData(updatedShopData);
        toast.success("Successfully deleted!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Faild to delete shop!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3">
      <div className="flex items-center py-2">
        <Input
          placeholder="Filter shops..."
          value={
            (table.getColumn("shopName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("shopName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto ">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize cursor-pointer hover:bg-gray-50 ease-in-out duration-200"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-right justify-end">
                    <div className="text-end justify-end flex items-center gap-2 ">
                      <div
                        className=""
                        onClick={() => handleEditClick(row.original)}
                      >
                        <EditDialog
                          selectedShop={selectedShop}
                          setShopData={setShopData}
                          shopData={data}
                        />
                      </div>

                      <div onClick={() => handleGetId(row.original)}>
                        <DeleteAlertBox handleDelete={handleDelete} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-5">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
