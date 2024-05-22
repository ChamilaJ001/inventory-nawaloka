"use client";

import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomSelect {
  formSchema: any;
  control: any;
  name: any;
  label: string;
  placeholder: string;
}

const CustomSelect = ({
  control,
  name,
  label,
  formSchema,
  placeholder,
}: CustomSelect) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label ">{label ? label : ""}</FormLabel>
          <div className="flex w-full flex-col">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className=" placeholder:text-gray-500">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                <SelectItem
                  value="m@example.com"
                  className="hover:bg-gray-50 ease-in-out duration-200 cursor-pointer"
                >
                  m@example.com
                </SelectItem>
                <SelectItem
                  value="m@google.com"
                  className="hover:bg-gray-50 ease-in-out duration-200 cursor-pointer"
                >
                  m@google.com
                </SelectItem>
                <SelectItem
                  value="m@support.com"
                  className="hover:bg-gray-50 ease-in-out duration-200 cursor-pointer"
                >
                  m@support.com
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomSelect;
