import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { useAuth, type User } from "./AuthContext";
import { toast } from "../components/common/Toast";

export interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string | number;
  order_number?: string;
  user_id: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  total: number;
  items?: OrderItem[];
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

interface SellerStats {
  totalSales: number;
  pendingOrders: number;
  approvedOrders: number;
  totalOrders: number;
}

interface OrderContextType {
  user: User | null;
  orders: Order[];
  sellerOrders: Order[];
  sellerStats: SellerStats;
  error: string | null;
  isLoading: boolean;
  getOrderById: (id: string | number) => Order | undefined;
  getAllOrders: () => Promise<void>;
  getSellerOrders: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  deleteOrderById: (id: string | number) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [sellerOrders, setSellerOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Obtener órdenes del usuario comprador
  const refreshOrders = useCallback(async () => {
    if (!user?.user_id) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/user/orders/${user.user_id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();
      if (!response.ok) {
        setError("Falló en el fetch de órdenes: " + response.statusText);
        return;
      }
      setOrders(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Obtener todas las órdenes para el vendedor
  const getSellerOrders = useCallback(async () => {
    if (!user?.user_id || user?.role !== "seller") return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/seller/orders`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();
      if (!response.ok) {
        setError(
          "Falló en el fetch de órdenes del vendedor: " + response.statusText,
        );
        return;
      }
      setSellerOrders(Array.isArray(data) ? data : data.orders ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.user_id) {
      refreshOrders();
      if (user?.role === "seller") {
        getSellerOrders();
      }
    }
  }, [user, refreshOrders, getSellerOrders]);

  // Estadísticas calculadas para el vendedor
  const sellerStats = useMemo<SellerStats>(() => {
    if (!sellerOrders || sellerOrders.length === 0) {
      return {
        totalSales: 0,
        pendingOrders: 0,
        approvedOrders: 0,
        totalOrders: 0,
      };
    }

    const totalSales = sellerOrders
      .filter((order) => order.status === "approved")
      .reduce((sum, order) => sum + Number(order.total || 0), 0);

    const pendingOrders = sellerOrders.filter(
      (order) => order.status === "pending",
    ).length;
    const approvedOrders = sellerOrders.filter(
      (order) => order.status === "approved",
    ).length;

    return {
      totalSales,
      pendingOrders,
      approvedOrders,
      totalOrders: sellerOrders.length,
    };
  }, [sellerOrders]);

  const getAllOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/seller/orders`,
        {
          credentials: "include",
        },
      );

      const data = await response.json();
      if (!response.ok) {
        setError("Falló en el fetch de órdenes: " + response.statusText);
        return;
      }

      setOrders(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderById = (id: string | number) => {
    return orders.find((order) => order.id === id);
  };

  const deleteOrderById = async (id: string | number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/order/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const order = await response.json();
      if (!response.ok) {
        throw new Error(order.message);
      }
      toast({
        timer: 6,
        message: (
          <div>
            {order.message}{" "}
            <span className="font-semibold">
              N°:{order.result.order_number}
            </span>
          </div>
        ),
      });

      setOrders([]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  return (
    <OrderContext.Provider
      value={{
        user,
        orders,
        sellerOrders,
        sellerStats,
        error,
        isLoading,
        getOrderById,
        getAllOrders,
        getSellerOrders,
        refreshOrders,
        deleteOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder debe ser usado dentro de un OrderProvider");
  }
  return context;
};
