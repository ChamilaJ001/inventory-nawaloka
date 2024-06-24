"use client";

import Header from "@/components/Header";
import PageHeading from "@/components/PageHeading";
import SideBar from "@/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { CategoriesProps, columns } from "./columns";
import { DataTable } from "./data-table";
import CategoryDialog from "@/components/Categories/CategoryDialog";
import axios from "axios";
import { Loader } from "lucide-react";

const Categories = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesResponse = await axios.get("/api/categories");
        const categories = categoriesResponse.data;
        setCategoryData(categories);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

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
              <CategoryDialog
                categoryData={categoryData}
                setCategoryData={setCategoryData}
              />
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
                {isLoading ? (
                  <div className="flex justify-center items-center ">
                    <Loader size={20} className="animate-spin" />
                  </div>
                ) : (
                  <DataTable
                    columns={columns}
                    data={categoryData}
                    setCategoryData={setCategoryData}
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

export default Categories;
