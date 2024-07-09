import Header from "@/components/Header";
import PageHeading from "@/components/PageHeading";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCartShopping } from "react-icons/fa6";
import ProductsForm from "@/components/Products/ProductsForm";

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
            title={"Create New Products"}
            bred3={"Products"}
            bred3link={"/products"}
          />

          <div className="mt-8">
            <div className="text-end text-white masx-w-sm:px-12">
              <Link
                href={"/products"}
                className="text-white font-semibold text-14 bg-primary rounded-md px-4 py-3 hover:bg-indigo-500 ease-in-out duration-200"
              >
                Back to products list
              </Link>
            </div>

            <Card className="shadow-lg mt-5">
              <CardHeader>
                <CardTitle className="px-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-20 max-sm:text-[17px]">
                    <FaCartShopping
                      className="bg-primaryLight text-primary p-2 rounded-md"
                      size={35}
                    />
                    Add Product Details
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Form */}
                <ProductsForm />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AddNewProduct;
