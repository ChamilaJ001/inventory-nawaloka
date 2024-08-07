"use client";

import Header from "@/components/Header";
import PageHeading from "@/components/PageHeading";
import SideBar from "@/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { ProductsProps, columns } from "./columns";
import { DataTable } from "./data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/context/ProductsContext";
import { Loader } from "lucide-react";

const AddNewSales = () => {
  const { loading, products } = useProducts();
  return (
    <section className="home">
      <SideBar />
      <div className="home-content">
        <header className="home-header">
          <Header />
        </header>

        <section className="px-2">
          <PageHeading
            title={"Create New Sales"}
            bred3={"Daily Sales"}
            bred3link={"/daily-sales"}
          />

          <div className="mt-8">
            <div className="text-end text-white max-w-sm:px-12">
              <Link
                href={"/daily-sales"}
                className="text-white font-semibold text-14 bg-primary rounded-md px-4 py-3 hover:bg-indigo-500 ease-in-out duration-200"
              >
                Back to sales list
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
                    Product Details
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Tabel */}
                {loading ? (
                  <div className="flex justify-center items-center ">
                    <Loader size={20} className="animate-spin" />
                  </div>
                ) : (
                  <DataTable columns={columns} data={products} />
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AddNewSales;
