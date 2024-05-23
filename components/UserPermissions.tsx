import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PermissionTable from "./PermissionTable";

const UserPermissions = () => {
  return (
    <div className="px-3">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="rounded-md border px-3">
          <AccordionTrigger>Manage Shops</AccordionTrigger>
          <AccordionContent>
            <PermissionTable />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="rounded-md border px-3 mt-3">
          <AccordionTrigger>Manage Categories</AccordionTrigger>
          <AccordionContent>
            <PermissionTable />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="rounded-md border px-3 mt-3">
          <AccordionTrigger>Manage Products</AccordionTrigger>
          <AccordionContent>
            <PermissionTable />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="rounded-md border px-3 mt-3">
          <AccordionTrigger>Manage Users</AccordionTrigger>
          <AccordionContent>
            <PermissionTable />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="rounded-md border px-3 mt-3">
          <AccordionTrigger>Manage Sales</AccordionTrigger>
          <AccordionContent>
            <PermissionTable />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="rounded-md border px-3 mt-3">
          <AccordionTrigger>Manage Settings</AccordionTrigger>
          <AccordionContent>
            <PermissionTable module="Settings" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default UserPermissions;
