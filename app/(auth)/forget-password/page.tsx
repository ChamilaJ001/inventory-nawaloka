"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgetPasswordFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailRecived, setEmailRecived] = useState(false);

  const formSchema = forgetPasswordFormSchema();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(data);

    if (emailRecived) {
      alert("dd");
      setLoading(false);
    } else {
      try {
        if (data.email) {
          setEmailRecived(true);
          console.log(emailRecived);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
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
        {!emailRecived ? (
          <CardContent>
            <p className="text-center text-15 text-gray-700">
              Please enter the email address associated with your account and We
              will email you a code to reset your password.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="mt-4">
                  <CustomInput
                    control={form.control}
                    name="email"
                    label="Email Address"
                    formSchema={formSchema}
                    placeholder="Enter your email"
                    type="text"
                    required={false}
                  />

                  {/* <div className="text-sm mt-1 flex items-center justify-end gap-1">
                    <p>Didn&apos;t get code?</p>
                    <Button
                      type="submit"
                      className="text-sm font-semibold text-primary bg-white hover:bg-white p-0"
                      disabled={loading}
                    >
                      Resend
                    </Button>
                  </div> */}

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
                        "Send code"
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
        ) : (
          <CardContent>
            <p className="text-center text-15 text-gray-700">
              Please enter the recived 6 digit code, then you will redirect to
              the password reset page.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="mt-4 mb-5">
                  <div className="flex flex-row justify-center items-center">
                    <InputOTP maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <div className="text-sm flex items-center justify-center gap-1">
                    <p>Didn&apos;t get code?</p>
                    <Button
                      type="submit"
                      className="text-sm font-semibold text-primary bg-white hover:bg-white p-0"
                      disabled={loading}
                    >
                      Resend
                    </Button>
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
                        "Enter code"
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
        )}
      </Card>
    </section>
  );
};

export default ForgetPassword;
