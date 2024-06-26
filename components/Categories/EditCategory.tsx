"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categoryFormSchema, shopFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { useEffect, useState } from "react";
import CustomSelect from "../SelectBox";
import { BsShop } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";

type Prop = {
  selectedCategory?: any;
  categoryData?: any;
  setCategoryData?: any;
};

const wait = () => new Promise((resolve) => setTimeout(resolve, 500));

const EditCategory = ({
  selectedCategory,
  categoryData,
  setCategoryData,
}: Prop) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const formSchema: any = categoryFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedCategory?.name || "",
      code: selectedCategory?.code || "",
      status: selectedCategory?.status || "",
    },
  });

  useEffect(() => {
    form.reset({
      name: selectedCategory?.name || "",
      code: selectedCategory?.code || "",
      status: selectedCategory?.status || "",
    });
  }, [selectedCategory, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const id = selectedCategory?._id;
    const name = data.name;
    const code = data.code;
    const status = data.status;
    try {
      const res = await axios.put("/api/categories", {
        id,
        name,
        code,
        status,
      });

      if (res.status === 404) {
        toast.error("Category not found!");
      }
      if (res.status === 201) {
        const updatedCategory = res.data;
        const updatedCategoryData = categoryData.map((category: any) =>
          category._id === updatedCategory._id ? updatedCategory : category
        );

        setCategoryData(updatedCategoryData);
        wait().then(() => setOpen(false));
        form.reset();
        toast.success("Successfully updated!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Faild to update category!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        className="text-14 flex items-center gap-2 hover:bg-gray-50 cursor-pointer ease-in-out duration-200"
      >
        <FiEdit size={16} />
      </DialogTrigger>
      <DialogContent className="bg-white max-sm:w-[350px] max-sm:rounded-md">
        <DialogHeader className="mt-6 items-start">
          <h6 className="font-bold text-20 mb-3 flex items-center gap-2">
            {" "}
            <BsShop
              className="bg-primaryLight text-primary p-2 rounded-md"
              size={35}
            />
            Edit Categories
          </h6>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-4 ">
              <CustomInput
                control={form.control}
                name="name"
                label="Category Name"
                formSchema={formSchema}
                placeholder="Enter category name"
                type="text"
                required={true}
                defaultValue={selectedCategory?.name}
              />
              <CustomInput
                control={form.control}
                name="code"
                label="Code"
                formSchema={formSchema}
                placeholder="Enter code"
                type="text"
                required={true}
                defaultValue={selectedCategory?.code}
              />

              <CustomSelect
                control={form.control}
                name={"status"}
                formSchema={formSchema}
                label="Status"
                placeholder="Select status"
                options={["Active", "Inactive"]}
                required={true}
                value={selectedCategory?.status}
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
                    "Edit category"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
