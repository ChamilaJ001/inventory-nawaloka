"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login } from "@/actions/users";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  //const { data: session, status: sessionStatus } = useSession();

  const formSchema = authFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      await login(data);
    } catch (error) {
      toast.error("Login Faild!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // sessionStatus !== "authenticated" && (
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
          <h2 className=" font-semibold text-center text-2xl mt-2">
            Welcome Back!
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mt-3">
                <CustomInput
                  control={form.control}
                  name="email"
                  label="Email"
                  formSchema={formSchema}
                  placeholder="Enter your email"
                  type="text"
                  required={false}
                  disable={isPending}
                />
              </div>

              <div className="">
                <CustomInput
                  control={form.control}
                  name="password"
                  label="Password"
                  formSchema={formSchema}
                  placeholder="Enter your password"
                  type="password"
                  required={false}
                  disable={isPending}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <p className="text-14">Remember this device</p>
                </div>

                <Link
                  href={"/forget-password"}
                  className="text-14 font-semibold text-primary"
                >
                  Forget password?
                </Link>
              </div>

              <div className="flex flex-col gap-4">
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
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
  // );
};

export default SignIn;
