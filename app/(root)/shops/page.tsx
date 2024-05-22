import Header from "@/components/Header";
import PageHeading from "@/components/PageHeading";
import SideBar from "@/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { BsShop } from "react-icons/bs";
import { ShopsProps, columns } from "./columns";
import { DataTable } from "./data-table";
import ShopsDialog from "@/components/ShopsDialog";

const Shops = async () => {
  async function getData(): Promise<ShopsProps[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        city: "Kurunegala",
        status: "Active",
        shopName: "Nawaloka Kurunegala",
      },
      {
        id: "728ed52g",
        city: "Kandy",
        status: "Active",
        shopName: "Nawaloka Kandy",
      },
      {
        id: "728ed52h",
        city: "Polonnaruwa",
        status: "Active",
        shopName: "Nawaloka Polonnaruwa",
      },
    ];
  }
  const data = await getData();
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
              <ShopsDialog />
            </div>

            <Card className="shadow-lg mt-3">
              <CardHeader>
                <CardTitle className="px-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-20 max-sm:text-[17px]">
                    <BsShop
                      className="bg-primaryLight text-primary p-2 rounded-md"
                      size={35}
                    />
                    Shops Details
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Tabel */}
                <DataTable columns={columns} data={data} />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Shops;
