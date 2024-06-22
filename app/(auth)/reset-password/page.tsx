"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const formSchema = resetPasswordFormSchema();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
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
    <section className="flex flex-row min-h-screen justify-center items-center py-12  bg-[#f1f4fc] max-sm:px-3">
      <Card className="p-3 w-[450px] bg-white ">
        <CardHeader className="items-center">
          <Image
            src={"/icons/logo2.1.png"}
            alt="logo"
            width={180}
            height={50}
          />
        </CardHeader>

        <CardContent>
          <p className="text-center text-15 text-gray-700">
            Please create a new password and confirm it. After that you can
            login with new password.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mt-5">
                <CustomInput
                  control={form.control}
                  name="password"
                  label="Password"
                  formSchema={formSchema}
                  placeholder="Enter your password"
                  type="password"
                  required={true}
                />
                <div className="mt-3">
                  <CustomInput
                    control={form.control}
                    name="confirmPassword"
                    label="Confirm Password"
                    formSchema={formSchema}
                    placeholder="Confirm your password"
                    type="password"
                    required={true}
                  />
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <Button
                    type="submit"
                    className=" rounded-lg border border-primary bg-primary font-semibold text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp;
                        Loading...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                  <Link
                    href={"/sign-in"}
                    className="text-16 rounded-lg border bg-primaryLight font-semibold text-primary px-4 py-2 text-center hover:text-white hover:bg-primary ease-in-out duration-200"
                  >
                    Back to login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ResetPassword;
