import Header from "@/components/Header";
import PageHeading from "@/components/PageHeading";
import SideBar from "@/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { RiExchange2Line } from "react-icons/ri";
import { SalesProps, columns } from "./columns";
import { DataTable } from "./data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DailySales = async () => {
  async function getData(): Promise<SalesProps[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        code: "P74839",
        invoice: "I37282",
        name: "Ray ban sunglass",
        shop: "Kurunegala",
        qty: 1,
        total: 2500,
        payment: "Success",
        date: "2024-05-23",
      },
      {
        id: "728ed52g",
        code: "P74839",
        invoice: "I37282",
        name: "Horizan Frame",
        shop: "Kandy",
        qty: 2,
        total: 15500,
        payment: "Success",
        date: "2024-05-20",
      },
      {
        id: "728ed52h",
        code: "P83047",
        invoice: "I53456",
        name: "Kritz sunglasses",
        shop: "Polonnaruwa",
        qty: 1,
        total: 4500,
        payment: "Success",
        date: "2024-05-15",
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
          <PageHeading title={"Manage Sales"} />

          <div className="mt-8">
            <div className="flex items-center justify-end gap-2 text-white max-w-sm:px-12">
              <Link
                href={"/daily-sales/add-new"}
                className="text-white font-semibold text-14 bg-primary rounded-md px-4 py-3 hover:bg-indigo-500 ease-in-out duration-200"
              >
                Add new sales
              </Link>
              <Button className="text-white font-semibold text-14 bg-success-150 rounded-md px-4 pt-[22px] pb-[22px] hover:bg-success-200 ease-in-out duration-200">
                Export CSV
              </Button>
            </div>

            <Card className="shadow-lg mt-5">
              <CardHeader>
                <CardTitle className="px-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-20 max-sm:text-[17px]">
                    <RiExchange2Line
                      className="bg-primaryLight text-primary p-2 rounded-md"
                      size={35}
                    />
                    Sales Details
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

export default DailySales;
