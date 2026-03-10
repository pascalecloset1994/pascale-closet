/// <reference types="vite/client" />
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
// ImagePreview ya no se usa en el contexto — las imágenes se suben a
// Vercel Blob en el formulario y aquí solo llegan las URLs resultantes.
import { showDialog } from "../components/common/Dialog";
import { useAuth } from "./AuthContext";
import { toast } from "../components/common/Toast";

export interface Product {
  id: string;
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
  quantity?: number;
  image?: string;
  status?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface ImagePreview {
  file: File;
  id: string;
  preview: string;
}

export interface NewProduct {
  name: string;
  price: number | string;
  stock: number | string;
  condition: string;
  description: string;
  brand: string;
  temp: string;
  size: string;
  color: string;
  category: string;
  user_id: string;
  /** URLs ya subidas a Vercel Blob. Los archivos nunca pasan por esta función. */
  imageUrls: string[];
}

interface ProductContextType {
  products: Product[];
  sellerProducts: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  createNewProduct: (newProduct: NewProduct) => Promise<void>;
  updateProduct: (
    productId: string | number,
    updatedProduct: NewProduct,
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
        `${import.meta.env.VITE_BACK_API_URL}/list-products`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Error al cargar productos");
      }

      const data = await response.json();

      // Asegurar que siempre es un array
      const productsList = Array.isArray(data) ? data : (data.products || data.data || []);
      setProducts(productsList);
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
        `${import.meta.env.VITE_BACK_API_URL}/products`,
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
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/product`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newProduct.name,
            price: newProduct.price,
            stock: newProduct.stock,
            condition: newProduct.condition,
            description: newProduct.description,
            brand: newProduct.brand,
            temp: newProduct.temp,
            size: newProduct.size,
            color: newProduct.color,
            category: newProduct.category,
            user_id: newProduct.user_id,
            imageUrls: newProduct.imageUrls,
          }),
        },
      );
      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      setProducts((prevProducts) => [
        ...prevProducts,
        result.product,
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
      await fetch(`${import.meta.env.BASE_URL}/api/loger`, {
        method: "POST",
        headers: { "COntent-Type": "application/json" },
        body: JSON.stringify({ log: err })
      })
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (
    productId: string | number,
    updatedProduct: NewProduct,
  ) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/product/${productId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: updatedProduct.name,
            price: updatedProduct.price,
            stock: updatedProduct.stock,
            condition: updatedProduct.condition,
            description: updatedProduct.description,
            brand: updatedProduct.brand,
            temp: updatedProduct.temp,
            size: updatedProduct.size,
            color: updatedProduct.color,
            category: updatedProduct.category,
            imageUrls: updatedProduct.imageUrls,
          }),
        },
      );
      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, ...result }
            : product,
        ),
      );

      toast({
        timer: 4,
        tunner: 20,
        message: <div>Producto actualizado exitosamente!</div>,
      });
      await fetchProducts();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
      showDialog({ content: <div>Error: {message}</div> });
      await fetch(`${import.meta.env.BASE_URL}/api/loger`, {
        method: "POST",
        headers: { "COntent-Type": "application/json" },
        body: JSON.stringify({ log: err })
      })
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId: string | number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/product/${productId}`,
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
