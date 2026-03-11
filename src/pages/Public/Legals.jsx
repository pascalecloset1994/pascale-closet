import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export function LegalPage() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(() => {
        const h = (location.hash || '').replace('#', '').toLowerCase();
        return ['privacy', 'terms', 'cookies'].includes(h) ? h : 'privacy';
    });

    useEffect(() => {
        const h = (location.hash || '').replace('#', '').toLowerCase();
        if (!h) return;
        if (['privacy', 'terms', 'cookies'].includes(h)) {
            setActiveTab(h);
        }
    }, [location.hash]);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative bg-card border-b border-border py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-muted-foreground font-sans-elegant text-xs tracking-[0.3em] uppercase mb-4">
                        Información Legal
                    </p>
                    <h1 className="text-3xl md:text-4xl font-sans-elegant uppercase tracking-wider text-foreground mb-6">
                        Centro Legal
                    </h1>
                    <div className="w-16 h-[1px] bg-foreground mx-auto mb-6"></div>
                    <p className="text-sm text-muted-foreground font-sans-elegant font-light max-w-2xl mx-auto">
                        Políticas, términos y condiciones de Pascale Closet
                    </p>
                </div>
            </section>

            {/* Breadcrumb */}
            <nav className="max-w-7xl mx-auto px-4 py-6 text-xs font-sans-elegant uppercase tracking-wider">
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Inicio</Link>
                <span className="mx-3 text-border">/</span>
                <span className="text-foreground">Legal</span>
            </nav>

            {/* Tabs Navigation */}
            <section className="bg-card border-b border-border sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex gap-0 overflow-x-auto">
                        <button
                            onClick={() => {
                                setActiveTab('privacy');
                                window.history.replaceState(null, '', `${location.pathname}#privacy`);
                            }}
                            className={`py-4 px-6 font-sans-elegant text-xs tracking-wider uppercase border-b-2 transition whitespace-nowrap ${
                                activeTab === 'privacy'
                                    ? 'border-foreground text-foreground'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Privacidad
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('terms');
                                window.history.replaceState(null, '', `${location.pathname}#terms`);
                            }}
                            className={`py-4 px-6 font-sans-elegant text-xs tracking-wider uppercase border-b-2 transition whitespace-nowrap ${
                                activeTab === 'terms'
                                    ? 'border-foreground text-foreground'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Términos de Uso
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('cookies');
                                window.history.replaceState(null, '', `${location.pathname}#cookies`);
                            }}
                            className={`py-4 px-6 font-sans-elegant text-xs tracking-wider uppercase border-b-2 transition whitespace-nowrap ${
                                activeTab === 'cookies'
                                    ? 'border-foreground text-foreground'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Cookies
                        </button>
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* POLÍTICA DE PRIVACIDAD */}
                {activeTab === 'privacy' && (
                    <div id="privacy" className="space-y-8">
                        <div className="bg-card border border-border p-8 md:p-10">
                            <p className="text-muted-foreground font-sans-elegant text-xs tracking-[0.3em] uppercase mb-4">
                                Protección de Datos
                            </p>
                            <h2 className="text-2xl font-sans-elegant uppercase tracking-wider text-foreground mb-4">
                                Política de Privacidad
                            </h2>
                            <p className="text-sm text-muted-foreground font-sans-elegant mb-8">
                                Última actualización: Diciembre 2025
                            </p>

                            <div className="space-y-8">
                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        1. Introducción
                                    </h3>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed mb-4">
                                        En Pascale Closet protegemos tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos tu información cuando visitas nuestro sitio web.
                                    </p>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed">
                                        Te recomendamos que leas esta Política de Privacidad detenidamente. Si tienes preguntas o inquietudes sobre nuestras prácticas de privacidad, contacta con nosotros.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        2. Información que Recopilamos
                                    </h3>
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-sans-elegant font-medium text-foreground mb-3 text-sm">
                                                Información que Proporcionas Voluntariamente:
                                            </h4>
                                            <ul className="space-y-2 text-muted-foreground font-sans-elegant">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-foreground">•</span>
                                                    <span>Nombre, apellido, email y contraseña</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-foreground">•</span>
                                                    <span>Dirección de envío y de facturación</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-foreground">•</span>
                                                    <span>Información de pago y datos bancarios</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-foreground">•</span>
                                                    <span>Número de teléfono</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-foreground">•</span>
                                                    <span>Información del perfil (foto, descripción)</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-sans-elegant font-medium text-foreground mb-3 text-sm">
                                                Información Recopilada Automáticamente:
                                            </h4>
                                            <ul className="space-y-2 text-muted-foreground font-sans-elegant">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-foreground">•</span>
                                                    <span>Dirección IP y ubicación geográfica</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-foreground">•</span>
                                                    <span>Tipo de navegador y dispositivo</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-foreground">•</span>
                                                    <span>Páginas visitadas y tiempo de permanencia</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-foreground">•</span>
                                                    <span>Datos de cookies y tecnologías similares</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        3. Cómo Usamos tu Información
                                    </h3>
                                    <ul className="space-y-2 text-muted-foreground font-sans-elegant">
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Procesar transacciones y enviar confirmaciones</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Verificar tu identidad y prevenir fraude</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Mejorar y personalizar tu experiencia</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Enviar comunicaciones de marketing (si consientes)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Cumplir con obligaciones legales</span>
                                        </li>
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        4. Protección de Datos
                                    </h3>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed mb-4">
                                        Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tu información personal contra acceso no autorizado, alteración y destrucción.
                                    </p>
                                    <div className="bg-secondary border border-border p-5">
                                        <p className="font-sans-elegant font-medium text-foreground mb-3">✓ Medidas de Seguridad:</p>
                                        <ul className="space-y-2 text-muted-foreground font-sans-elegant text-sm">
                                            <li>• Encriptación SSL de datos en tránsito</li>
                                            <li>• Contraseñas encriptadas en bases de datos</li>
                                            <li>• Autenticación de dos factores disponible</li>
                                            <li>• Firewalls y sistemas de detección de intrusiones</li>
                                        </ul>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        5. Derechos del Usuario
                                    </h3>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed mb-4">Tienes derecho a:</p>
                                    <ul className="space-y-2 text-muted-foreground font-sans-elegant">
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Acceder a tu información personal</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Corregir información inexacta</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Solicitar la eliminación de tus datos</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Revocar consentimientos previos</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Exportar tus datos en formato legible</span>
                                        </li>
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        6. Contacto
                                    </h3>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed mb-4">
                                        Para ejercer tus derechos o si tienes preguntas sobre esta política, contacta con nosotros:
                                    </p>
                                    <div className="bg-secondary border border-border p-5">
                                        <p className="font-sans-elegant font-medium text-foreground">Pascale Closet</p>
                                        <p className="text-muted-foreground font-sans-elegant text-sm mt-1">Email: privacy@pascalecloset.com</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                )}

                {/* TÉRMINOS DE USO */}
                {activeTab === 'terms' && (
                    <div id="terms" className="space-y-8">
                        <div className="bg-card border border-border p-8 md:p-10">
                            <p className="text-muted-foreground font-sans-elegant text-xs tracking-[0.3em] uppercase mb-4">
                                Condiciones
                            </p>
                            <h2 className="text-2xl font-sans-elegant uppercase tracking-wider text-foreground mb-4">
                                Términos de Uso
                            </h2>
                            <p className="text-sm text-muted-foreground font-sans-elegant mb-8">
                                Última actualización: Diciembre 2025
                            </p>

                            <div className="space-y-8">
                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        1. Aceptación de Términos
                                    </h3>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed">
                                        Al acceder y utilizar Pascale Closet, aceptas estar vinculado por estos Términos de Uso. Si no estás de acuerdo con alguna parte, no debes usar la plataforma.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        2. Derechos de Uso
                                    </h3>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed mb-4">
                                        Te otorgamos una licencia limitada, no exclusiva e intransferible para:
                                    </p>
                                    <ul className="space-y-2 text-muted-foreground font-sans-elegant mb-4">
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">✓</span>
                                            <span>Acceder y usar la plataforma con fines legales</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">✓</span>
                                            <span>Comprar y vender productos de acuerdo con estos términos</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">✓</span>
                                            <span>Crear contenido relacionado con tus transacciones</span>
                                        </li>
                                    </ul>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed mb-4">No puedes:</p>
                                    <ul className="space-y-2 text-muted-foreground font-sans-elegant">
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">✕</span>
                                            <span>Reproducir o distribuir contenido sin autorización</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">✕</span>
                                            <span>Utilizar la plataforma para actividades ilegales</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">✕</span>
                                            <span>Interferir con la funcionalidad del sitio</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">✕</span>
                                            <span>Crear cuentas falsas o engañosas</span>
                                        </li>
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        3. Responsabilidades del Usuario
                                    </h3>
                                    <div className="bg-secondary border border-border p-5 space-y-4">
                                        <div>
                                            <p className="font-sans-elegant font-medium text-foreground mb-2">Como Compradora:</p>
                                            <ul className="space-y-1 text-muted-foreground font-sans-elegant text-sm">
                                                <li>• Proporcionar información precisa de envío</li>
                                                <li>• Pagar el precio acordado</li>
                                                <li>• Reportar problemas dentro de 30 días</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-sans-elegant font-medium text-foreground mb-2">Como Vendedora:</p>
                                            <ul className="space-y-1 text-muted-foreground font-sans-elegant text-sm">
                                                <li>• Vender solo productos auténticos y legales</li>
                                                <li>• Describir productos con precisión</li>
                                                <li>• Enviar productos dentro del plazo acordado</li>
                                                <li>• Aceptar devoluciones según política</li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        4. Prohibiciones
                                    </h3>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed mb-4">Está prohibido:</p>
                                    <ul className="space-y-2 text-muted-foreground font-sans-elegant">
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Publicar productos falsificados o ilegales</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Realizar actividades fraudulentas o engañosas</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Acosar, intimidar o discriminar a otros usuarios</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Publicar contenido ofensivo</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Violar derechos de propiedad intelectual</span>
                                        </li>
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        5. Resolución de Disputas
                                    </h3>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed mb-4">
                                        En caso de disputa entre compradora y vendedora, Pascale Closet proporcionará mediación neutral. Ambas partes deben cooperar en el proceso.
                                    </p>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed">
                                        Si no se resuelve mediante mediación, las disputas se resolverán conforme a las leyes de Argentina.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        6. Cambios en los Términos
                                    </h3>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed">
                                        Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigencia cuando se publiquen en el sitio. Te notificaremos por email cuando los cambios sean significativos.
                                    </p>
                                </section>
                            </div>
                        </div>
                    </div>
                )}

                {/* POLÍTICA DE COOKIES */}
                {activeTab === 'cookies' && (
                    <div id="cookies" className="space-y-8">
                        <div className="bg-card border border-border p-8 md:p-10">
                            <p className="text-muted-foreground font-sans-elegant text-xs tracking-[0.3em] uppercase mb-4">
                                Tecnologías
                            </p>
                            <h2 className="text-2xl font-sans-elegant uppercase tracking-wider text-foreground mb-4">
                                Política de Cookies
                            </h2>
                            <p className="text-sm text-muted-foreground font-sans-elegant mb-8">
                                Última actualización: Diciembre 2025
                            </p>

                            <div className="space-y-8">
                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        1. ¿Qué son las Cookies?
                                    </h3>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed">
                                        Las cookies son pequeños archivos de texto que se guardan en tu navegador cuando visitas nuestro sitio. Se utilizan para recordar información sobre tu visita y mejorar tu experiencia.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        2. Tipos de Cookies que Usamos
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="border-l-2 border-foreground pl-4 py-2">
                                            <h4 className="font-sans-elegant font-medium text-foreground mb-1">Cookies Esenciales</h4>
                                            <p className="text-muted-foreground font-sans-elegant text-sm">Necesarias para el funcionamiento básico del sitio (autenticación, seguridad).</p>
                                            <p className="text-xs text-muted-foreground font-sans-elegant mt-1">No se pueden desactivar en nuestros sistemas.</p>
                                        </div>
                                        <div className="border-l-2 border-muted-foreground pl-4 py-2">
                                            <h4 className="font-sans-elegant font-medium text-foreground mb-1">Cookies de Rendimiento</h4>
                                            <p className="text-muted-foreground font-sans-elegant text-sm">Recopilan información sobre cómo usas el sitio (páginas visitadas, errores).</p>
                                            <p className="text-xs text-muted-foreground font-sans-elegant mt-1">Nos ayudan a mejorar la plataforma.</p>
                                        </div>
                                        <div className="border-l-2 border-border pl-4 py-2">
                                            <h4 className="font-sans-elegant font-medium text-foreground mb-1">Cookies de Funcionalidad</h4>
                                            <p className="text-muted-foreground font-sans-elegant text-sm">Recuerdan tus preferencias y personalizaciones.</p>
                                            <p className="text-xs text-muted-foreground font-sans-elegant mt-1">Ejemplo: idioma preferido, modo oscuro.</p>
                                        </div>
                                        <div className="border-l-2 border-accent pl-4 py-2">
                                            <h4 className="font-sans-elegant font-medium text-foreground mb-1">Cookies de Marketing</h4>
                                            <p className="text-muted-foreground font-sans-elegant text-sm">Rastrean tu actividad para mostrar anuncios relevantes.</p>
                                            <p className="text-xs text-muted-foreground font-sans-elegant mt-1">Se utilizan servicios de terceros como Google Analytics.</p>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        3. Consentimiento y Control
                                    </h3>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed mb-4">
                                        Al visitar nuestro sitio por primera vez, mostraremos un banner de consentimiento. Puedes:
                                    </p>
                                    <ul className="space-y-2 text-muted-foreground font-sans-elegant">
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Aceptar todas las cookies</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Rechazar cookies no esenciales</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Personalizar tus preferencias</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-foreground">•</span>
                                            <span>Revocar consentimiento en cualquier momento</span>
                                        </li>
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-xs font-sans-elegant font-medium text-foreground mb-4 uppercase tracking-wider">
                                        4. Cookies de Terceros
                                    </h3>
                                    <p className="text-muted-foreground font-sans-elegant leading-relaxed mb-4">
                                        Utilizamos servicios de terceros que pueden establecer cookies:
                                    </p>
                                    <div className="bg-secondary border border-border p-5 space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-border">
                                            <span className="font-sans-elegant font-medium text-foreground">Google Analytics</span>
                                            <span className="text-muted-foreground font-sans-elegant text-xs">Análisis de tráfico</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="font-sans-elegant font-medium text-foreground">Mercado Pago</span>
                                            <span className="text-muted-foreground font-sans-elegant text-xs">Procesamiento de pagos</span>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                )}

                {/* Final CTA */}
                <div className="mt-12 bg-[var(--brand-dark)] p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-sans-elegant uppercase tracking-wider text-white mb-2">
                                ¿Necesitas ayuda adicional?
                            </h3>
                            <p className="text-white/60 font-sans-elegant text-sm">
                                Contacta con nuestro equipo para consultas específicas
                            </p>
                        </div>
                        <div className="flex gap-4 flex-wrap justify-center">
                            <Link 
                                to="/help" 
                                className="px-6 py-3 bg-card text-[var(--brand-dark)] font-sans-elegant text-xs tracking-wider uppercase hover:bg-secondary transition-all duration-200"
                            >
                                Centro de Ayuda
                            </Link>
                            <a 
                                href="mailto:legal@pascalecloset.com" 
                                className="px-6 py-3 border border-white text-white font-sans-elegant text-xs tracking-wider uppercase hover:bg-card hover:text-[var(--brand-dark)] transition-all duration-200"
                            >
                                Contactar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LegalPage;
