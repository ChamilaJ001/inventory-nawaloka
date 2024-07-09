import Header from "@/components/Header";
import PageHeading from "@/components/PageHeading";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuUsers } from "react-icons/lu";
import ProductsForm from "@/components/Products/ProductsForm";
import UsersForm from "@/components/UsersForm";

const AddNewProduct = () => {
  return (
    <section className="home">
      <SideBar />
      <div className="home-content">
        <header className="home-header">
          <Header />
        </header>

        <section className="px-2">
          <PageHeading
            title={"Create New Users"}
            bred3={"Users"}
            bred3link={"/users"}
          />

          <div className="mt-8">
            <div className="text-end text-white masx-w-sm:px-12">
              <Link
                href={"/users"}
                className="text-white font-semibold text-14 bg-primary rounded-md px-4 py-3"
              >
                Back to users list
              </Link>
            </div>

            <Card className="shadow-lg mt-5">
              <CardHeader>
                <CardTitle className="px-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-20 max-sm:text-[17px]">
                    <LuUsers
                      className="bg-primaryLight text-primary p-2 rounded-md"
                      size={35}
                    />
                    Add User Details
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Form */}
                <UsersForm />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AddNewProduct;
