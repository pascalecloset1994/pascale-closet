import { Link } from "react-router-dom";
import { useOrder } from "../../contexts/OrderContext";
import { formatDate } from "../../utils/formatDate";
import {
  Package,
  CheckCircle,
  Truck,
  Clock,
  XCircle,
  ShoppingBag,
} from "lucide-react";

const OrderHistory = () => {
  const { orders } = useOrder();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-[#F0FFF0] border-[#2C2420] text-[#2C2420]";
      case "En Tránsito":
        return "bg-[#F5F0EB] border-[#2C2420] text-[#2C2420]";
      case "pending":
        return "bg-[#FFF9E6] border-[#2C2420] text-[#2C2420]";
      case "Cancelado":
        return "bg-[#FFF0F0] border-[#2C2420] text-[#2C2420]";
      default:
        return "bg-[#F5F0EB] border-[#E0D6CC] text-[#7A6B5A]";
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
      <div className="min-h-screen bg-[#FAF8F5] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-[#E0D6CC] p-16 text-center">
            <div className="mb-6 flex justify-center">
              <Package size={64} className="text-[#7A6B5A]" />
            </div>
            <h2 className="text-xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-4">
              No tienes pedidos aún
            </h2>
            <p className="text-sm text-[#7A6B5A] font-sans-elegant mb-8">
              ¡Explora nuestros productos y realiza tu primera compra!
            </p>
            <Link to="/">
              <button className="px-8 py-4 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#333333] transition-all duration-300">
                Ir a la tienda
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-8 text-center">
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
              <div key={String(order.id)} className="bg-white border border-[#E0D6CC]">
                {/* Order Header */}
                <div className="bg-[#F5F0EB] border-b border-[#E0D6CC] p-5">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex gap-8 text-sm font-sans-elegant">
                      <div>
                        <p className="text-[#7A6B5A] text-xs uppercase tracking-wide">
                          Pedido
                        </p>
                        <p className="text-[#2C2420] mt-1">
                          #{order.order_number}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#7A6B5A] text-xs uppercase tracking-wide">
                          Fecha
                        </p>
                        <p className="text-[#2C2420] mt-1">
                          {formatDate(order.created_at, true)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#7A6B5A] text-xs uppercase tracking-wide">
                          Total
                        </p>
                        <p className="text-[#2C2420] mt-1">${order.total}</p>
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
                      className="flex justify-between items-center py-4 border-b border-[#E0D6CC] last:border-b-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#F5F0EB] border border-[#E0D6CC] flex items-center justify-center">
                          <ShoppingBag size={24} className="text-[#7A6B5A]" />
                        </div>
                        <div>
                          <p className="font-sans-elegant text-sm text-[#2C2420] uppercase tracking-wide">
                            {(
                              item as typeof item & {
                                product_name?: string;
                              }
                            ).product_name ?? item.name}
                          </p>
                          <p className="text-xs text-[#7A6B5A] font-sans-elegant mt-1">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-sans-elegant text-[#2C2420]">
                        ${item.price}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="border-t border-[#E0D6CC] p-5 bg-[#F5F0EB]">
                  <div className="flex gap-3">
                    <Link to={`/buyer/orders/${order.id}`}>
                      <button className="px-6 py-3 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-300">
                        Ver Detalles
                      </button>
                    </Link>
                    {order.status === ("Entregado" as string) && (
                      <button className="px-6 py-3 border border-[#2C2420] text-[#2C2420] font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#2C2420] hover:text-white transition-all duration-300">
                        Comprar de Nuevo
                      </button>
                    )}
                    {order.status === ("En Tránsito" as string) && (
                      <button className="px-6 py-3 border border-[#2C2420] text-[#2C2420] font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#2C2420] hover:text-white transition-all duration-300">
                        Rastrear Envío
                      </button>
                    )}
                    {order.status === ("Procesando" as string) && (
                      <button className="px-6 py-3 border border-[#2C2420] text-[#2C2420] font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#2C2420] hover:text-white transition-all duration-300">
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
