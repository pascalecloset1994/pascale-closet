import { Link } from "react-router-dom";
import { useOrder } from "../../contexts/OrderContext";
import { useAuth } from "../../contexts/AuthContext";
import { formatDate } from "../../utils/formatDate";
import {
  Package,
  CheckCircle,
  Truck,
  Clock,
  XCircle,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

const OrderHistory = () => {
  const { orders } = useOrder();
  const { user } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 border-foreground text-foreground";
      case "En Tránsito":
        return "bg-secondary border-foreground text-foreground";
      case "pending":
        return "bg-yellow-50 border-foreground text-foreground";
      case "Cancelado":
        return "bg-red-50 border-foreground text-foreground";
      default:
        return "bg-secondary border-border text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1">
            <CheckCircle size={14} /> Pago aprobado
          </span>
        );
      case "En Tránsito":
        return (
          <span className="flex items-center gap-1">
            <Truck size={14} /> En Tránsito
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1">
            <Clock size={14} /> Pendiente de pago
          </span>
        );
      case "Cancelado":
        return (
          <span className="flex items-center gap-1">
            <XCircle size={14} /> Pago Cancelado
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1">
            <Package size={14} />
          </span>
        );
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link to={"/seller/dashboard"} className="flex gap-1 items-center text-base mb-3 hover:underline group">
            <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Volver</span>
          </Link>
          <div className="bg-card border border-border p-16 text-center">
            <div className="mb-6 flex justify-center">
              <Package size={64} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-sans-elegant uppercase tracking-wider text-foreground mb-4">
              Aún no tienes pedidos
            </h2>
            {user?.role !== "seller" && (
              <>
                <p className="text-sm text-muted-foreground font-sans-elegant mb-8">
                  ¡Explora nuestros productos y realiza tu primera compra!
                </p>
                <Link to="/">
                  <button className="px-8 py-4 bg-foreground text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-all duration-300">
                    Ir a la tienda
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-sans-elegant uppercase tracking-wider text-foreground mb-8 text-center">
          Mis Pedidos
        </h1>

        <div className="space-y-6">
          {orders
            .sort(
              (a, b) =>
                new Date(b.created_at ?? 0).getTime() -
                new Date(a.created_at ?? 0).getTime(),
            )
            .map((order) => (
              <div key={String(order.id)} className="bg-card border border-border">
                {/* Order Header */}
                <div className="bg-secondary border-b border-border p-5">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex gap-8 text-sm font-sans-elegant">
                      <div>
                        <p className="text-muted-foreground text-xs uppercase tracking-wide">
                          Pedido
                        </p>
                        <p className="text-foreground mt-1">
                          #{order.order_number}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase tracking-wide">
                          Fecha
                        </p>
                        <p className="text-foreground mt-1">
                          {formatDate(order.created_at as string, true)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase tracking-wide">
                          Total
                        </p>
                        <p className="text-foreground mt-1">${order.total}</p>
                      </div>
                    </div>
                    <div
                      className={`px-4 py-2 border text-xs font-sans-elegant uppercase tracking-wide ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-5">
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-4 border-b border-border last:border-b-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-secondary border border-border flex items-center justify-center">
                          <ShoppingBag size={24} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-sans-elegant text-sm text-foreground uppercase tracking-wide">
                            {(
                              item as typeof item & {
                                product_name?: string;
                              }
                            ).product_name ?? item.name}
                          </p>
                          <p className="text-xs text-muted-foreground font-sans-elegant mt-1">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-sans-elegant text-foreground">
                        ${item.price}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="border-t border-border p-5 bg-secondary">
                  <div className="flex gap-3">
                    <Link to={`/buyer/orders/${order.id}`}>
                      <button className="px-6 py-3 bg-foreground text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:opacity-80 transition-all duration-300">
                        Ver Detalles
                      </button>
                    </Link>
                    {order.status === ("Entregado" as string) && (
                      <button className="px-6 py-3 border border-foreground text-foreground font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-foreground hover:text-background transition-all duration-300">
                        Comprar de Nuevo
                      </button>
                    )}
                    {order.status === ("En Tránsito" as string) && (
                      <button className="px-6 py-3 border border-foreground text-foreground font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-foreground hover:text-background transition-all duration-300">
                        Rastrear Envío
                      </button>
                    )}
                    {order.status === ("Procesando" as string) && (
                      <button className="px-6 py-3 border border-foreground text-foreground font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-foreground hover:text-background transition-all duration-300">
                        Cancelar Pedido
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
