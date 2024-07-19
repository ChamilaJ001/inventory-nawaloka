"use client";

import React from "react";

import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import CustomSelect from "../SelectBox";
import { useUsers } from "@/context/UserContext";

function UsersForm() {
  const [loading, setLoading] = useState(false);
  const { createUser } = useUsers();

  const formSchema = userFormSchema();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      role: "",
      shop: "",
      email: "",
      password: "",
      status: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      createUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="px-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <CustomInput
              control={form.control}
              name="username"
              label="User Name"
              formSchema={formSchema}
              placeholder="Enter user name"
              type="text"
              required={true}
            />

            <CustomInput
              control={form.control}
              name="email"
              label="Email Address"
              formSchema={formSchema}
              placeholder="Enter email"
              type="email"
              required={true}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <CustomSelect
              control={form.control}
              name={"role"}
              formSchema={formSchema}
              label="User Role"
              placeholder="Select role"
              options={["Super Admin", "Admin"]}
              required={true}
            />
            <CustomSelect
              control={form.control}
              name={"shop"}
              formSchema={formSchema}
              label="Shop"
              placeholder="Select shop"
              options={["Kurunegala", "Kandy", "Polonnaruwa"]}
              required={true}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <CustomInput
              control={form.control}
              name="password"
              label="Password"
              formSchema={formSchema}
              placeholder="Enter password"
              type="password"
              required={true}
            />

            <CustomSelect
              control={form.control}
              name={"status"}
              formSchema={formSchema}
              label="Status"
              placeholder="Select status"
              options={["Active", "Inactive"]}
              required={true}
            />
          </div>
          <div className="w-full">
            <Button
              type="submit"
              className="text-16 rounded-lg border border-primary bg-primary font-semibold text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : (
                "Create user"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default UsersForm;
