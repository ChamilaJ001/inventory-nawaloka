import connectDB from "@/lib/db";
import Category from "@/models/Categories";
import Product from "@/models/Products";
import Shop from "@/models/Shop";
import { ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface Category {
  _id: ObjectId;
  name: string;
}

interface Shop {
  _id: ObjectId;
  shopName: string;
}
//Insert
export const POST = async (req: NextRequest) => {
  const { name, code, category, shop, price, quantity } = await req.json();
  const is_delete = 0;
  // const qty = 1;

  await connectDB();
  const existingProduct = await Product.findOne({ $or: [{ name }, { code }] });
  if (existingProduct) {
    return new NextResponse(
      JSON.stringify({ error: "Product already exists" }),
      {
        status: 400,
      }
    );
  }

  const newProduct = new Product({
    name,
    code,
    category,
    shop,
    price,
    quantity,
    is_delete,
  });

  try {
    await newProduct.save();

    // Fetch category and shop names
    const categoryDoc = (await Category.findById(category).lean()) as Category;
    const shopDoc = (await Shop.findById(shop).lean()) as Shop;

    // Add category name and shop name to the product response
    const productWithDetails = {
      _id: newProduct._id,
      name: newProduct.name,
      code: newProduct.code,
      category: categoryDoc ? categoryDoc.name : "Unknown Category",
      shop: shopDoc ? shopDoc.shopName : "Unknown Shop",
      price: newProduct.price,
      qty: newProduct.quantity,
      is_delete: newProduct.is_delete,
      createdAt: newProduct.createdAt,
      updatedAt: newProduct.updatedAt,
      __v: newProduct.__v,
    };

    return new NextResponse(JSON.stringify(productWithDetails), {
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
    const products = await Product.find({ is_delete: 0 });

    if (products) {
      // Extract unique category and shop IDs
      const categoryIds = [
        ...new Set(products.map((product) => product.category.toString())),
      ];
      const shopIds = [
        ...new Set(products.map((product) => product.shop.toString())),
      ];

      // Fetch categories and shops in parallel
      const [categories, shops] = await Promise.all([
        Category.find({ _id: { $in: categoryIds } }).lean(),
        Shop.find({ _id: { $in: shopIds } }).lean(),
      ]);

      // Create lookup objects for categories and shops
      const categoryLookup: Record<string, string> = Object.fromEntries(
        categories.map((category) => [category._id, category.name])
      );
      const shopLookup: Record<string, string> = Object.fromEntries(
        shops.map((shop) => [shop._id, shop.shopName])
      );

      // Map through products and add categoryName and shopName
      const detailedProducts = products.map((product) => ({
        _id: product._id,
        code: product.code,
        name: product.name,
        status: product.status,
        price: product.price,
        qty: product.quantity,
        category:
          categoryLookup[product.category.toString()] || "Unknown Category",
        shop: shopLookup[product.shop.toString()] || "Unknown Shop",
      }));

      return new NextResponse(JSON.stringify(detailedProducts), {
        status: 200,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ message: "No products found" }),
        {
          status: 204,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

// Delete
// Delete
export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();

  await connectDB();
  try {
    const deletedProduct = await Product.findByIdAndUpdate(
      id,
      { is_delete: 1 },
      { new: true }
    );

    if (!deletedProduct) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(JSON.stringify(deletedProduct), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
