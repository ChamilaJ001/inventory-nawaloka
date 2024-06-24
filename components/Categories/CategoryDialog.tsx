"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categoryFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomSelect from "../SelectBox";
import { BiCategoryAlt } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";

type Prop = {
  categoryData?: any;
  setCategoryData?: any;
};

const wait = () => new Promise((resolve) => setTimeout(resolve, 500));

const CategoryDialog = ({ categoryData, setCategoryData }: Prop) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const formSchema = categoryFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      status: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    const name = data.name;
    const code = data.code;
    const status = data.status;
    try {
      const res = await axios.post("/api/categories", {
        name,
        code,
        status,
      });

      if (res.status === 400) {
        toast.error("Category already created!");
      }
      if (res.status === 201) {
        setCategoryData([...categoryData, res.data]);
        wait().then(() => setOpen(false));
        form.reset();
        toast.success("Successfully created!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Faild to create category!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-white font-semibold text-14 bg-primary rounded-md px-4 py-3 hover:bg-indigo-500 ease-in-out duration-200">
        Add new categories
      </DialogTrigger>
      <DialogContent className="bg-white max-sm:w-[350px] max-sm:rounded-md">
        <DialogHeader className="mt-6 items-start">
          <h6 className="font-bold text-20 mb-3 flex items-center gap-2">
            {" "}
            <BiCategoryAlt
              className="bg-primaryLight text-primary p-2 rounded-md"
              size={35}
            />
            Create New categories
          </h6>
        </DialogHeader>

        <DialogDescription>
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
                />
                <CustomInput
                  control={form.control}
                  name="code"
                  label="Code"
                  formSchema={formSchema}
                  placeholder="Enter code"
                  type="text"
                  required={true}
                />

                <CustomSelect
                  control={form.control}
                  name={"status"}
                  formSchema={formSchema}
                  label="Status"
                  placeholder="Select status"
                  options={["Active", "Inactive"]}
                  required={true}
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
                        Creating...
                      </>
                    ) : (
                      "Create category"
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

export default CategoryDialog;
