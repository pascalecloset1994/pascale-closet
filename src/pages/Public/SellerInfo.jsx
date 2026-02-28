import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Store,
  TrendingUp,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Package,
  CreditCard,
  BarChart3,
  HelpCircle,
  BookOpen,
  Video,
  FileText,
  Sparkles,
  Heart,
  Star,
  ChevronDown,
  ChevronUp,
  Camera,
  Tag,
  Truck,
  Award,
} from "lucide-react";

const SellerInfo = () => {
  const [activeTab, setActiveTab] = useState("start");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const tabs = [
    { id: "start", label: "Empieza a Vender", icon: Store },
    { id: "fees", label: "Tarifas de Venta", icon: CreditCard },
    { id: "resources", label: "Recursos para Vendedoras", icon: BookOpen },
  ];

  const steps = [
    {
      number: "01",
      title: "Crea tu cuenta de vendedora",
      description:
        "Regístrate con tus datos básicos y completa el proceso de verificación para comenzar a vender tus prendas.",
      icon: Users,
    },
    {
      number: "02",
      title: "Configura tu boutique",
      description:
        "Personaliza tu perfil de vendedora, añade tu historia y define tus políticas de envío y devolución.",
      icon: Store,
    },
    {
      number: "03",
      title: "Publica tus productos",
      description:
        "Sube fotografías elegantes, escribe descripciones detalladas y establece tus precios competitivos.",
      icon: Package,
    },
  ];

  const requirements = [
    "Ser mayor de 18 años",
    "Documento de identidad válido",
    "Cuenta bancaria para recibir pagos",
    "Compromiso con la calidad y autenticidad",
    "Productos en excelente estado",
    "Fotografías profesionales de las prendas",
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Alcance Global",
      description:
        "Llega a clientas de todo el país que buscan prendas únicas y de calidad.",
    },
    {
      icon: Shield,
      title: "Transacciones Seguras",
      description:
        "Sistema de pagos protegido que garantiza la seguridad de cada operación.",
    },
    {
      icon: Users,
      title: "Comunidad Exclusiva",
      description:
        "Forma parte de una comunidad de vendedoras apasionadas por la moda.",
    },
    {
      icon: BarChart3,
      title: "Panel de Control",
      description:
        "Herramientas intuitivas para gestionar tu inventario y analizar tus ventas.",
    },
  ];

  const feeStructure = [
    {
      category: "Prendas de Temporada",
      commission: "12%",
      description: "Ropa actual y de últimas colecciones",
    },
    {
      category: "Prendas Premium",
      commission: "10%",
      description: "Marcas de diseñador y alta costura",
    },
    {
      category: "Accesorios",
      commission: "15%",
      description: "Bolsos, joyería y complementos",
    },
    {
      category: "Vintage & Colección",
      commission: "8%",
      description: "Piezas vintage y de coleccionista",
    },
  ];

  const detailedFees = [
    {
      concept: "Comisión por venta",
      amount: "8% - 15%",
      description: "Varía según la categoría del producto",
    },
    {
      concept: "Procesamiento de pago",
      amount: "2.9% + $0.30",
      description: "Por cada transacción completada",
    },
    {
      concept: "Listado de productos",
      amount: "Gratis",
      description: "Sin límite de publicaciones",
    },
    {
      concept: "Retiro de fondos",
      amount: "Gratis",
      description: "Transferencias sin costo adicional",
    },
    {
      concept: "Promoción destacada",
      amount: "Desde $5",
      description: "Opcional para mayor visibilidad",
    },
  ];

  const resources = [
    {
      icon: BookOpen,
      title: "Guía de Inicio",
      description: "Manual completo para comenzar a vender con éxito.",
      link: "#",
    },
    {
      icon: Camera,
      title: "Fotografía de Producto",
      description: "Consejos para capturar tus prendas de manera profesional.",
      link: "#",
    },
    {
      icon: Tag,
      title: "Estrategias de Precio",
      description: "Aprende a fijar precios competitivos y rentables.",
      link: "#",
    },
    {
      icon: Truck,
      title: "Guía de Envíos",
      description: "Todo sobre embalaje y opciones de envío.",
      link: "#",
    },
  ];

  const faqs = [
    {
      question: "¿Cuánto tiempo tarda en activarse mi cuenta de vendedora?",
      answer:
        "El proceso de verificación suele completarse en 24-48 horas hábiles. Te notificaremos por correo electrónico una vez que tu cuenta esté activa y lista para publicar.",
    },
    {
      question: "¿Cómo recibo mis pagos?",
      answer:
        "Los pagos se procesan semanalmente y se transfieren directamente a tu cuenta bancaria registrada. El tiempo de acreditación depende de tu banco, generalmente entre 1-3 días hábiles.",
    },
    {
      question: "¿Qué tipo de productos puedo vender?",
      answer:
        "Puedes vender ropa femenina, accesorios, calzado y joyería. Todos los artículos deben estar en excelente estado y ser auténticos. No permitimos réplicas ni productos dañados.",
    },
    {
      question: "¿Cómo funciona el proceso de devolución?",
      answer:
        "Las clientas tienen 14 días para solicitar una devolución. Como vendedora, puedes establecer tus propias políticas adicionales. Pascale Closet media en caso de disputas.",
    },
    {
      question: "¿Puedo vender desde cualquier parte del país?",
      answer:
        "Sí, aceptamos vendedoras de todo el territorio nacional. Solo necesitas tener acceso a servicios de paquetería para realizar los envíos.",
    },
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#F5F0EB] to-white py-20 lg:py-28">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#E0D6CC] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#C9B8A8]/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#2C2420]" />
              <span className="text-sm font-sans-elegant text-[#7A6B5A] tracking-wide uppercase">
                Únete a nuestra comunidad de vendedoras
              </span>
            </div>
            
            <h1 className="font-sans-elegant text-4xl md:text-5xl lg:text-6xl text-[#2C2420] font-light tracking-tight mb-6">
              Vende en{" "}
              <span className="text-[#C9B8A8]">Pascale Closet</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#7A6B5A] font-sans-elegant leading-relaxed mb-10 max-w-2xl mx-auto">
              Transforma tu pasión por la moda en una oportunidad. 
              Llega a miles de clientas que buscan prendas únicas y de calidad.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-[#2C2420] text-white px-8 py-4 font-sans-elegant text-xs uppercase tracking-widest hover:bg-[#333333] transition-all duration-300 group"
              >
                <span>Comenzar Ahora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#learn-more"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#2C2420] px-8 py-4 font-sans-elegant text-xs uppercase tracking-widest border border-[#E0D6CC] hover:border-[#2C2420] transition-all duration-300"
              >
                <span>Saber Más</span>
              </a>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <p className="font-sans-elegant text-3xl font-light text-[#2C2420]">+2,500</p>
                <p className="text-xs text-[#7A6B5A] font-sans-elegant uppercase tracking-wide">Vendedoras Activas</p>
              </div>
              <div className="text-center">
                <p className="font-sans-elegant text-3xl font-light text-[#2C2420]">98%</p>
                <p className="text-xs text-[#7A6B5A] font-sans-elegant uppercase tracking-wide">Satisfacción</p>
              </div>
              <div className="text-center">
                <p className="font-sans-elegant text-3xl font-light text-[#2C2420]">+50k</p>
                <p className="text-xs text-[#7A6B5A] font-sans-elegant uppercase tracking-wide">Ventas Mensuales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section id="learn-more" className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#E0D6CC] z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex gap-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-sans-elegant text-xs uppercase tracking-widest transition-all duration-300 border-b-2 ${
                      activeTab === tab.id
                        ? "text-[#2C2420] border-[#2C2420]"
                        : "text-[#7A6B5A] border-transparent hover:text-[#2C2420]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Start Selling Tab */}
        {activeTab === "start" && (
          <div className="space-y-20">
            {/* Steps Section */}
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-sans-elegant text-3xl md:text-4xl text-[#2C2420] font-light tracking-tight mb-4">
                  Comienza en Tres Simples Pasos
                </h2>
                <p className="text-[#7A6B5A] font-sans-elegant max-w-2xl mx-auto">
                  El proceso para convertirte en vendedora es rápido y sencillo. 
                  Te guiamos en cada etapa.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={index}
                      className="relative bg-white p-8 border border-[#E0D6CC] hover:border-[#2C2420] transition-all duration-300 group"
                    >
                      <div className="absolute -top-4 left-8">
                        <span className="font-sans-elegant text-5xl font-light text-[#E0D6CC] group-hover:text-[#C9B8A8] transition-colors">
                          {step.number}
                        </span>
                      </div>
                      <div className="pt-8">
                        <div className="w-12 h-12 bg-[#F5F0EB] flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-[#2C2420]" />
                        </div>
                        <h3 className="font-sans-elegant text-xl text-[#2C2420] font-medium mb-3">
                          {step.title}
                        </h3>
                        <p className="text-[#7A6B5A] font-sans-elegant text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Requirements Section */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-[#E0D6CC] p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="font-sans-elegant text-2xl md:text-3xl text-[#2C2420] font-light tracking-tight mb-3">
                    Requisitos para Vender
                  </h2>
                  <p className="text-[#7A6B5A] font-sans-elegant">
                    Asegúrate de cumplir con estos requisitos básicos
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {requirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-[#F5F0EB] border border-[#E0D6CC]"
                    >
                      <CheckCircle className="w-5 h-5 text-[#6B8E6B] flex-shrink-0" />
                      <span className="text-[#2C2420] font-sans-elegant text-sm">
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-sans-elegant text-3xl md:text-4xl text-[#2C2420] font-light tracking-tight mb-4">
                  Beneficios de Vender con Nosotras
                </h2>
                <p className="text-[#7A6B5A] font-sans-elegant max-w-2xl mx-auto">
                  Descubre todas las ventajas de formar parte de nuestra comunidad
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white p-6 border border-[#E0D6CC] hover:border-[#2C2420] transition-all duration-300 text-center group"
                    >
                      <div className="w-14 h-14 bg-[#F5F0EB] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#E0D6CC] transition-colors">
                        <Icon className="w-7 h-7 text-[#2C2420]" />
                      </div>
                      <h3 className="font-sans-elegant text-lg text-[#2C2420] font-medium mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-[#7A6B5A] font-sans-elegant text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Fees Tab */}
        {activeTab === "fees" && (
          <div className="space-y-16">
            {/* Fee Structure Cards */}
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-sans-elegant text-3xl md:text-4xl text-[#2C2420] font-light tracking-tight mb-4">
                  Comisiones por Categoría
                </h2>
                <p className="text-[#7A6B5A] font-sans-elegant max-w-2xl mx-auto">
                  Tarifas transparentes y competitivas. Solo cobramos cuando vendes.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {feeStructure.map((fee, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 border border-[#E0D6CC] hover:border-[#2C2420] transition-all duration-300 group"
                  >
                    <div className="text-center">
                      <p className="font-sans-elegant text-4xl font-light text-[#2C2420] mb-2">
                        {fee.commission}
                      </p>
                      <h3 className="font-sans-elegant text-lg text-[#2C2420] font-medium mb-2">
                        {fee.category}
                      </h3>
                      <p className="text-[#7A6B5A] font-sans-elegant text-sm">
                        {fee.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Fees Table */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-[#E0D6CC] overflow-hidden">
                <div className="p-6 border-b border-[#E0D6CC] bg-[#F5F0EB]">
                  <h3 className="font-sans-elegant text-xl text-[#2C2420] font-medium">
                    Desglose de Tarifas
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E0D6CC]">
                        <th className="text-left p-4 font-sans-elegant text-xs text-[#7A6B5A] font-medium uppercase tracking-wide">
                          Concepto
                        </th>
                        <th className="text-left p-4 font-sans-elegant text-xs text-[#7A6B5A] font-medium uppercase tracking-wide">
                          Tarifa
                        </th>
                        <th className="text-left p-4 font-sans-elegant text-xs text-[#7A6B5A] font-medium uppercase tracking-wide hidden sm:table-cell">
                          Descripción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailedFees.map((fee, index) => (
                        <tr
                          key={index}
                          className="border-b border-[#E0D6CC] last:border-b-0 hover:bg-[#F5F0EB] transition-colors"
                        >
                          <td className="p-4 font-sans-elegant text-[#2C2420]">
                            {fee.concept}
                          </td>
                          <td className="p-4 font-sans-elegant font-medium text-[#2C2420]">
                            {fee.amount}
                          </td>
                          <td className="p-4 font-sans-elegant text-sm text-[#7A6B5A] hidden sm:table-cell">
                            {fee.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Calculator CTA */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-[#F5F0EB] p-8 md:p-12 text-center border border-[#E0D6CC]">
                <Award className="w-12 h-12 text-[#2C2420] mx-auto mb-4" />
                <h3 className="font-sans-elegant text-2xl text-[#2C2420] font-light tracking-tight mb-3">
                  Sin Costos Ocultos
                </h3>
                <p className="text-[#7A6B5A] font-sans-elegant mb-6 max-w-xl mx-auto">
                  Nuestra estructura de tarifas es completamente transparente. 
                  No hay cuotas mensuales ni costos por listar tus productos.
                </p>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-[#2C2420] text-white px-6 py-3 font-sans-elegant text-xs uppercase tracking-widest hover:bg-[#333333] transition-all duration-300"
                >
                  <span>Empieza a Vender Gratis</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <div className="space-y-16">
            {/* Resource Cards */}
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-sans-elegant text-3xl md:text-4xl text-[#2C2420] font-light tracking-tight mb-4">
                  Guías y Recursos
                </h2>
                <p className="text-[#7A6B5A] font-sans-elegant max-w-2xl mx-auto">
                  Todo lo que necesitas para tener éxito como vendedora
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <a
                      key={index}
                      href={resource.link}
                      className="flex items-start gap-4 bg-white p-6 border border-[#E0D6CC] hover:border-[#2C2420] transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-[#F5F0EB] flex items-center justify-center flex-shrink-0 group-hover:bg-[#E0D6CC] transition-colors">
                        <Icon className="w-6 h-6 text-[#2C2420]" />
                      </div>
                      <div>
                        <h3 className="font-sans-elegant text-lg text-[#2C2420] font-medium mb-1 group-hover:text-[#7A6B5A] transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-[#7A6B5A] font-sans-elegant text-sm">
                          {resource.description}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Learning Center */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white border border-[#E0D6CC] p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 text-[#2C2420] mb-4">
                      <Video className="w-5 h-5" />
                      <span className="font-sans-elegant text-xs uppercase tracking-widest">
                        Centro de Aprendizaje
                      </span>
                    </div>
                    <h3 className="font-sans-elegant text-2xl md:text-3xl text-[#2C2420] font-light tracking-tight mb-4">
                      Tutoriales en Video
                    </h3>
                    <p className="text-[#7A6B5A] font-sans-elegant mb-6 leading-relaxed">
                      Accede a nuestra biblioteca de videos tutoriales donde te enseñamos 
                      desde cómo fotografiar tus prendas hasta estrategias avanzadas de venta.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-[#6B8E6B]" />
                        <span className="font-sans-elegant text-sm text-[#2C2420]">
                          Más de 50 videos tutoriales
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-[#6B8E6B]" />
                        <span className="font-sans-elegant text-sm text-[#2C2420]">
                          Contenido actualizado mensualmente
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-[#6B8E6B]" />
                        <span className="font-sans-elegant text-sm text-[#2C2420]">
                          Webinars en vivo con expertas
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#F5F0EB] p-8 flex items-center justify-center border border-[#E0D6CC]">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E0D6CC]">
                        <Video className="w-10 h-10 text-[#2C2420]" />
                      </div>
                      <p className="font-sans-elegant text-lg text-[#2C2420] font-medium">
                        Próximamente
                      </p>
                      <p className="text-sm text-[#7A6B5A] font-sans-elegant">
                        Nuevos cursos cada semana
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-sans-elegant text-2xl md:text-3xl text-[#2C2420] font-light tracking-tight mb-3">
                  Preguntas Frecuentes
                </h2>
                <p className="text-[#7A6B5A] font-sans-elegant">
                  Resolvemos tus dudas más comunes
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[#E0D6CC] overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F5F0EB] transition-colors"
                    >
                      <span className="font-sans-elegant text-[#2C2420] pr-4">
                        {faq.question}
                      </span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-[#2C2420] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#7A6B5A] flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-5 pb-5">
                        <p className="text-[#7A6B5A] font-sans-elegant text-sm leading-relaxed border-t border-[#E0D6CC] pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Support CTA */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-[#E0D6CC] p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-[#F5F0EB] flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-8 h-8 text-[#2C2420]" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-sans-elegant text-xl text-[#2C2420] font-medium mb-2">
                    ¿Necesitas Ayuda Personalizada?
                  </h3>
                  <p className="text-[#7A6B5A] font-sans-elegant text-sm">
                    Nuestro equipo de soporte está disponible para resolver todas tus dudas.
                  </p>
                </div>
                <Link
                  to="/help#contacto"
                  className="inline-flex items-center gap-2 border border-[#2C2420] text-[#2C2420] px-6 py-3 font-sans-elegant text-xs uppercase tracking-widest hover:bg-[#2C2420] hover:text-white transition-all duration-300"
                >
                  Contactar Soporte
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Final CTA Section */}
      <section className="bg-[#2C2420] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-10 h-10 text-[#C9B8A8] mx-auto mb-6" />
            <h2 className="font-sans-elegant text-3xl md:text-4xl text-white font-light tracking-tight mb-4">
              ¿Lista para Comenzar?
            </h2>
            <p className="text-white/70 font-sans-elegant mb-8 leading-relaxed max-w-xl mx-auto">
              Únete a miles de vendedoras que ya están transformando su pasión 
              por la moda en un negocio exitoso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#2C2420] px-8 py-4 font-sans-elegant text-xs uppercase tracking-widest hover:bg-[#F5F0EB] transition-all duration-300 group"
              >
                <span>Crear Cuenta de Vendedora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/help"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 font-sans-elegant text-xs uppercase tracking-widest border border-white/30 hover:bg-white/10 transition-all duration-300"
              >
                <span>Más Información</span>
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span className="font-sans-elegant text-xs uppercase tracking-wide">Sin cuota mensual</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="font-sans-elegant text-xs uppercase tracking-wide">Pagos seguros</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="font-sans-elegant text-xs uppercase tracking-wide">Soporte dedicado</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellerInfo;
