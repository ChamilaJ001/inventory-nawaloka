import connectDB from "@/lib/db";
import Sale from "@/models/Sales";
import { NextRequest, NextResponse } from "next/server";

//Insert
export const POST = async (req: NextRequest) => {
  // const { data } = await req.json();
  const { invoice, products, total, shop, status } = await req.json();
  const is_delete = 0;
  // const qty = 1;

  await connectDB();
  const existingInvoice = await Sale.findOne({ invoice });
  if (existingInvoice) {
    return new NextResponse(
      JSON.stringify({ error: "Invoice number already exists" }),
      {
        status: 400,
      }
    );
  }

  const newInvoice = new Sale({
    invoice,
    products,
    total,
    shop,
    status,
    is_delete,
  });

  try {
    await newInvoice.save();
    const formattedCreatedAt = newInvoice.createdAt.toISOString().split("T")[0];

    // Add category name and shop name to the shop response
    const shopWithDetails = {
      _id: newInvoice._id,
      invoice: newInvoice.invoice,
      products: newInvoice.products,
      total: newInvoice.total,
      shop: newInvoice.shop,
      status: newInvoice.status,
      is_delete: newInvoice.is_delete,
      createdAt: formattedCreatedAt,
      updatedAt: newInvoice.updatedAt,
      __v: newInvoice.__v,
    };

    return new NextResponse(JSON.stringify(shopWithDetails), {
      status: 201,
    });
    // return new NextResponse(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

//Fetch
export const GET = async () => {
  await connectDB();
  try {
    const sales = await Sale.find({ is_delete: 0 });

    if (sales) {
      const detailedProducts = sales.map((sale) => ({
        _id: sale._id,
        invoice: sale.invoice,
        products: sale.products,
        total: sale.total,
        shop: sale.shop,
        status: sale.status,
        createdAt: sale.createdAt.toISOString().split("T")[0],
      }));

      return new NextResponse(JSON.stringify(detailedProducts), {
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
