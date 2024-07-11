import connectDB from "@/lib/db";
import Sale from "@/models/Sales";
import { NextRequest, NextResponse } from "next/server";

//Fetch
export const GET = async () => {
  await connectDB();
  try {
    const sales = await Sale.find({ is_delete: 0 });

    if (sales) {
      const detailedSales = sales.map((sale) => ({
        _id: sale._id,
        invoice: sale.invoice,
        products: sale.products,
        total: sale.total,
        shop: sale.shop,
        status: sale.status,
        createdAt: sale.createdAt.toISOString().split("T")[0],
      }));

      return new NextResponse(JSON.stringify(detailedSales), {
        status: 200,
      });
    } else {
      return new NextResponse(JSON.stringify({ message: "No sales found" }), {
        status: 204,
      });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
