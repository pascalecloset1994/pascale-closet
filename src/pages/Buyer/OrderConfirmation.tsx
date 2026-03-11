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
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-card border border-border p-12 text-center">
          {/* Success Icon */}
          <div className="text-6xl mb-6">✨</div>

          <h1 className="text-2xl font-sans-elegant uppercase tracking-wider text-foreground mb-4">
            ¡Pedido Confirmado!
          </h1>

          <p className="text-sm text-muted-foreground font-sans-elegant mb-8">
            Gracias por tu compra en Pascale Closet
          </p>

          {/* Order Details */}
          <div className="bg-secondary border border-border p-8 mb-8 text-left">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-muted-foreground font-sans-elegant uppercase tracking-wide">
                  Número de Pedido
                </p>
                <p className="text-xl font-sans-elegant text-foreground mt-2">
                  "N/A"
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-sans-elegant uppercase tracking-wide">
                  Total Pagado
                </p>
                <p className="text-xl font-sans-elegant text-foreground mt-2">
                  N/A
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-secondary border border-border p-8 mb-8 text-left">
            <h3 className="font-sans-elegant text-sm uppercase tracking-wide text-foreground mb-4">
              📦 Próximos Pasos
            </h3>
            <ul className="text-sm text-muted-foreground font-sans-elegant space-y-3 leading-relaxed">
              <li>✓ Recibirás un email de confirmación en breve</li>
              <li>✓ El vendedor procesará tu pedido en 1-2 días hábiles</li>
              <li>✓ Te notificaremos cuando tu pedido sea enviado</li>
              <li>✓ Tiempo estimado de entrega: 3-5 días hábiles</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/buyer/orders" className="flex-1">
              <button className="w-full py-4 bg-foreground text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-all duration-300">
                Ver Mis Pedidos
              </button>
            </Link>
            <Link to="/" className="flex-1">
              <button className="w-full py-4 border border-foreground text-foreground font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all duration-300">
                Seguir Comprando
              </button>
            </Link>
          </div>

          {/* Support */}
          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground font-sans-elegant">
              ¿Necesitas ayuda?{" "}
              <Link to="/contact" className="text-foreground hover:underline">
                Contáctanos
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
