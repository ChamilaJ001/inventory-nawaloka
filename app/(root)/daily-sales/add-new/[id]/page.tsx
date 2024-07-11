"use client";

import Header from "@/components/Header";
import PageHeading from "@/components/PageHeading";
import SideBar from "@/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { RiExchange2Line } from "react-icons/ri";
import NewSalesForm from "@/components/Daily Sales/NewSalesForm";

const AddProductSales = () => {
  return (
    <section className="home">
      <SideBar />
      <div className="home-content">
        <header className="home-header">
          <Header />
        </header>

        <section className="px-2">
          <PageHeading title={"Manage Sales"} />

          <div className="mt-8">
            <div className="flex items-center justify-end gap-2 text-white max-w-sm:px-12">
              <Link
                href={"/daily-sales/add-new"}
                className="text-white font-semibold text-14 bg-primary rounded-md px-4 py-3 hover:bg-indigo-500 ease-in-out duration-200"
              >
                Back to list
              </Link>
            </div>

            <Card className="shadow-lg mt-5">
              <CardHeader>
                <CardTitle className="px-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-20 max-sm:text-[17px]">
                    <RiExchange2Line
                      className="bg-primaryLight text-primary p-2 rounded-md"
                      size={35}
                    />
                    Add New Sales
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <NewSalesForm />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AddProductSales;
