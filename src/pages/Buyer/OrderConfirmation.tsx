import { Link, useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../contexts/OrderContext";
import { Loader } from "../../components/common/Loader";

export const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { getOrderById, isLoading } = useOrder();
  const order = getOrderById(orderId as string);
  const navigate = useNavigate();

  if (!order) {
    navigate("/login");
  }
  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white border border-[#E0D6CC] p-12 text-center">
          {/* Success Icon */}
          <div className="text-6xl mb-6">✨</div>

          <h1 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-4">
            ¡Pedido Confirmado!
          </h1>

          <p className="text-sm text-[#7A6B5A] font-sans-elegant mb-8">
            Gracias por tu compra en Pascale Closet
          </p>

          {/* Order Details */}
          <div className="bg-[#F5F0EB] border border-[#E0D6CC] p-8 mb-8 text-left">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-[#7A6B5A] font-sans-elegant uppercase tracking-wide">
                  Número de Pedido
                </p>
                <p className="text-xl font-sans-elegant text-[#2C2420] mt-2">
                  "N/A"
                </p>
              </div>
              <div>
                <p className="text-xs text-[#7A6B5A] font-sans-elegant uppercase tracking-wide">
                  Total Pagado
                </p>
                <p className="text-xl font-sans-elegant text-[#2C2420] mt-2">
                  N/A
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-[#F5F0EB] border border-[#E0D6CC] p-8 mb-8 text-left">
            <h3 className="font-sans-elegant text-sm uppercase tracking-wide text-[#2C2420] mb-4">
              📦 Próximos Pasos
            </h3>
            <ul className="text-sm text-[#7A6B5A] font-sans-elegant space-y-3 leading-relaxed">
              <li>✓ Recibirás un email de confirmación en breve</li>
              <li>✓ El vendedor procesará tu pedido en 1-2 días hábiles</li>
              <li>✓ Te notificaremos cuando tu pedido sea enviado</li>
              <li>✓ Tiempo estimado de entrega: 3-5 días hábiles</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/buyer/orders" className="flex-1">
              <button className="w-full py-4 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#333333] transition-all duration-300">
                Ver Mis Pedidos
              </button>
            </Link>
            <Link to="/" className="flex-1">
              <button className="w-full py-4 border border-[#2C2420] text-[#2C2420] font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#2C2420] hover:text-white transition-all duration-300">
                Seguir Comprando
              </button>
            </Link>
          </div>

          {/* Support */}
          <div className="mt-10 pt-8 border-t border-[#E0D6CC]">
            <p className="text-xs text-[#7A6B5A] font-sans-elegant">
              ¿Necesitas ayuda?{" "}
              <Link to="/contact" className="text-[#2C2420] hover:underline">
                Contáctanos
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
