"use client";

import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface CustomInput {
  formSchema: any;
  control: any;
  name: any;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  type,
  formSchema,
  required,
}: CustomInput) => {
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
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
