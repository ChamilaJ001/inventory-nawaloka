"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { shopFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomSelect from "./SelectBox";
import { BsShop } from "react-icons/bs";

const ShopsDialog = () => {
  const [loading, setLoading] = useState(false);

  const formSchema = shopFormSchema();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      city: "",
      status: "",
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
    <Dialog>
      <DialogTrigger>
        <Button className="text-white font-semibold text-15">
          Add new shops
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white ">
        <DialogHeader className="mt-6 items-start">
          <h6 className="font-bold text-20 mb-3 flex items-center gap-2">
            {" "}
            <BsShop
              className="bg-primaryLight text-primary p-2 rounded-md"
              size={35}
            />
            Create New Shops
          </h6>
        </DialogHeader>

        <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-4 ">
                <CustomInput
                  control={form.control}
                  name="name"
                  label="Shop Name"
                  formSchema={formSchema}
                  placeholder="Enter shop name"
                  type="text"
                />
                <CustomInput
                  control={form.control}
                  name="city"
                  label="City"
                  formSchema={formSchema}
                  placeholder="Enter city"
                  type="text"
                />

                <CustomSelect
                  control={form.control}
                  name={"status"}
                  formSchema={formSchema}
                  label="Status"
                  placeholder="Select status"
                />

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
                      <p className="text-white">Create shop</p>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ShopsDialog;
