import React from "react";
import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { accountFormSchema } from "@/lib/utils";
import { useState } from "react";

const AccountForm = () => {
  const [loading, setLoading] = useState(false);

  const formSchema = accountFormSchema();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <CustomInput
            control={form.control}
            name="name"
            label="User Name"
            formSchema={formSchema}
            placeholder="Enter user name"
            type="text"
            required={true}
            value={"Chamila Jayasinghe"}
          />

          <CustomInput
            control={form.control}
            name="email"
            label="Email Address"
            formSchema={formSchema}
            placeholder="Enter email"
            type="email"
            required={true}
            value={"chamila@gmail.com"}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <CustomInput
            control={form.control}
            name="role"
            label="User Role"
            formSchema={formSchema}
            placeholder="Enter user role"
            type="text"
            required={true}
            disable={true}
            value={"Super Admin"}
          />

          <CustomInput
            control={form.control}
            name={"shop"}
            label="Shop"
            formSchema={formSchema}
            placeholder="Enter shop"
            type="text"
            required={true}
            disable={true}
            value={"Kurunegala"}
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
                <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
              </>
            ) : (
              "Update user"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountForm;
