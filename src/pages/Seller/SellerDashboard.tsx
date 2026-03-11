import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useProducts } from "../../contexts/ProductContext";
import { useOrder } from "../../contexts/OrderContext";
import type { Order } from "../../contexts/OrderContext";
import { formatDate } from "../../utils/formatDate";
import { useMemo } from "react";
import {
  DollarSign,
  Package,
  CheckCircle,
  ShoppingBag,
  Plus,
  Clock,
} from "lucide-react";
import { getStatusLabel } from "../../utils/orderStatus";

interface ProductSale {
  id: string | number;
  name: string;
  sales: number;
  revenue: number;
}

const SellerDashboard = () => {
  const { user } = useAuth();
  const { sellerProducts } = useProducts();
  const { sellerOrders, sellerStats, isLoading } = useOrder();

  // Calcular productos más vendidos basado en las órdenes
  const topProducts = useMemo<ProductSale[]>(() => {
    if (!sellerOrders || sellerOrders.length === 0) return [];

    // Agrupar items de órdenes aprobadas por producto
    const productSales: Record<string, ProductSale> = {};

    sellerOrders
      .filter((order) => order.status === "approved")
      .forEach((order) => {
        if (order.items && Array.isArray(order.items)) {
          order.items.forEach((item) => {
            const productId = String(
              (item as typeof item & { product_id?: string }).product_id ||
              item.id,
            );
            if (!productSales[productId]) {
              productSales[productId] = {
                id: productId,
                name:
                  item.name ||
                  (item as typeof item & { product_name?: string })
                    .product_name ||
                  "Producto",
                sales: 0,
                revenue: 0,
              };
            }
            productSales[productId].sales += item.quantity || 1;
            productSales[productId].revenue +=
              (item.price || 0) * (item.quantity || 1);
          });
        }
      });

    return Object.values(productSales)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
  }, [sellerOrders]);

  // Obtener órdenes recientes (últimas 5)
  const recentOrders = useMemo<Order[]>(() => {
    if (!sellerOrders || sellerOrders.length === 0) return [];
    return [...sellerOrders]
      .sort(
        (a, b) =>
          new Date(b.created_at ?? 0).getTime() -
          new Date(a.created_at ?? 0).getTime(),
      )
      .slice(0, 5);
  }, [sellerOrders]);


  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-muted-foreground font-sans-elegant text-xs tracking-[0.3em] uppercase mb-1">
              Dashboard
            </p>
            <h1 className="text-2xl font-sans-elegant uppercase tracking-wider text-foreground">
              Panel de Vendedora
            </h1>
            <p className="text-muted-foreground font-sans-elegant text-sm mt-1">
              Bienvenida, {user?.name || ""}
            </p>
          </div>
          <Link to="/seller/products/new">
            <button className="px-6 py-3 bg-foreground text-background font-sans-elegant text-xs tracking-[0.15em] uppercase hover:opacity-80 transition-all duration-300">
              + Nueva Prenda
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <DollarSign size={22} className="text-foreground" />
              <span className="text-[10px] text-foreground font-sans-elegant uppercase tracking-wide">
                {sellerStats.approvedOrders > 0 ? "Activo" : "-"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-sans-elegant uppercase tracking-wide mb-1">
              Ventas Totales
            </p>
            <p className="text-2xl font-sans-elegant text-foreground">
              $
              {sellerStats.totalSales.toLocaleString("es-AR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <Clock size={22} className="text-foreground" />
              <span className="text-[10px] text-muted-foreground font-sans-elegant uppercase tracking-wide">
                Pendiente
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-sans-elegant uppercase tracking-wide mb-1">
              Pedidos Pendientes
            </p>
            <p className="text-2xl font-sans-elegant text-foreground">
              {sellerStats.pendingOrders}
            </p>
          </div>

          <div className="bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle size={22} className="text-foreground" />
              <span className="text-[10px] text-foreground font-sans-elegant uppercase tracking-wide">
                Completados
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-sans-elegant uppercase tracking-wide mb-1">
              Pedidos Aprobados
            </p>
            <p className="text-2xl font-sans-elegant text-foreground">
              {sellerStats.approvedOrders}
            </p>
          </div>

          <div className="bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <ShoppingBag size={22} className="text-foreground" />
              <span className="text-[10px] text-muted-foreground font-sans-elegant uppercase tracking-wide">
                Total
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-sans-elegant uppercase tracking-wide mb-1">
              Productos
            </p>
            <p className="text-2xl font-sans-elegant text-foreground">
              {sellerProducts.length}
            </p>
          </div>
        </div>

        {/* Quick Actions - Compacto */}
        <div className="bg-card border border-border p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xs font-sans-elegant font-medium text-foreground uppercase tracking-wider">
              Acciones Rápidas
            </h2>
            <div className="flex gap-2 flex-wrap">
              <Link
                to="/seller/products/new"
                className="flex items-center gap-2 px-4 py-2 border border-border bg-secondary hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-200 text-muted-foreground font-sans-elegant text-xs tracking-wide"
              >
                <Plus size={16} />
                <span>Añadir</span>
              </Link>
              <Link
                to="/seller/orders"
                className="flex items-center gap-2 px-4 py-2 border border-border bg-secondary hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-200 text-muted-foreground font-sans-elegant text-xs tracking-wide"
              >
                <Package size={16} />
                <span>Pedidos</span>
              </Link>
              <Link
                to="/seller/products"
                className="flex items-center gap-2 px-4 py-2 border border-border bg-secondary hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-200 text-muted-foreground font-sans-elegant text-xs tracking-wide"
              >
                <ShoppingBag size={16} />
                <span>Productos</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-card border border-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-sm font-sans-elegant uppercase tracking-wider text-foreground">
                Pedidos Recientes
              </h2>
            </div>
            <div className="p-4">
              {isLoading ? (
                <p className="text-muted-foreground font-sans-elegant text-sm text-center py-8">
                  Cargando pedidos...
                </p>
              ) : recentOrders.length === 0 ? (
                <p className="text-muted-foreground font-sans-elegant text-sm text-center py-8">
                  No hay pedidos recientes
                </p>
              ) : (
                recentOrders.map((order) => (
                  <div
                    key={String(order.id)}
                    className="border-b border-border py-3 last:border-b-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-sans-elegant font-medium text-foreground text-sm">
                          #{order.order_number}
                        </p>
                        <p className="text-xs text-muted-foreground font-sans-elegant">
                          {order.user_id}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-sans-elegant text-foreground">
                          ${Number(order.total).toLocaleString("es-AR")}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-sans-elegant">
                          {formatDate(order.updated_at as string)}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-[10px] px-2 py-1 font-sans-elegant uppercase tracking-wide ${order.status === "pending"
                            ? "bg-secondary border border-border text-muted-foreground"
                            : order.status === "approved"
                              ? "bg-green-50 dark:bg-green-200 border border-green-300 text-green-600"
                              : "bg-secondary border border-border text-muted-foreground"
                          }`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                      <Link to={`/seller/orders/${order.id}`} className="text-xs text-foreground hover:underline font-sans-elegant">
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                ))
              )}
              <div className="mt-4 text-center">
                <Link
                  to="/seller/orders"
                  className="text-foreground hover:underline font-sans-elegant text-xs tracking-wide"
                >
                  Ver todos los pedidos →
                </Link>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-card border border-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-sm font-sans-elegant uppercase tracking-wider text-foreground">
                Más Vendidos
              </h2>
            </div>
            <div className="p-4">
              {topProducts.length === 0 ? (
                <p className="text-muted-foreground font-sans-elegant text-sm text-center py-8">
                  Aún no hay productos vendidos
                </p>
              ) : (
                topProducts.map((product, index) => (
                  <div
                    key={String(product.id)}
                    className="border-b border-border py-3 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-secondary border border-border flex items-center justify-center font-sans-elegant text-sm text-foreground">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans-elegant text-sm text-foreground truncate">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-sans-elegant">
                          {product.sales}{" "}
                          {product.sales === 1 ? "venta" : "ventas"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-sans-elegant text-foreground">
                          $
                          {product.revenue.toLocaleString("es-AR", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div className="mt-4 text-center">
                <Link
                  to="/seller/products"
                  className="text-foreground hover:underline font-sans-elegant text-xs tracking-wide"
                >
                  Ver todos los productos →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
