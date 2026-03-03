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
  CheckCircle,
  AlertCircle,
  Truck,
  Trash2,
} from "lucide-react";
import { closeDialog, showDialog } from "../../components/common/Dialog";
import { useCart } from "../../contexts/CartContext";

const OrderDetail = () => {
  const { id } = useParams();
  const { orders, deleteOrderById, refreshOrders } = useOrder();
  const { getCartTotal, MAX_PAYMENT, SHIPMENT_COST } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (orders && orders.length > 0) {
      const foundOrder = orders.find((o) => o.id === id);
      setOrder(foundOrder ?? null);
      setLoading(false);
    } else {
      navigate("/buyer/orders");
    }
  }, [orders, id, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-[#F0FFF0] border-[#2C2420] text-[#2C2420]";
      case "pending":
        return "bg-[#FFF9E6] border-[#2C2420] text-[#2C2420]";
      case "cancelled":
      case "Cancelado":
        return "bg-[#FFF0F0] border-[#2C2420] text-[#2C2420]";
      case "En Tránsito":
        return "bg-[#F5F0EB] border-[#2C2420] text-[#2C2420]";
      default:
        return "bg-[#F5F0EB] border-[#E0D6CC] text-[#7A6B5A]";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={16} className="mr-2" />;
      case "pending":
        return <Clock size={16} className="mr-2" />;
      case "cancelled":
      case "Cancelado":
        return <AlertCircle size={16} className="mr-2" />;
      case "En Tránsito":
        return <Truck size={16} className="mr-2" />;
      default:
        return <Package size={16} className="mr-2" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Pago Aprobado";
      case "pending":
        return "Pendiente de Pago";
      case "cancelled":
      case "Cancelado":
        return "Cancelado";
      case "En Tránsito":
        return "En Tránsito";
      default:
        return status;
    }
  };

  const handleDeleteOrder = () => {
    if (!order) return;
    showDialog({
      content: (
        <div className="text-center">
          <div className="w-16 h-16 bg-[#F5F0EB] rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-[#2C2420]" />
          </div>
          <p className="text-[#2C2420] font-sans-elegant font-medium mb-2">
            ¿Estás segura de anular la orden {order.order_number}?
          </p>
          <p className="text-sm text-[#7A6B5A] font-sans-elegant mb-6">
            Esta acción no se puede deshacer. Se eliminará la orden.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={closeDialog}
              className="px-5 py-2.5 border border-[#E0D6CC] text-[#7A6B5A] font-sans-elegant text-xs tracking-wide uppercase hover:bg-[#F5F0EB] transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                await deleteOrderById(order.id);
                closeDialog();
                await refreshOrders();
              }}
              className="px-5 py-2.5 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-wide uppercase hover:bg-[#333333] transition-all duration-200"
            >
              Anular Orden
            </button>
          </div>
        </div>
      ),
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#2C2420] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#7A6B5A] font-sans-elegant text-sm">
            Cargando detalles...
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-[#E0D6CC] p-16 text-center">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-4">
              Orden no encontrada
            </h2>
            <p className="text-sm text-[#7A6B5A] font-sans-elegant mb-8">
              No pudimos encontrar la orden que buscas.
            </p>
            <Link to="/buyer/orders">
              <button className="px-8 py-4 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#333333] transition-all duration-300">
                Volver a mis pedidos
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/buyer/orders"
          className="inline-flex items-center gap-2 text-[#7A6B5A] hover:text-[#2C2420] font-sans-elegant text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Volver a mis pedidos</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-2">
            Detalle del Pedido
          </h1>
          <p className="text-[#7A6B5A] font-sans-elegant text-sm">
            Orden #{order.order_number}
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-white border border-[#E0D6CC] mb-6">
          <div className="bg-[#F5F0EB] border-b border-[#E0D6CC] p-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <h2 className="font-sans-elegant text-sm uppercase tracking-wider text-[#2C2420]">
                Información del Pedido
              </h2>
              <aside className="flex gap-3 items-center">
                <button
                  onClick={() => handleDeleteOrder()}
                  className="px-4 py-2 border text-xs font-sans-elegant uppercase tracking-wide bg-destructive text-white hover:opacity-80 transition-opacity"
                >
                  Anular Orden
                </button>
                <div
                  className={`px-4 py-2 border text-xs font-sans-elegant uppercase tracking-wide flex items-center ${getStatusColor(order.status)}`}
                >
                  {getStatusIcon(order.status)}
                  {getStatusLabel(order.status)}
                </div>
              </aside>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Order Number */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F5F0EB] border border-[#E0D6CC] flex items-center justify-center">
                  <Hash size={18} className="text-[#2C2420]" />
                </div>
                <div>
                  <p className="text-[#7A6B5A] font-sans-elegant text-xs uppercase tracking-wide">
                    Número de Orden
                  </p>
                  <p className="text-[#2C2420] font-sans-elegant mt-1">
                    {order.order_number}
                  </p>
                </div>
              </div>

              {/* Payment ID */}
              {(order as Order & { payment_id?: string }).payment_id && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F5F0EB] border border-[#E0D6CC] flex items-center justify-center">
                    <CreditCard size={18} className="text-[#2C2420]" />
                  </div>
                  <div>
                    <p className="text-[#7A6B5A] font-sans-elegant text-xs uppercase tracking-wide">
                      ID de Pago
                    </p>
                    <p className="text-[#2C2420] font-sans-elegant mt-1 break-all">
                      {(order as Order & { payment_id?: string }).payment_id}
                    </p>
                  </div>
                </div>
              )}

              {/* Created Date */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F5F0EB] border border-[#E0D6CC] flex items-center justify-center">
                  <Calendar size={18} className="text-[#2C2420]" />
                </div>
                <div>
                  <p className="text-[#7A6B5A] font-sans-elegant text-xs uppercase tracking-wide">
                    Fecha de Creación
                  </p>
                  <p className="text-[#2C2420] font-sans-elegant mt-1">
                    {formatDate(order.created_at)}
                  </p>
                </div>
              </div>

              {/* Updated Date */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F5F0EB] border border-[#E0D6CC] flex items-center justify-center">
                  <Clock size={18} className="text-[#2C2420]" />
                </div>
                <div>
                  <p className="text-[#7A6B5A] font-sans-elegant text-xs uppercase tracking-wide">
                    Última Actualización
                  </p>
                  <p className="text-[#2C2420] font-sans-elegant mt-1">
                    {formatDate(order.updated_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        {order.items && order.items.length > 0 && (
          <div className="bg-white border border-[#E0D6CC] mb-6">
            <div className="bg-[#F5F0EB] border-b border-[#E0D6CC] p-6">
              <h2 className="font-sans-elegant text-sm uppercase tracking-wider text-[#2C2420]">
                Productos del Pedido
              </h2>
            </div>

            <div className="p-6">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4 border-b border-[#E0D6CC] last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#F5F0EB] border border-[#E0D6CC] flex items-center justify-center">
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
                        <Package size={24} className="text-[#7A6B5A]" />
                      )}
                    </div>
                    <div>
                      <p className="font-sans-elegant text-sm text-[#2C2420] uppercase tracking-wide">
                        {(item as typeof item & { product_name?: string })
                          .product_name ?? item.name}
                      </p>
                      <p className="text-xs text-[#7A6B5A] font-sans-elegant mt-1">
                        Cantidad: {item.quantity}
                      </p>
                      {(item as typeof item & { size?: string }).size && (
                        <p className="text-xs text-[#7A6B5A] font-sans-elegant">
                          Talle:{" "}
                          {(item as typeof item & { size?: string }).size}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="font-sans-elegant text-[#2C2420]">
                    ${Number(item.price).toLocaleString("es-CL")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Total */}
        <div className="bg-white border border-[#E0D6CC]">
          <div className="bg-[#F5F0EB] border-b border-[#E0D6CC] p-6">
            <h2 className="font-sans-elegant text-sm uppercase tracking-wider text-[#2C2420]">
              Resumen del Pedido
            </h2>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center py-3 border-b border-[#E0D6CC]">
              <span className="text-[#7A6B5A] font-sans-elegant text-sm">
                Subtotal
              </span>
              <span className="text-[#2C2420] font-sans-elegant">
                ${Number(order.total).toLocaleString("es-CL")}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[#E0D6CC]">
              <span className="text-[#7A6B5A] font-sans-elegant text-sm">
                Envío
              </span>
              <span className="text-[#2C2420]">
                {getCartTotal() < MAX_PAYMENT
                  ? `$${SHIPMENT_COST.toLocaleString("es-CL")}`
                  : "Envío gratis"}
              </span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-[#2C2420] font-sans-elegant text-sm uppercase tracking-wider font-medium">
                Total
              </span>
              {getCartTotal() < MAX_PAYMENT ? (
                <span className="text-[#2C2420] font-sans-elegant text-xl">
                  $
                  {Number(
                    Math.floor(order.total) + SHIPMENT_COST,
                  ).toLocaleString("es-CL")}
                </span>
              ) : (
                <span className="text-[#2C2420] font-sans-elegant text-xl">
                  ${Number(order.total).toLocaleString("es-CL")}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/buyer/orders">
            <button className="px-6 py-3 border border-[#2C2420] text-[#2C2420] font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#2C2420] hover:text-white transition-all duration-300">
              Volver a Mis Pedidos
            </button>
          </Link>
          <Link to="/">
            <button className="px-6 py-3 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-300">
              Seguir Comprando
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
