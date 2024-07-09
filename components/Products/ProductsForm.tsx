"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productsFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomSelect from "../SelectBox";
import { useProducts } from "@/context/ProductsContext";
import axios from "axios";

function ProductsForm() {
  const { createProduct, loading } = useProducts();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<string[]>([]);
  const [shop, setShop] = useState<string[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesResponse = await axios.get("/api/categories");
        const categories = categoriesResponse.data;
        setCategory(categories);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  const categoriesSelect = category?.map((cat: any) => {
    return { name: cat.name, id: cat._id };
  });

  useEffect(() => {
    const getShops = async () => {
      try {
        const shopsResponse = await axios.get("/api/shops");
        const shops = shopsResponse.data;
        setShop(shops);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getShops();
  }, []);

  const shopsSelect = shop?.map((sh: any) => {
    return { name: sh.shopName, id: sh._id };
  });

  const formSchema = productsFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      category: "",
      shop: "",
      price: 0,
      quantity: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      createProduct(data);
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
              options={categoriesSelect.map((cat) => cat.name)}
              idValue={categoriesSelect.map((cat) => cat.id)}
              required={true}
            />
            <CustomSelect
              control={form.control}
              name={"shop"}
              formSchema={formSchema}
              label="Shop"
              placeholder="Select shop"
              options={shopsSelect.map((sh) => sh.name)}
              idValue={shopsSelect.map((sh) => sh.id)}
              required={true}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <CustomInput
              control={form.control}
              name="price"
              label="Price"
              formSchema={formSchema}
              placeholder="Enter product price"
              type="number"
              required={true}
            />

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
              className="text-16 rounded-lg border border-primary bg-primary font-semibold text-white"
              disabled={isLoading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Creating...
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
