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
  options: any;
  required: boolean;
  value?: string;
}

const CustomSelect = ({
  control,
  name,
  label,
  formSchema,
  placeholder,
  options,
  required,
  value,
}: CustomSelect) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel
            className={`form-label ${required && "flex items-center gap-1"}`}
          >
            {label ? label : ""}
            {required && <p className="text-red-500">*</p>}
          </FormLabel>
          <div className="flex w-full flex-col">
            <Select onValueChange={field.onChange} defaultValue={value}>
              <FormControl>
                <SelectTrigger className=" placeholder:text-gray-500">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                {options.map((option: any, i: number) => (
                  <SelectItem
                    key={i}
                    value={option}
                    className="hover:bg-gray-50 ease-in-out duration-200 cursor-pointer"
                    defaultValue={value}
                  >
                    {option}
                  </SelectItem>
                ))}
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
