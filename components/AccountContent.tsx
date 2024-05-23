import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const AccountContent = () => {
  return (
    <div className="w-full">
      {/* Left */}

      <Card className="shadow-lg">
        <CardContent>
          <div className="flex flex-col items-center mt-5">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-full">
              <Image
                src="/icons/user-1.jpg"
                width={130}
                height={100}
                alt="img"
                className="rounded-full"
              />
            </div>

            <h3 className="mt-2 font-bold text-2xl">Chamila Jayasinghe</h3>
            <p className="text-md text-gray-500 font-semibold">Super Admin</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountContent;
