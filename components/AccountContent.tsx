"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newPasswordFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import AccountForm from "./AccountForm";
import { LiaUserLockSolid } from "react-icons/lia";

const AccountContent = () => {
  const [loading, setLoading] = useState(false);

  const formSchema = newPasswordFormSchema();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(data);
    try {
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      {/* Left */}

      <Card className="shadow-lg ">
        <CardContent>
          <div className="flex flex-col items-center mt-5">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-full">
              <Image
                src="/icons/user-1.jpg"
                width={130}
                height={100}
                alt="img"
                className="rounded-full"
              />
            </div>

            <h3 className="mt-2 font-bold text-2xl flex items-center gap-2">
              Chamila Jayasinghe <FaCircleCheck className="text-success-150" />
            </h3>
            <p className="text-md text-gray-500 font-semibold">Super Admin</p>
          </div>

          <div className="mt-10 px-12">
            <div className="flex items-center gap-4 text-20 max-sm:text-[17px]">
              <FiUser
                className="bg-primaryLight text-primary p-2 rounded-md hover:bg-indigo-500 ease-in-out duration-200"
                size={35}
              />
              <p className="font-semibold">Account Details</p>
            </div>

            <div className="mt-8">
              <AccountForm />
            </div>

            <div className="flex items-center gap-4 text-20 max-sm:text-[17px] mt-14">
              <LiaUserLockSolid
                className="bg-primaryLight text-primary p-2 rounded-md hover:bg-indigo-500 ease-in-out duration-200"
                size={35}
              />
              <p className="font-semibold">Update Password</p>
            </div>

            <div className="mt-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                    <CustomInput
                      control={form.control}
                      name="password"
                      label="Current Password"
                      formSchema={formSchema}
                      placeholder="Enter current password"
                      type="password"
                      required={true}
                    />

                    <CustomInput
                      control={form.control}
                      name="newPassword"
                      label="New Password"
                      formSchema={formSchema}
                      placeholder="Enter new password"
                      type="password"
                      required={true}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                    <CustomInput
                      control={form.control}
                      name="confirmPassword"
                      label="Confirm New password"
                      formSchema={formSchema}
                      placeholder="Confirm password"
                      type="password"
                      required={true}
                    />
                  </div>

                  <div className="w-full">
                    <Button
                      type="submit"
                      className="text-white font-semibold text-15"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" /> &nbsp;
                          Loading...
                        </>
                      ) : (
                        "Update password"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountContent;
