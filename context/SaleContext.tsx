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

interface Sale {
  _id: string;
  invoice: string;
  code: string;
  products: [];
  total: number;
  shop: string;
  status: string;
  qty: number;
  date: string;
}

interface SaleContextProps {
  sales: Sale[];
  loading: boolean;
  createSale: (sale: any) => Promise<void>;
  updateSale: (id: any, updatedSale: any) => Promise<void>;
}

const SaleContext = createContext<SaleContextProps | undefined>(undefined);

export const SalesProvider = ({ children }: { children: ReactNode }) => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/daily-sales");
      setSales(response.data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create Sale
  const createSale = async (sale: any) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/daily-sales/add-new/", sale);
      if (res.status === 400) {
        toast.error("Invoice number already created!");
      }
      if (res.status === 201) {
        toast.success("Successfully created!");
        setSales([...sales, res.data]);
        router.push("/daily-sales");
      }
    } catch (error) {
      console.error("Error creating sale:", error);
      toast.error("Faild to create sale!");
    } finally {
      setLoading(false);
    }
  };

  // Update Product
  const updateSale = async (id: any, updatedSale: any) => {
    // setLoading(true);
    // try {
    //   const res = await axios.put(`/api/products/${id}`, updatedProduct);
    //   if (res.status === 400) {
    //     toast.error("Product already created with this name!");
    //   }
    //   if (res.status === 404) {
    //     toast.error("Product not found!");
    //   }
    //   if (res.status === 200) {
    //     toast.success("Successfully updated!");
    //     const updatedProduct = res.data;
    //     console.log(updatedProduct);
    //     const updatedProducts = sales.map((product) =>
    //       product._id === updatedProduct._id ? updatedProduct : product
    //     );
    //     setSales(updatedProducts);
    //     router.push("/products");
    //   }
    // } catch (error) {
    //   console.error("Error updating product:", error);
    //   toast.error("Faild to updating product!");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <SaleContext.Provider value={{ sales, loading, createSale, updateSale }}>
      {children}
    </SaleContext.Provider>
  );
};

export const useSales = () => {
  const context = useContext(SaleContext);
  if (!context) {
    throw new Error("useSales must be used within a SalesProvider");
  }
  return context;
};
