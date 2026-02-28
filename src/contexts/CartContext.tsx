import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useAuth } from "./AuthContext";
import { toast } from "../components/common/Toast";
import type { DiscountContentProps } from "../types/global";
import { showDialog } from "../components/common/Dialog";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  stock?: number;
  quantityAvailable?: number;
  inventory?: number;
  stockQty?: number;
  qty?: number;
  available?: number;
  [key: string]: unknown;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem, quantity?: number) => boolean;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => boolean;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  handlePayment: () => Promise<void>;
  loadingPayment: boolean;
  preferenceId: string | null;
  SHIPMENT_COST: number;
  MAX_PAYMENT: number;
  discount: number;
  setDiscount: (val: number | ((prev: number) => number)) => void;
  getStockFromProduct: (p: CartItem | null) => number | null;
  isLoading: boolean;
  discountContent: DiscountContentProps | null;
  updateDiscountContent: (form: DiscountContentProps) => Promise<void>;
  getDiscountContent: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

// helper: detecta el campo de stock posible en un producto
export const getStockFromProduct = (p: CartItem | null): number | null => {
  if (!p) return null;
  const keys: (keyof CartItem)[] = [
    "stock",
    "quantityAvailable",
    "inventory",
    "stockQty",
    "qty",
    "available",
  ];
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(p, k)) {
      const v = p[k];
      if (typeof v === "number" && Number.isFinite(v)) return v;
      if (typeof v === "string" && v !== "") {
        const n = Number(v);
        if (!Number.isNaN(n)) return n;
      }
    }
  }
  return null;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loadingPayment, setLoadingPayment] = useState(false);
  // discount arranca desde sessionStorage (dura solo la sesión del tab)
  const [discount, setDiscountState] = useState<number>(() => {
    const saved = sessionStorage.getItem("buyer_discount");
    return saved ? Number(saved) : 0;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [discountContent, setDiscountContent] = useState<DiscountContentProps | null>(null);
  const MAX_PAYMENT = 60000;
  const SHIPMENT_COST = 11000;
  const BACK_URL = import.meta.env.VITE_BACK_API_URL;

  // Wrapper de setDiscount que persiste en sessionStorage
  const setDiscount = (val: number | ((prev: number) => number)) => {
    setDiscountState((prev) => {
      const next = typeof val === "function" ? val(prev) : val;
      if (next > 0) {
        sessionStorage.setItem("buyer_discount", String(next));
      } else {
        sessionStorage.removeItem("buyer_discount");
      }
      return next;
    });
  };

  // Cargamos el sdk de mercadopago
  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
      locale: "es-AR",
    });
  }, []);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // --- MÉTODOS DE CARRITO ---
  const addToCart = (product: CartItem, quantity = 1): boolean => {
    setIsLoading(true);
    if (!product || !product.id) {
      toast({ message: "Producto inválido" + product });
      return false;
    }

    const stock = getStockFromProduct(product);

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      const existingQty = existingItem ? existingItem.quantity : 0;

      if (typeof stock === "number" && existingQty + quantity > stock) {
        toast({ message: "Excede stock disponible" });
        setIsLoading(false);
        return prevItems;
      }

      if (existingItem) {
        setIsLoading(false);
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prevItems, { ...product, quantity }];
    });

    setIsLoading(false);
    return true;
  };

  const removeFromCart = (productId: string | number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  const updateQuantity = (
    productId: string | number,
    quantity: number,
  ): boolean => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return true;
    }

    let blocked = false;

    setCartItems((prevItems) => {
      const item = prevItems.find((it) => it.id === productId);
      if (!item) return prevItems;

      const stock = getStockFromProduct(item);
      if (typeof stock === "number" && quantity > stock) {
        toast({ message: "Excede stock" });
        blocked = true;
        return prevItems;
      }

      return prevItems.map((it) =>
        it.id === productId ? { ...it, quantity } : it,
      );
    });

    return !blocked;
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getCartItemsCount = () =>
    cartItems.reduce((count, item) => count + item.quantity, 0);

  const getDiscountContent = useCallback(async () => {
    try {
      const response = await fetch(`${BACK_URL}/user/content`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const content = await response.json();
      if (!response.ok) {
        return showDialog({ content: <div>{content.message}</div> });
      }
      const d: DiscountContentProps = content.userContent;
      setDiscountContent(d);
      // ⚠️ NO seteamos `discount` aquí: el buyer debe activarlo
      // manualmente haciendo click en "Obtener Cupón" en Home.
    } catch (err) {
      console.error("Error al obtener el descuento:", err);
    }
  }, [BACK_URL]);

  const updateDiscountContent = async (form: DiscountContentProps) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACK_URL}/user/content-update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          discount: form.discount,
          discountDescription: form.discount_description,
          discountIsActive: form.discount_is_active,
          discountUpdatedAt: form.discount_updated_at,
        }),
      });
      const content = await response.json();
      if (!response.ok) {
        throw new Error(content.message);
      }
      const userContent = content.userContent;
      toast({ message: <div>{userContent.message ?? "Descuento actualizado"}</div> });
      const updated: DiscountContentProps = {
        discount: userContent.discount,
        discount_description: userContent.discount_description,
        discount_is_active: userContent.discount_is_active,
        discount_updated_at: userContent.discount_updated_at,
      };
      setDiscountContent(updated);
      // ⚠️ NO tocamos `discount`: el buyer lo activa desde Home.
    } catch (error) {
      console.error("Error al actualizar el descuento:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar descuento al montar
  useEffect(() => {
    getDiscountContent();
  }, [getDiscountContent]);

  // --- PAGO CON MERCADO PAGO ---
  const handlePayment = async () => {
    setLoadingPayment(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/payment/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user?.user_id,
            total: getCartTotal(),
            items: cartItems,
          }),
        },
      );

      const data = await response.json();

      if (data.init_point) {
        setPreferenceId(data.order_id);
        window.open(data.init_point, "_blank");
      } else {
        console.error("No se recibió init_point del backend");
      }
    } catch (error) {
      console.error("Error al crear preferencia:", error);
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        handlePayment,
        loadingPayment,
        preferenceId,
        MAX_PAYMENT,
        SHIPMENT_COST,
        discount,
        setDiscount,
        getStockFromProduct,
        isLoading,
        discountContent,
        updateDiscountContent,
        getDiscountContent,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
