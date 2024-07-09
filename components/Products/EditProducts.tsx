"use client";

import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productsFormSchema } from "@/lib/utils";
import { Loader, Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { useEffect, useState } from "react";
import CustomSelect from "../SelectBox";
import toast from "react-hot-toast";
import { useProducts } from "@/context/ProductsContext";
import axios from "axios";
import { useParams } from "next/navigation";

const EditProducts = () => {
  const { loading, updateProduct } = useProducts();
  const [category, setCategory] = useState<string[]>([]);
  const [shop, setShop] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const formSchema: any = productsFormSchema();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        try {
          const response = await axios.get(`/api/products/${id}`);
          setSelectedProduct(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      getProduct();
    }
  }, [id]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedProduct?.name || "",
      code: selectedProduct?.code || "",
      category: selectedProduct?.category || "",
      shop: selectedProduct?.shop || "",
      price: selectedProduct?.price?.toString() || "0", // Convert to string
      quantity: selectedProduct?.qty?.toString() || "0", // Convert to string
    },
  });

  useEffect(() => {
    form.reset({
      name: selectedProduct?.name || "",
      code: selectedProduct?.code || "",
      category: selectedProduct?.category || "",
      shop: selectedProduct?.shop || "",
      price: selectedProduct?.price?.toString() || "0", // Convert to string
      quantity: selectedProduct?.qty?.toString() || "0", // Convert to string
    });
  }, [selectedProduct, form]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesResponse = await axios.get("/api/categories");
        const categories = categoriesResponse.data;
        setCategory(categories);
      } catch (error) {
        console.error(error);
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
      }
    };

    getShops();
  }, []);

  const shopsSelect = shop?.map((sh: any) => {
    return { name: sh.shopName, id: sh._id };
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      updateProduct(id, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      {selectedProduct ? (
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
              defaultValue={selectedProduct?.name}
            />

            <CustomInput
              control={form.control}
              name="code"
              label="Product Code"
              formSchema={formSchema}
              placeholder="Enter code"
              type="text"
              required={true}
              defaultValue={selectedProduct?.code}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1 mb-0 pb-0">
            <div className="flex-col flex">
              <CustomSelect
                control={form.control}
                name={"category"}
                formSchema={formSchema}
                label="Category"
                placeholder="Change category"
                options={categoriesSelect.map((cat) => cat.name)}
                idValue={categoriesSelect.map((cat) => cat.id)}
                required={true}
                // value={selectedProduct?.categoryName}
              />
              <span>
                Selected Category:{" "}
                <b className="font-semibold ">
                  {selectedProduct?.categoryName}
                </b>
              </span>
            </div>

            <div className="flex-col flex">
              <CustomSelect
                control={form.control}
                name={"shop"}
                formSchema={formSchema}
                label="Shop"
                placeholder="Change shop"
                options={shopsSelect.map((shop) => shop.name)}
                idValue={shopsSelect.map((sh) => sh.id)}
                required={true}
                // value={selectedProduct?.shop || ""}
              />
              <span>
                Selected Shop:{" "}
                <b className="font-semibold ">{selectedProduct?.shopName}</b>
              </span>
            </div>
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
              defaultValue={selectedProduct?.price}
            />

            <CustomInput
              control={form.control}
              name="quantity"
              label="Quantity"
              formSchema={formSchema}
              placeholder="Enter product quantity"
              type="number"
              required={true}
              defaultValue={selectedProduct?.qty}
            />

            <div className="w-full">
              <Button
                type="submit"
                className="text-16 rounded-lg border border-primary bg-primary font-semibold text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Updating...
                  </>
                ) : (
                  "Edit product"
                )}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex justify-center items-center ">
          <Loader size={20} className="animate-spin" />
        </div>
      )}
    </Form>
  );
};

export default EditProducts;
