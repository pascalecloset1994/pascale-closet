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
  ArrowLeft,
} from "lucide-react";

const SellerOrderHistory = () => {
  const { sellerOrders } = useOrder();

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

  if (sellerOrders.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/seller/dashboard"
            className="flex gap-1 items-center text-base mb-3 hover:underline group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            <span>Volver</span>
          </Link>
          <div className="bg-white border border-[#E0D6CC] p-16 text-center">
            <div className="mb-6 flex justify-center">
              <Package size={64} className="text-[#7A6B5A]" />
            </div>
            <h2 className="text-xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-4">
              Aún no tienes pedidos
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          to="/seller/dashboard"
          className="inline-flex items-center gap-2 text-[#7A6B5A] hover:text-[#2C2420] font-sans-elegant text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Volver al panel</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-8">
          Pedidos de Clientes
        </h1>

        <div className="space-y-6">
          {sellerOrders
            .sort(
              (a, b) =>
                new Date(b.created_at ?? 0).getTime() -
                new Date(a.created_at ?? 0).getTime(),
            )
            .map((order) => (
              <div
                key={String(order.id)}
                className="bg-white border border-[#E0D6CC]"
              >
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
                          {formatDate(order.created_at as string, true)}
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
                    <Link to={`/seller/orders/${order.id}`}>
                      <button className="px-6 py-3 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-300">
                        Ver Detalles
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SellerOrderHistory;
