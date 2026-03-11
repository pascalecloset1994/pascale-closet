import { Link, useSearchParams } from "react-router-dom";

export const PaymentPending = () => {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get("payment_id");

    return (
        <div className="min-h-screen bg-background py-16">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-card border border-border p-12 text-center">
                    {/* Pending Icon */}
                    <div className="text-6xl mb-6">⏳</div>

                    <h1 className="text-2xl font-sans-elegant uppercase tracking-wider text-foreground mb-4">
                        Pago en Proceso
                    </h1>

                    <p className="text-sm text-muted-foreground font-sans-elegant mb-8">
                        Tu pago está siendo procesado. Te notificaremos por email cuando se
                        confirme.
                    </p>

                    {/* Info */}
                    <div className="bg-secondary border border-border p-8 mb-8 text-left">
                        <h3 className="font-sans-elegant text-sm uppercase tracking-wide text-foreground mb-4">
                            📋 Información importante
                        </h3>
                        <ul className="text-sm text-muted-foreground font-sans-elegant space-y-3 leading-relaxed">
                            <li>
                                ✓ Tu pedido quedó registrado y se confirmará una vez acreditado
                                el pago
                            </li>
                            <li>
                                ✓ Si elegiste pagar en efectivo (Rapipago, Pago Fácil), recordá
                                acercarte a un punto de pago con el comprobante
                            </li>
                            <li>
                                ✓ Recibirás un email de confirmación cuando el pago se acredite
                            </li>
                            <li>✓ El plazo de acreditación puede variar según el medio de pago</li>
                        </ul>

                        {paymentId && (
                            <p className="text-xs text-muted-foreground font-sans-elegant mt-6">
                                ID de referencia: {paymentId}
                            </p>
                        )}
                    </div>

                    {/* Timeline */}
                    <div className="bg-secondary border border-border p-8 mb-8 text-left">
                        <h3 className="font-sans-elegant text-sm uppercase tracking-wide text-foreground mb-4">
                            ⏱️ Plazos estimados de acreditación
                        </h3>
                        <ul className="text-sm text-muted-foreground font-sans-elegant space-y-3 leading-relaxed">
                            <li>
                                <strong>Rapipago / Pago Fácil:</strong> 1-2 días hábiles
                            </li>
                            <li>
                                <strong>Transferencia bancaria:</strong> 1-2 días hábiles
                            </li>
                            <li>
                                <strong>Dinero en Mercado Pago:</strong> Inmediato
                            </li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/buyer/orders" className="flex-1">
                            <button className="w-full py-4 bg-foreground text-background font-sans-elegant text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-all duration-300">
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
