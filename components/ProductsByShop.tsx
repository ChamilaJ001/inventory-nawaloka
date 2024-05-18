import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AiFillProduct } from "react-icons/ai";
import { BsShop } from "react-icons/bs";
import { shops } from "@/lib/data";
import { Button } from "./ui/button";
import Link from "next/link";
import AnimatedCounter from "./AnimatedCounter";

const Shop = ({ name, qty }: ShopParams) => {
  return (
    <div className="grid grid-cols-3 gap-24 px-2 mt-5 items-center max-lg:gap-44 max-sm:gap-20">
      <div className="flex items-center gap-2 col-span-2">
        <BsShop
          className={`${
            name === "Kurunegala"
              ? "bg-success-100 text-success-150"
              : name === "Kandy"
              ? "bg-orange-100 text-orange-150"
              : "bg-primaryLight text-primary"
          } p-2 rounded-md`}
          size={35}
        />

        <p className="text-[15px] font-semibold max-xl:text-18 max-sm:text-[15px]">
          {name}
        </p>
      </div>
      {/* right */}
      <div>
        <p className="font-semibold text-16 max-xl:text-18 max-sm:text-16 ">
          <AnimatedCounter amount={qty} />
        </p>
      </div>
    </div>
  );
};

const ProductsByShop = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="px-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AiFillProduct
              className="bg-primaryLight text-primary p-2 rounded-md"
              size={35}
            />
            <div className="flex flex-col">
              <p className="text-20">Products by Shops</p>
              <p className="text-14 text-gray-500 font-normal">
                {" "}
                All active products
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {shops.map((s) => (
          <Shop key={s.name} name={s.name} qty={s.qty} />
        ))}

        <div className="text-center mt-10">
          <Link href={"/products"} className="border-button">
            View all products
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsByShop;
