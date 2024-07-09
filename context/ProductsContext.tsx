"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  code: string;
  category: string;
  shop: string;
  price: number;
  quantity: number;
  status: string;
  is_delete: string;
}

interface ProductsContextProps {
  products: Product[];
  loading: boolean;
  createProduct: (product: any) => Promise<void>;
  updateProduct: (id: any, updatedProduct: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create Product
  const createProduct = async (product: any) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/products", product);
      if (res.status === 400) {
        toast.error("Product already created!");
      }
      if (res.status === 201) {
        toast.success("Successfully created!");
        setProducts([...products, res.data]);
        router.push("/products");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Faild to create product!");
    } finally {
      setLoading(false);
    }
  };

  // Update Product
  const updateProduct = async (id: any, updatedProduct: any) => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/products/${id}`, updatedProduct);
      if (res.status === 400) {
        toast.error("Product already created with this name!");
      }
      if (res.status === 404) {
        toast.error("Product not found!");
      }
      if (res.status === 200) {
        toast.success("Successfully updated!");
        const updatedProduct = res.data;
        console.log(updatedProduct);
        const updatedProducts = products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
        setProducts(updatedProducts);
        router.push("/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Faild to updating product!");
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const deleteProduct = async (id: string) => {
    try {
      const res = await axios.delete("/api/products", {
        data: { id },
      });

      if (res.status === 404) {
        toast.error("Product not found!");
      }

      if (res.status === 200) {
        const deletedProduct = res.data;
        const updatedProductData = products.filter(
          (product: any) => product._id !== deletedProduct._id
        );

        setProducts(updatedProductData);
        toast.success("Successfully deleted!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Faild to delete product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductsContext.Provider
      value={{ products, loading, createProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
