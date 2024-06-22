import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DefaultTable = () => {
  const data: any = [
    {
      code: "1234",
      name: "Test",
      category: "Sunglasses",
      shop: "Kurunegala",
    },
    {
      code: "1234",
      name: "Test",
      category: "Sunglasses",
      shop: "Kurunegala",
    },
    {
      code: "1234",
      name: "Test",
      category: "Sunglasses",
      shop: "Kurunegala",
    },
    {
      code: "1234",
      name: "Test",
      category: "Sunglasses",
      shop: "Kurunegala",
    },
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-semibold">Code</TableHead>
          <TableHead className="font-semibold">Name</TableHead>
          <TableHead className="font-semibold">Category</TableHead>
          <TableHead className="font-semibold">Shop</TableHead>
          <TableHead className="font-semibold">Status</TableHead>
          {/* <TableHead className="text-right font-semibold">Amount</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((d: any) => {
          return (
            <TableRow
              key={d.code}
              className="text-16 hover:bg-gray-50 ease-in-out duration-100 cursor-pointer"
            >
              <TableCell>{d.code}</TableCell>
              <TableCell>{d.name}</TableCell>
              <TableCell>{d.category}</TableCell>
              <TableCell>{d.shop}</TableCell>
              <TableCell className="max-lg:text-14 max-lg:w-[100px]">
                <p
                  className={`${
                    d.status === "In Stock"
                      ? "bg-success-100 text-success-150"
                      : "bg-orange-100 text-orange-150"
                  }  text-center p-1 rounded-md font-semibold max-lg:font-normal`}
                >
                  {d.status}
                </p>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DefaultTable;
