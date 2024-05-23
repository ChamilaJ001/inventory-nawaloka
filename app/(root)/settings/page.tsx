import Header from "@/components/Header";
import PageHeading from "@/components/PageHeading";
import SideBar from "@/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import UserPermissions from "@/components/UserPermissions";
import { FaUserLock } from "react-icons/fa";

const Products = async () => {
  return (
    <section className="home">
      <SideBar />
      <div className="home-content">
        <header className="home-header">
          <Header />
        </header>

        <section className="px-2">
          <PageHeading title={"Manage Settings"} />

          <div className="mt-8">
            <Card className="shadow-lg mt-5">
              <CardHeader>
                <CardTitle className="px-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-20 max-sm:text-[17px]">
                    <FaUserLock
                      className="bg-primaryLight text-primary p-2 rounded-md"
                      size={35}
                    />
                    User Roles Permissions
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UserPermissions />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Products;
