import connectDB from "@/lib/db";
import Product from "@/models/Products";
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

    // Update product quantities based on the updated sale's products
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.quantity -= item.saleQuantity; // Apply the new quantity change
        await product.save();
      }
    }

    const formattedCreatedAt = newInvoice.createdAt.toISOString().split("T")[0];

    // Update product quantities based on the invoice
    for (const item of products) {
      const product = await Product.findById(item._id); // Assuming each product in the invoice has a productId field
      if (product) {
        product.quantity -= item.qty; // Decrease the quantity by the amount sold
        await product.save();
      }
      console.log(product);
    }

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

// Update
// export const PUT = async (req: NextRequest) => {
//   const { id, updatedSale } = await req.json();
//   // const invoice = updatedSale.invoice;
//   //const data = { invoice, products, total, shop, status };

//   await connectDB();
//   try {
//     const updatedSales = await Sale.findByIdAndUpdate(id, updatedSale, {
//       new: true,
//     });

//     if (!updatedSales) {
//       return new NextResponse(
//         JSON.stringify({ message: "Invoice not found" }),
//         {
//           status: 404,
//         }
//       );
//     }

//     const formattedCreatedAt = updatedSales.createdAt
//       .toISOString()
//       .split("T")[0];

//     // Update product quantities based on the invoice
//     // for (const item of updatedSale.products) {
//     //   const product = await Product.findById(item.productId);
//     //   if (product) {
//     //     product.quantity -= item.saleQuantity;
//     //     await product.save();
//     //   }
//     //   // console.log(product);
//     // }

//     for (const item of updatedSale.products) {
//       const invoice = await Sale.findById(id);
//       let num = 0;
//       if (invoice) {
//         invoice.products[num].existingQuantity -= item.saleQuantity;
//         num++;
//         await invoice.save();
//       }
//     }

//     const saleWithDetails = {
//       _id: updatedSales._id,
//       invoice: updatedSales.invoice,
//       products: updatedSales.products,
//       total: updatedSales.total,
//       shop: updatedSales.shop,
//       status: updatedSales.status,
//       is_delete: updatedSales.is_delete,
//       createdAt: formattedCreatedAt,
//       updatedAt: updatedSales.updatedAt,
//       __v: updatedSales.__v,
//     };

//     return new NextResponse(JSON.stringify(saleWithDetails), { status: 200 });
//   } catch (error) {
//     return NextResponse.json(error, { status: 500 });
//   }
// };

// export const PUT = async (req: NextRequest) => {
//   const { id, updatedSale } = await req.json();

//   await connectDB();
//   try {
//     const existingSale = await Sale.findById(id);

//     if (!existingSale) {
//       return new NextResponse(
//         JSON.stringify({ message: "Invoice not found" }),
//         {
//           status: 404,
//         }
//       );
//     }

//     // Revert product quantities based on the existing sale's products
//     // for (const item of existingSale.products) {
//     //   const product = await Product.findById(item.productId);
//     //   if (product) {
//     //     product.quantity += item.saleQuantity; // Revert the previous quantity change
//     //     await product.save();
//     //   }
//     // }

//     // Update product quantities based on the updated sale's products
//     // for (const item of updatedSale.products) {
//     //   const product = await Product.findById(item.productId);
//     //   if (product) {
//     //     product.quantity -= item.saleQuantity; // Apply the new quantity change
//     //     await product.save();
//     //   }
//     // }

//     // Update the sale's products with the new existingQuantity
//     let updatedSaleProducts = [];
//     for (const item of updatedSale.products) {
//       const saleProduct = existingSale.products.find(
//         (p: any) => p.productId.toString() === item.productId
//       );
//       if (saleProduct) {
//         saleProduct.existingQuantity -= item.saleQuantity; // Update the existingQuantity in the sale
//       }
//       updatedSaleProducts.push(saleProduct);
//     }

//     // // Update the sale details
//     existingSale.invoice = updatedSale.invoice;
//     existingSale.products = updatedSaleProducts;
//     existingSale.total = updatedSale.total;
//     existingSale.shop = updatedSale.shop;
//     existingSale.status = updatedSale.status;

//     // const updatedSales = await existingSale.save();
//     const updatedSales = await Sale.findByIdAndUpdate(id, existingSale, {
//       new: true,
//     });
//     console.log(updatedSales);

//     const formattedCreatedAt = updatedSales.createdAt
//       .toISOString()
//       .split("T")[0];

//     const saleWithDetails = {
//       _id: updatedSales._id,
//       invoice: updatedSales.invoice,
//       products: updatedSales.products,
//       total: updatedSales.total,
//       shop: updatedSales.shop,
//       status: updatedSales.status,
//       is_delete: updatedSales.is_delete,
//       createdAt: formattedCreatedAt,
//       updatedAt: updatedSales.updatedAt,
//       __v: updatedSales.__v,
//     };

//     return new NextResponse(JSON.stringify(saleWithDetails), { status: 200 });
//   } catch (error) {
//     return NextResponse.json(error, { status: 500 });
//   }
// };
