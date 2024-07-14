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
import { useParams } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import { useSales } from "@/context/SaleContext";

const EditInvoiceDetails = () => {
  const { updateSale } = useSales();
  const [loading, setLoading] = useState(false);

  const formSchema: any = salesFormSchema();

  const [selectedInvoice, setSelectedInvoice] = useState<Sale | null>();
  const { view } = useParams();
  const { sales } = useSales();

  useEffect(() => {
    setLoading(true);
    const sale = sales.filter((sale) => sale._id === view);
    if (sale.length > 0) {
      setSelectedInvoice(sale[0]);
      setLoading(false);
    }
  }, [sales, view]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoice: selectedInvoice?.invoice,
      total: selectedInvoice?.total,
      status: selectedInvoice?.status,
      shop: selectedInvoice?.shop,
      products:
        selectedInvoice?.products?.map((product: any) => ({
          productId: product.productId,
          name: product?.name,
          code: product?.code,
          existingQuantity: product.existingQuantity,
          saleQuantity: product.saleQuantity,
        })) || [],
    },
  });

  useEffect(() => {
    if (selectedInvoice) {
      form.reset({
        invoice: selectedInvoice?.invoice,
        total: selectedInvoice?.total,
        status: selectedInvoice?.status,
        shop: selectedInvoice?.shop,
        products:
          selectedInvoice?.products?.map((product: any) => ({
            productId: product.productId,
            name: product?.name,
            code: product?.code,
            existingQuantity: product.existingQuantity,
            saleQuantity: product.saleQuantity,
          })) || [],
      });
    }
  }, [selectedInvoice, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // const saleQuantities = data.products.map(
    //   (product: any) => product.saleQuantity
    // );
    // if (selectedInvoice) {
    //   saleQuantities.forEach((saleQuantity: any) => {
    //     if (selectedInvoice.products.existingQuantity < saleQuantity) {
    //       alert(
    //         `Insufficient quantity for product ${selectedInvoice.products.code}`
    //       );
    //     }
    //   });
    // }
    try {
      const id = selectedInvoice?._id;
      updateSale(id, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      {selectedInvoice ? (
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
              defaultValue={selectedInvoice?.invoice}
            />

            <CustomInput
              control={form.control}
              name="total"
              label="Total"
              formSchema={formSchema}
              placeholder="Enter total price"
              type="number"
              required={true}
              defaultValue={selectedInvoice?.total}
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
              value={selectedInvoice?.status}
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
              defaultValue={selectedInvoice?.shop}
              disable
            />
          </div>

          {/* Invoice Products */}
          {selectedInvoice.products.map((prod: any, index: any) => (
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
                  defaultValue={prod?.existingQuantity}
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
                  defaultValue={prod?.saleQuantity}
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
                  Updating...
                </>
              ) : (
                "Edit invoice"
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

export default EditInvoiceDetails;
