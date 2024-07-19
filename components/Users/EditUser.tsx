"use client";

import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userFormSchema } from "@/lib/utils";
import { Loader, Loader2 } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { useEffect, useState } from "react";
import CustomSelect from "../SelectBox";
import { useParams } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import { useSales } from "@/context/SaleContext";
import axios from "axios";
import { useUsers } from "@/context/UserContext";

const EditUser = () => {
  const { updateUser } = useUsers();
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const formSchema = userFormSchema();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        try {
          const response = await axios.get(`/api/users/${id}`);
          setSelectedUser(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      getUser();
    }
  }, [id]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: selectedUser?.username,
      role: selectedUser?.role,
      shop: selectedUser?.shop,
      email: selectedUser?.email,
      password: selectedUser?.password,
      status: selectedUser?.status,
    },
  });

  useEffect(() => {
    if (selectedUser) {
      form.reset({
        username: selectedUser?.username,
        role: selectedUser?.role,
        shop: selectedUser?.shop,
        email: selectedUser?.email,
        password: selectedUser?.password,
        status: selectedUser?.status,
      });
    }
  }, [selectedUser, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    try {
      updateUser(id, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      {selectedUser ? (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-3">
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <CustomInput
              control={form.control}
              name="username"
              label="User Name"
              formSchema={formSchema}
              placeholder="Enter user name"
              type="text"
              required={true}
              defaultValue={selectedUser?.username}
            />

            <CustomInput
              control={form.control}
              name="email"
              label="Email Address"
              formSchema={formSchema}
              placeholder="Enter email"
              type="email"
              required={true}
              defaultValue={selectedUser?.email}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <CustomSelect
              control={form.control}
              name={"role"}
              formSchema={formSchema}
              label="User Role"
              placeholder="Select role"
              options={["Super Admin", "Admin"]}
              required={true}
              value={selectedUser?.role}
            />
            <CustomSelect
              control={form.control}
              name={"shop"}
              formSchema={formSchema}
              label="Shop"
              placeholder="Select shop"
              options={[
                "Nawaloka Kurunegala",
                "Nawaloka Kandy",
                "Nawaloka Polonnaruwa",
              ]}
              required={true}
              value={selectedUser?.shop}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            {/* <CustomInput
            control={form.control}
            name="password"
            label="Password"
            formSchema={formSchema}
            placeholder="Enter password"
            type="password"
            required={true}
            defaultValue={selectedUser?.password}
          /> */}

            <CustomSelect
              control={form.control}
              name={"status"}
              formSchema={formSchema}
              label="Status"
              placeholder="Select status"
              options={["Active", "Inactive"]}
              required={true}
              value={selectedUser?.status}
            />
          </div>

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
                "Edit user"
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

export default EditUser;
