import Header from "@/components/Header";
import PageHeading from "@/components/PageHeading";
import SideBar from "@/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { CategoriesProps, columns } from "./columns";
import { DataTable } from "./data-table";
import CategoryDialog from "@/components/CategoryDialog";

const Categories = async () => {
  async function getData(): Promise<CategoriesProps[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        code: "674839",
        status: "Active",
        name: "Sunglasses",
      },
      {
        id: "728ed52g",
        code: "537825",
        status: "Active",
        name: "Glass Frames",
      },
      {
        id: "728ed52h",
        code: "482292",
        status: "Active",
        name: "Reading Glasses",
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
          <PageHeading title={"Manage Categories"} />

          <div className="mt-5">
            <div className="text-end text-white max-w-sm:px-12">
              <CategoryDialog />
            </div>

            <Card className="shadow-lg mt-3">
              <CardHeader>
                <CardTitle className="px-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-20 max-sm:text-[17px]">
                    <BiCategoryAlt
                      className="bg-primaryLight text-primary p-2 rounded-md hover:bg-indigo-500 ease-in-out duration-200"
                      size={35}
                    />
                    Category Details
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

export default Categories;
