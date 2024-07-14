"use client";

import React, { useEffect, useState } from "react";
import { TableComp } from "../Reusable/Table";
import { useParams } from "next/navigation";
import { useSales } from "@/context/SaleContext";
import { Loader } from "lucide-react";

const InvoiceDetails = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Sale | null>(null);
  const { sales } = useSales();
  const { view } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const sale = sales.filter((sale) => sale._id === view);
    if (sale.length > 0) {
      setSelectedInvoice(sale[0]);
      setLoading(false);
    }
  }, [view, sales]);

  return (
    <div className="px-3">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <p className="font-bold">Invoice No: </p>
          <p>{selectedInvoice?.invoice}</p>
        </div>
        <div className="flex gap-2 mt-3 items-center">
          <p className="font-bold">Shop Name: </p>
          <p>{selectedInvoice?.shop}</p>
        </div>
        <div className="flex gap-2 mt-3 items-center">
          <p className="font-bold">Date: </p>
          <p>{selectedInvoice?.createdAt}</p>
        </div>

        {/* Change the status color */}
        <div className="flex gap-2 mt-2 items-center">
          <p className="font-bold">Payment Status: </p>
          <p
            className={`${
              selectedInvoice?.status === "Success"
                ? "bg-success-100 text-success-150"
                : "bg-orange-100 text-orange-150"
            }  text-center p-1 rounded-md font-semibold max-lg:font-normal tex-15`}
          >
            {selectedInvoice?.status}
          </p>
        </div>
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center ">
            <Loader size={20} className="animate-spin" />
          </div>
        ) : (
          selectedInvoice && <TableComp data={selectedInvoice} />
        )}
      </div>
    </div>
  );
};

export default InvoiceDetails;
