import Image from "next/image";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import DefaultTable from "./DefaultTable";
import Link from "next/link";
import ProductsByShop from "./ProductsByShop";
import { LuUsers } from "react-icons/lu";
import AnimatedCounter from "./AnimatedCounter";
import { auth } from "@/auth";

const Hero = async () => {
  // const session = await getServerSession(authOptions);
  // console.log(session?.user?.name);
  const session = await auth();
  // const email = "chamila@gmail.com";
  // const user = await getUserByEmail(session?.user?.email);
  // console.log(user);
  return (
    <section className="px-2">
      <div className="grid grid-cols-2 gap-4 max-xl:grid-cols-1">
        <div className="bg-primaryLight rounded-md py-6 px-9 cursor-pointer max-xl:px-5">
          <div className="flex items-center gap-4">
            <Image
              src={"/icons/user-1.jpg"}
              alt="user"
              width={45}
              height={40}
              className="rounded-full"
            />

            <p className="text-18 font-semibold  items-center gap-2">
              Welcome back,{" "}
              <span className="text-primary"> {session?.user?.name!}!</span>
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <Link href={"/products"}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex flex-col items-start">
                    <p className="font-semibold text-18 flex items-center gap-2">
                      Total Products
                      <MdOutlineArrowOutward className="text-sky-150 text-16 bg-sky-100 rounded-full" />
                    </p>
                    <p className="font-semibold text-18">
                      <AnimatedCounter amount={560} />
                    </p>
                  </div>
                  <FaCartShopping className="icon-sky" size={35} />
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href={"/users"}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex flex-col items-start">
                    <p className="font-semibold text-18 flex items-center gap-2">
                      Total Users
                      <MdOutlineArrowOutward className="text-sky-150 text-16 bg-sky-100 rounded-full" />
                    </p>
                    <p className="font-semibold text-18">
                      <AnimatedCounter amount={10} />
                    </p>
                  </div>
                  <LuUsers className="icon-primary" size={35} />
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
      {/* </div> */}

      {/* Recent Added Products */}
      <div className="grid grid-cols-3 gap-4 mt-5 max-xl:grid-cols-1">
        <div className="col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="px-3 flex items-center justify-between">
                <div className="flex items-center gap-4 text-20 max-sm:text-[17px]">
                  <FaCartShopping
                    className="bg-primaryLight text-primary p-2 rounded-md"
                    size={35}
                  />
                  Recent Products
                </div>

                <div>
                  <Link
                    href={"/products"}
                    className="text-16 flex gap-2 items-center max-sm:text-14"
                  >
                    View All
                    <MdOutlineArrowOutward className="text-sky-150 bg-sky-100 rounded-full" />
                  </Link>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Tabel */}
              <DefaultTable />
            </CardContent>
          </Card>
        </div>

        <div className="max-xl:grid max-xl:grid-cols-2 max-lg:grid-cols-1">
          <ProductsByShop />
        </div>
      </div>
    </section>
  );
};

export default Hero;
