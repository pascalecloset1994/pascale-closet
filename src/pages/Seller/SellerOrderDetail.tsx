import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useOrder } from "../../contexts/OrderContext";
import type { Order } from "../../contexts/OrderContext";
import { formatDate } from "../../utils/formatDate";
import {
  ArrowLeft,
  Package,
  CreditCard,
  Calendar,
  Hash,
  Clock,
  Truck,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { getStatusColor, getStatusIcon, getStatusLabel } from "../../utils/orderStatus";

const SellerOrderDetail = () => {
  const { id } = useParams();
  const { sellerOrders } = useOrder();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (sellerOrders && sellerOrders.length > 0) {
      const foundOrder = sellerOrders.find((o) => o.id === id);
      setOrder(foundOrder ?? null);
      setLoading(false);
    } else {
      navigate("/seller/orders");
    }
  }, [sellerOrders, id, navigate]);

  

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-sans-elegant text-sm">
            Cargando detalles...
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-card border border-border p-16 text-center">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-xl font-sans-elegant uppercase tracking-wider text-foreground mb-4">
              Orden no encontrada
            </h2>
            <p className="text-sm text-muted-foreground font-sans-elegant mb-8">
              No pudimos encontrar la orden que buscas.
            </p>
            <Link to="/seller/orders">
              <button className="px-8 py-4 bg-foreground text-background font-sans-elegant text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-all duration-300">
                Volver a pedidos
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/seller/orders"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-sans-elegant text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Volver a pedidos</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-sans-elegant uppercase tracking-wider text-foreground mb-2">
            Detalle del Pedido
          </h1>
          <p className="text-muted-foreground font-sans-elegant text-sm">
            Orden #{order.order_number}
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-card border border-border mb-6">
          <div className="bg-secondary border-b border-border p-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <h2 className="font-sans-elegant text-sm uppercase tracking-wider text-foreground">
                Información del Pedido
              </h2>
              <div
                className={`px-4 py-2 border text-xs font-sans-elegant uppercase tracking-wide flex items-center ${getStatusColor(order.status)}`}
              >
                {getStatusIcon(order.status)}
                {getStatusLabel(order.status)}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Order Number */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center">
                  <Hash size={18} className="text-foreground" />
                </div>
                <div>
                  <p className="text-muted-foreground font-sans-elegant text-xs uppercase tracking-wide">
                    Número de Orden
                  </p>
                  <p className="text-foreground font-sans-elegant mt-1">
                    {order.order_number}
                  </p>
                </div>
              </div>

              {/* Payment ID */}
              {order.payment_id && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center">
                    <CreditCard size={18} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-muted-foreground font-sans-elegant text-xs uppercase tracking-wide">
                      ID de Pago
                    </p>
                    <p className="text-foreground font-sans-elegant mt-1 break-all">
                      {order.payment_id}
                    </p>
                  </div>
                </div>
              )}

              {/* Created Date */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center">
                  <Calendar size={18} className="text-foreground" />
                </div>
                <div>
                  <p className="text-muted-foreground font-sans-elegant text-xs uppercase tracking-wide">
                    Fecha de Creación
                  </p>
                  <p className="text-foreground font-sans-elegant mt-1">
                    {formatDate(order.created_at as string)}
                  </p>
                </div>
              </div>

              {/* Updated Date */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center">
                  <Clock size={18} className="text-foreground" />
                </div>
                <div>
                  <p className="text-muted-foreground font-sans-elegant text-xs uppercase tracking-wide">
                    Última Actualización
                  </p>
                  <p className="text-foreground font-sans-elegant mt-1">
                    {formatDate(order.updated_at as string)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buyer & Shipping Info */}
        {(order.buyer_first_name || order.buyer_name || order.buyer_email || order.buyer_address) && (
          <div className="bg-card border border-border mb-6">
            <div className="bg-secondary border-b border-border p-6">
              <h2 className="font-sans-elegant text-sm uppercase tracking-wider text-foreground">
                Datos del Comprador / Envío
              </h2>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nombre */}
                {(order.buyer_first_name || order.buyer_name) && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center">
                      <User size={18} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground font-sans-elegant text-xs uppercase tracking-wide">
                        Nombre
                      </p>
                      <p className="text-foreground font-sans-elegant mt-1">
                        {order.buyer_name || `${order.buyer_first_name} ${order.buyer_last_name || ""}`}
                      </p>
                    </div>
                  </div>
                )}

                {/* Email */}
                {order.buyer_email && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center">
                      <Mail size={18} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground font-sans-elegant text-xs uppercase tracking-wide">
                        Email
                      </p>
                      <p className="text-foreground font-sans-elegant mt-1 break-all">
                        {order.buyer_email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Teléfono */}
                {order.buyer_phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center">
                      <Phone size={18} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground font-sans-elegant text-xs uppercase tracking-wide">
                        Teléfono
                      </p>
                      <p className="text-foreground font-sans-elegant mt-1">
                        {order.buyer_phone}
                      </p>
                    </div>
                  </div>
                )}

                {/* Dirección */}
                {order.buyer_address && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center">
                      <MapPin size={18} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground font-sans-elegant text-xs uppercase tracking-wide">
                        Dirección
                      </p>
                      <p className="text-foreground font-sans-elegant mt-1">
                        {order.buyer_address}
                      </p>
                    </div>
                  </div>
                )}

                {/* Ciudad */}
                {order.buyer_city && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center">
                      <Truck size={18} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground font-sans-elegant text-xs uppercase tracking-wide">
                        Ciudad
                      </p>
                      <p className="text-foreground font-sans-elegant mt-1">
                        {order.buyer_city}
                        {order.buyer_country ? `, ${order.buyer_country}` : ""}
                        {order.buyer_postal_code ? ` (${order.buyer_postal_code})` : ""}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Order Items */}
        {order.items && order.items.length > 0 && (
          <div className="bg-card border border-border mb-6">
            <div className="bg-secondary border-b border-border p-6">
              <h2 className="font-sans-elegant text-sm uppercase tracking-wider text-foreground">
                Productos del Pedido
              </h2>
            </div>

            <div className="p-6">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4 border-b border-border last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-secondary border border-border flex items-center justify-center">
                      {(item as typeof item & { image_url?: string })
                        .image_url ? (
                        <img
                          src={
                            (item as typeof item & { image_url?: string })
                              .image_url
                          }
                          alt={
                            (item as typeof item & { product_name?: string })
                              .product_name ?? item.name
                          }
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package size={24} className="text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-sans-elegant text-sm text-foreground uppercase tracking-wide">
                        {(item as typeof item & { product_name?: string })
                          .product_name ?? item.name}
                      </p>
                      <p className="text-xs text-muted-foreground font-sans-elegant mt-1">
                        Cantidad: {item.quantity}
                      </p>
                      {(item as typeof item & { size?: string }).size && (
                        <p className="text-xs text-muted-foreground font-sans-elegant">
                          Talle:{" "}
                          {(item as typeof item & { size?: string }).size}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="font-sans-elegant text-foreground">
                    ${Number(item.price).toLocaleString("es-CL")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Total */}
        <div className="bg-card border border-border">
          <div className="bg-secondary border-b border-border p-6">
            <h2 className="font-sans-elegant text-sm uppercase tracking-wider text-foreground">
              Resumen del Pedido
            </h2>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground font-sans-elegant text-sm">
                Subtotal
              </span>
              <span className="text-foreground font-sans-elegant">
                ${Number(order.total).toLocaleString("es-CL")}
              </span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-foreground font-sans-elegant text-sm uppercase tracking-wider font-medium">
                Total
              </span>
              <span className="text-foreground font-sans-elegant text-xl">
                ${Number(order.total).toLocaleString("es-CL")}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/seller/orders">
            <button className="px-6 py-3 border border-foreground text-foreground font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-foreground hover:text-background transition-all duration-300">
              Volver a Pedidos
            </button>
          </Link>
          <Link to="/seller/dashboard">
            <button className="px-6 py-3 bg-foreground text-background font-sans-elegant text-xs tracking-[0.15em] uppercase hover:opacity-80 transition-all duration-300">
              Ir al Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerOrderDetail;
