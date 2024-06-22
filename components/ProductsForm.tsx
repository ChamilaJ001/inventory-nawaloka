"use client";

import React from "react";
import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productsFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomSelect from "./SelectBox";

function ProductsForm() {
  const [loading, setLoading] = useState(false);

  const formSchema = productsFormSchema();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      category: "",
      shop: "",
      quantity: 0,
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
    <section className="px-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <CustomInput
              control={form.control}
              name="name"
              label="Product Name"
              formSchema={formSchema}
              placeholder="Enter product name"
              type="text"
              required={true}
            />

            <CustomInput
              control={form.control}
              name="code"
              label="Product Code"
              formSchema={formSchema}
              placeholder="Enter code"
              type="text"
              required={true}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <CustomSelect
              control={form.control}
              name={"category"}
              formSchema={formSchema}
              label="Category"
              placeholder="Select category"
              options={["Sunglasses", "Glass Frames"]}
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
              name="quantity"
              label="Quantity"
              formSchema={formSchema}
              placeholder="Enter product quantity"
              type="number"
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
                "Create product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default ProductsForm;
