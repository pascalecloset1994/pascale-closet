import { Link, useSearchParams } from "react-router-dom";

export const PaymentFailure = () => {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");

    return (
        <div className="min-h-screen bg-background py-16">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-card border border-border p-12 text-center">
                    {/* Error Icon */}
                    <div className="text-6xl mb-6">✕</div>

                    <h1 className="text-2xl font-sans-elegant uppercase tracking-wider text-foreground mb-4">
                        Pago Rechazado
                    </h1>

                    <p className="text-sm text-muted-foreground font-sans-elegant mb-8">
                        Lamentablemente no pudimos procesar tu pago. No se realizó ningún
                        cargo.
                    </p>

                    {/* Info */}
                    <div className="bg-secondary border border-border p-8 mb-8 text-left">
                        <h3 className="font-sans-elegant text-sm uppercase tracking-wide text-foreground mb-4">
                            ¿Qué pudo haber pasado?
                        </h3>
                        <ul className="text-sm text-muted-foreground font-sans-elegant space-y-3 leading-relaxed">
                            <li>• Fondos insuficientes en la tarjeta o cuenta</li>
                            <li>• Datos de la tarjeta ingresados incorrectamente</li>
                            <li>• Tu banco rechazó la transacción</li>
                            <li>• El medio de pago seleccionado no está habilitado</li>
                        </ul>

                        {paymentId && (
                            <p className="text-xs text-muted-foreground font-sans-elegant mt-6">
                                ID de referencia: {paymentId} · Estado: {status}
                            </p>
                        )}
                    </div>

                    {/* Recommendations */}
                    <div className="bg-secondary border border-border p-8 mb-8 text-left">
                        <h3 className="font-sans-elegant text-sm uppercase tracking-wide text-foreground mb-4">
                            💡 Te recomendamos
                        </h3>
                        <ul className="text-sm text-muted-foreground font-sans-elegant space-y-3 leading-relaxed">
                            <li>✓ Verificar los datos de tu medio de pago</li>
                            <li>✓ Intentar con otro medio de pago</li>
                            <li>✓ Contactar a tu banco si el problema persiste</li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/cart" className="flex-1">
                            <button className="w-full py-4 bg-foreground text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-all duration-300">
                                Reintentar Compra
                            </button>
                        </Link>
                        <Link to="/" className="flex-1">
                            <button className="w-full py-4 border border-foreground text-foreground font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all duration-300">
                                Volver al Inicio
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
