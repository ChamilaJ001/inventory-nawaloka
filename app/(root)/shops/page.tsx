"use client";

import Header from "@/components/Header";
import PageHeading from "@/components/PageHeading";
import SideBar from "@/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { BsShop } from "react-icons/bs";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import ShopsDialog from "@/components/Shops/ShopsDialog";
import axios from "axios";
import { Loader } from "lucide-react";

const Shops = () => {
  const [shopData, setShopData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getShops = async () => {
      try {
        const shopsResponse = await axios.get("/api/shops");
        const shops = shopsResponse.data;
        setShopData(shops);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getShops();
  }, []);

  return (
    <section className="home">
      <SideBar />
      <div className="home-content">
        <header className="home-header">
          <Header />
        </header>

        <section className="px-2">
          <PageHeading title={"Manage Shops"} />

          <div className="mt-5">
            <div className="text-end text-white max-w-sm:px-12">
              <ShopsDialog shopData={shopData} setShopData={setShopData} />
            </div>

            <Card className="shadow-lg mt-3">
              <CardHeader>
                <CardTitle className="px-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-20 max-sm:text-[17px]">
                    <BsShop
                      className="bg-primaryLight text-primary p-2 rounded-md hover:bg-indigo-500 ease-in-out duration-200"
                      size={35}
                    />
                    Shops Details
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Tabel */}
                {isLoading ? (
                  <div className="flex justify-center items-center ">
                    <Loader size={20} className="animate-spin" />
                  </div>
                ) : (
                  <DataTable
                    columns={columns}
                    data={shopData}
                    setShopData={setShopData}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Shops;
