import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";

const PermissionTable = ({ module }: SettingsParams) => {
  const roles = ["Owner", "Manager", "Super Admin", "Admin"];
  return (
    <Table>
      <TableHeader className="bg-gray-50 rounded-md">
        {module === "Settings" ? (
          <TableRow>
            <TableHead className="font-semibold">User Role</TableHead>
            <TableHead className="font-semibold">Read</TableHead>
            <TableHead className="font-semibold">Update</TableHead>
          </TableRow>
        ) : (
          <TableRow>
            <TableHead className="font-semibold">User Role</TableHead>
            <TableHead className="font-semibold">Create</TableHead>
            <TableHead className="font-semibold">Read</TableHead>
            <TableHead className="font-semibold ">Update</TableHead>
            <TableHead className="font-semibold">Delete</TableHead>
            <TableHead className="font-semibold">Report</TableHead>
          </TableRow>
        )}
      </TableHeader>
      <TableBody>
        {roles.map((role, i) => (
          <TableRow key={i}>
            {module === "Settings" ? (
              <>
                <TableCell className="font-medium">{role}</TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell className="font-medium">{role}</TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
              </>
            )}
          </TableRow>
        ))}

        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell className="text-end">
            <Button
              type="submit"
              className="font-semibold text-14 bg-primary rounded-md px-4 py-3 hover:bg-indigo-500 ease-in-out duration-200"
            >
              <p className="text-white">Save</p>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default PermissionTable;
