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
import { salesFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomSelect from "./SelectBox";
import { BiCategoryAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

const SalesDialog = () => {
  const [loading, setLoading] = useState(false);

  const formSchema = salesFormSchema();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoice: "",
      quantity: 0,
      total: 0,
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
        <FiEdit size={16} />
      </DialogTrigger>
      <DialogContent className="bg-white max-sm:w-[350px] max-sm:rounded-md">
        <DialogHeader className="mt-6 items-start">
          <h6 className="font-bold text-20 mb-3 flex items-center gap-2">
            {" "}
            <BiCategoryAlt
              className="bg-primaryLight text-primary p-2 rounded-md"
              size={35}
            />
            Create New sales
          </h6>
        </DialogHeader>

        <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-4 ">
                <CustomInput
                  control={form.control}
                  name="invoice"
                  label="Invoice Number"
                  formSchema={formSchema}
                  placeholder="Enter invoice number"
                  type="text"
                  required={true}
                />

                <CustomInput
                  control={form.control}
                  name="quantity"
                  label="Quantity"
                  formSchema={formSchema}
                  placeholder="Enter quantity"
                  type="number"
                  required={true}
                />

                <CustomInput
                  control={form.control}
                  name="total"
                  label="Total Amount"
                  formSchema={formSchema}
                  placeholder="Enter total amount"
                  type="number"
                  required={true}
                />

                <CustomSelect
                  control={form.control}
                  name={"status"}
                  formSchema={formSchema}
                  label="Payment Status"
                  placeholder="Select status"
                  options={["Success", "Pending"]}
                  required={true}
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
                      "Create sale"
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

export default SalesDialog;
