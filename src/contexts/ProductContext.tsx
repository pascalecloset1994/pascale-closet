/// <reference types="vite/client" />
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { showDialog } from "../components/common/Dialog";
import { useAuth } from "./AuthContext";
import { toast } from "../components/common/Toast";

export interface Product {
  id: string | number;
  name: string;
  price: number;
  stock?: number;
  condition?: string;
  description?: string;
  brand?: string;
  temp?: string;
  size?: string;
  color?: string;
  category?: string;
  image?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

interface NewProduct {
  name: string;
  price: number;
  stock: number;
  condition: string;
  description: string;
  brand: string;
  temp: string;
  size: string;
  color: string;
  category: string;
  user_id: string;
  image: File | string;
}

interface ProductContextType {
  products: Product[];
  sellerProducts: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductById: (id: string | number) => Product | undefined;
  createNewProduct: (newProduct: NewProduct) => Promise<void>;
  updateProduct: (
    productId: string | number,
    updatedProduct: Partial<Product>,
  ) => Promise<void>;
  getProductByUserId: () => Promise<void>;
  deleteProduct: (productId: string | number) => Promise<void>;
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string | number) => void;
  isFavorite: (productId: string | number) => boolean;
  toggleFavorite: (product: Product) => boolean;
  clearFavoriteItems: () => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts debe ser usado dentro de un ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const { user } = useAuth();

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Métodos de favoritos
  const addToFavorites = (product: Product) => {
    setFavorites((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const clearFavoriteItems = () => {
    setFavorites([]);
  };

  const removeFromFavorites = (productId: string | number) => {
    setFavorites((prev) => prev.filter((p) => p.id !== productId));
  };

  const isFavorite = (productId: string | number) => {
    return favorites.some((p) => p.id === productId);
  };

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      return false;
    } else {
      addToFavorites(product);
      return true;
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/list-products`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Error al cargar productos");
      }

      const data = await response.json();

      setProducts(data);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const getProductByUserId = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/products`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      setSellerProducts(Array.isArray(result) ? result : result.products || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (user) getProductByUserId();
  }, [user]);

  const getProductById = (id: string | number) => {
    return products.find((product) => product.id === id);
  };

  const createNewProduct = async (newProduct: NewProduct) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", String(newProduct.price));
      formData.append("stock", String(newProduct.stock));
      formData.append("condition", newProduct.condition);
      formData.append("description", newProduct.description);
      formData.append("brand", newProduct.brand);
      formData.append("temp", newProduct.temp);
      formData.append("size", newProduct.size);
      formData.append("color", newProduct.color);
      formData.append("category", newProduct.category);
      formData.append("user_id", newProduct.user_id);
      formData.append("image", newProduct.image);

      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/product`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );
      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      setProducts((prevProducts) => [
        ...prevProducts,
        result.product || result,
      ]);

      toast({
        timer: 4,
        tunner: 20,
        message: <div>Producto publicado exitosamente!</div>,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
      showDialog({ content: <div>Error: {message}</div> });
      console.error("Error al crear producto:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (
    productId: string | number,
    updatedProduct: Partial<Product>,
  ) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/product/${productId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedProduct),
        },
      );
      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, ...updatedProduct }
            : product,
        ),
      );

      showDialog({ content: <div>{result.message}</div> });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
      showDialog({ content: <div>Error: {message}</div> });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId: string | number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/product/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId),
      );

      showDialog({ content: <div>{result.message}</div> });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
      showDialog({ content: <div>Error: {message}</div> });
    } finally {
      setLoading(false);
    }
  };

  const value: ProductContextType = {
    products,
    sellerProducts,
    loading,
    error,
    fetchProducts,
    getProductById,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProductByUserId,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavoriteItems,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
