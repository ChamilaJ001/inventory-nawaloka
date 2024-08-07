"use client";

import Header from "@/components/Header";
import PageHeading from "@/components/PageHeading";
import SideBar from "@/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { TbFileInvoice } from "react-icons/tb";
import Link from "next/link";
import InvoiceDetails from "@/components/Daily Sales/InvoiceDetails";

const EditProds = () => {
  const [editOrView, setEditOrView] = useState(true);

  return (
    <section className="home">
      <SideBar />
      <div className="home-content">
        <header className="home-header">
          <Header />
        </header>

        <section className="px-2">
          <PageHeading title={"Invoice Details"} />

          <div className="mt-8">
            <div className="flex items-center justify-end gap-2 text-white max-w-sm:px-12">
              <Link
                href={"/daily-sales"}
                className="text-white font-semibold text-14 bg-primary rounded-md px-4 py-3 hover:bg-indigo-500 ease-in-out duration-200"
              >
                Back to list
              </Link>
            </div>

            <Card className="shadow-lg mt-5">
              <CardHeader>
                <CardTitle className="px-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-20 max-sm:text-[17px]">
                    <TbFileInvoice
                      className="bg-primaryLight text-primary p-2 rounded-md"
                      size={35}
                    />
                    Invoice Details
                  </div>
                  {/* <div className="text-white">
                    <Button
                      onClick={() => setEditOrView(!editOrView)}
                      className="text-white font-semibold text-14 bg-primary rounded-md px-4 py-3 hover:bg-indigo-500 ease-in-out duration-200"
                    >
                      {editOrView ? (
                        <FiEdit size={18} />
                      ) : (
                        <IoEyeOutline size={18} />
                      )}
                    </Button>
                  </div> */}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InvoiceDetails />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </section>
  );
};

export default EditProds;
