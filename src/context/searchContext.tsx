import { db } from "@/firebase/firebaseConfig";
import { toast } from "@/hooks/use-toast";
import { collection, query, where, getDocs } from "firebase/firestore";
import { createContext, ReactNode, useState, FC, useContext } from "react";

type ProductContextType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  handleSearch: (sku: string) => Promise<void>;
};

const SearchProductContext = createContext<ProductContextType | undefined>(
  undefined
);

// Define Product type
interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  shortDescription: string;
  longDescription: string;
  cdwprice: number;
  insightprice: number;
  fncprice: number;
}

export const SearchProductContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = async (sku: string) => {
    try {
      const q = query(collection(db, "products"), where("sku", "==", sku));
      const querySnapshot = await getDocs(q);
      const foundProducts: Product[] = [];
      querySnapshot.forEach((doc) => {
        foundProducts.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(foundProducts);

      if (foundProducts.length === 0) {
        toast({
          title: "No products found",
          description: "No products with the given SKU were found.",
        });
      }
    } catch (error) {
      console.error("Error searching for products: ", error);
      toast({
        title: "Error",
        description: "There was an error searching for products. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <SearchProductContext.Provider value={{ products, setProducts, handleSearch }}>
      {children}
    </SearchProductContext.Provider>
  );
};

export const useSearchProduct = () => {
  const context = useContext(SearchProductContext);
  if (context === undefined) {
    throw new Error("useSearchProduct must be used within a SearchProductContextProvider");
  }
  return context;
};

export default SearchProductContext;

