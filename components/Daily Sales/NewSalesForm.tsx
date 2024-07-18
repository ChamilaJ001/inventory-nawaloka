"use client";

import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { salesFormSchema } from "@/lib/utils";
import { Loader, Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { useEffect, useState } from "react";
import CustomSelect from "../SelectBox";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import { useSales } from "@/context/SaleContext";
import { exit } from "process";

const NewSalesForm = () => {
  const { createSale } = useSales();
  const [loading, setLoading] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const formSchema: any = salesFormSchema();

  const { id } = useParams();
  const [selectedProducts, setSelectedProducts] = useState<Product[] | null>(
    null
  );
  console.log(selectedProducts);
  useEffect(() => {
    if (id) {
      // Decode the URL parameter and split it correctly
      const decodedIdString = decodeURIComponent(id as string);
      const ids = decodedIdString
        .split("&")
        .map((param) => param.split("=")[1]);

      const getProducts = async () => {
        try {
          const requests = ids.map((productId: string) =>
            axios.get(`/api/daily-sales/add-new/${productId}`)
          );
          const responses = await Promise.all(requests);
          const products = responses.map((response: any) => response.data);
          setSelectedProducts(products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      getProducts();
    }
  }, [id]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoice: "",
      total: 0,
      status: "",
      shop: "",
      products:
        selectedProducts?.map((product) => ({
          productId: product._id,
          name: product.name,
          code: product.code,
          existingQuantity: product.qty,
          saleQuantity: 0,
        })) || [],
    },
  });

  useEffect(() => {
    if (selectedProducts) {
      form.reset({
        invoice: "",
        total: 0,
        status: "",
        shop: selectedProducts[0]?.shopName,
        products:
          selectedProducts?.map((product) => ({
            productId: product._id,
            name: product.name,
            code: product.code,
            existingQuantity: product.qty,
            saleQuantity: 0,
          })) || [],
      });
    }
  }, [selectedProducts, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const saleQuantities = data.products.map(
      (product: any) => product.saleQuantity
    );

    if (selectedProducts) {
      const errors: any = [];

      saleQuantities.forEach((saleQuantity: any, index: any) => {
        if (selectedProducts[index].qty < saleQuantity) {
          errors.push(
            `Insufficient quantity for product ${selectedProducts[index].code}`
          );
        }
      });

      if (errors.length > 0) {
        alert(errors.join("\n"));
      } else {
        try {
          await createSale(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <Form {...form}>
      {selectedProducts ? (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-3">
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <CustomInput
              control={form.control}
              name="invoice"
              label="Invoice No"
              formSchema={formSchema}
              placeholder="Enter invoice no"
              type="text"
              required={true}
            />

            <CustomInput
              control={form.control}
              name="total"
              label="Total"
              formSchema={formSchema}
              placeholder="Enter total price"
              type="number"
              required={true}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <CustomSelect
              control={form.control}
              name={"status"}
              formSchema={formSchema}
              label="Payment Status"
              placeholder="Select status"
              options={["Success", "Pending"]}
              required={true}
            />

            <CustomInput
              control={form.control}
              name="shop"
              label="Shop"
              formSchema={formSchema}
              placeholder="Enter product price"
              type="text"
              required={true}
              defaultValue={selectedProducts[0]?.shopName}
              disable
            />
          </div>

          {/* Invoice Products */}
          {selectedProducts.map((prod, index) => (
            <>
              <div className="border-b-2 border-gray-200"></div>
              <div className="flex items-center gap-4 text-20 max-sm:text-[17px]">
                <FaCartShopping
                  className="bg-primaryLight text-primary p-2 rounded-md "
                  size={35}
                />
                <p className="font-semibold">Product: {prod?.code}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
                <CustomInput
                  control={form.control}
                  name={`products.${index}.name`}
                  label="Product Name"
                  formSchema={formSchema}
                  placeholder="Enter product name"
                  type="text"
                  required={true}
                  defaultValue={prod?.name}
                  disable
                />

                <CustomInput
                  control={form.control}
                  name={`products.${index}.existingQuantity`}
                  label="Existing Quantity"
                  formSchema={formSchema}
                  placeholder="Enter product quantity"
                  type="number"
                  required={true}
                  defaultValue={prod?.qty}
                  disable
                />

                <CustomInput
                  control={form.control}
                  name={`products.${index}.saleQuantity`}
                  label="Sale Quantity"
                  formSchema={formSchema}
                  placeholder="Enter sale quantity"
                  type="number"
                  required={true}
                />
              </div>
            </>
          ))}

          <div className="w-full">
            <Button
              type="submit"
              className="text-16 rounded-lg border border-primary bg-primary font-semibold text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Creating...
                </>
              ) : (
                "Create sale"
              )}
            </Button>
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

export default NewSalesForm;
