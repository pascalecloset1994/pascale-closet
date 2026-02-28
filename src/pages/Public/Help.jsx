import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export const Help = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensaje enviado. Te contactaremos pronto.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative bg-white border-b border-[#E0D6CC] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#7A6B5A] font-sans-elegant text-xs tracking-[0.3em] uppercase mb-4">
            Soporte
          </p>
          <h1 className="text-3xl md:text-4xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-6">
            Centro de Ayuda
          </h1>
          <div className="w-16 h-[1px] bg-[#2C2420] mx-auto mb-6"></div>
          <p className="text-sm text-[#7A6B5A] font-sans-elegant font-light max-w-2xl mx-auto">
            Estamos aquí para ayudarte en lo que necesites
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 py-6 text-xs font-sans-elegant uppercase tracking-wider">
        <Link to="/" className="text-[#7A6B5A] hover:text-[#2C2420] transition-colors">Inicio</Link>
        <span className="mx-3 text-[#E0D6CC]">/</span>
        <span className="text-[#2C2420]">Ayuda</span>
      </nav>

      {/* Preguntas Frecuentes */}
      <section id="faq" className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-[#7A6B5A] font-sans-elegant text-xs tracking-[0.3em] uppercase mb-3">
            Resuelve tus dudas
          </p>
          <h2 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#2C2420]">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "¿Cómo compro un producto?",
              a: 'Busca el producto que te interesa, hacé clic en "Agregar al carrito", revisá tu pedido y procedé al pago. Es muy simple y seguro.',
            },
            {
              q: "¿Cómo sé si un producto es de calidad?",
              a: "Todas nuestras prendas pasan por un proceso de verificación. Las vendedoras certificadas tienen un distintivo especial y garantizamos la calidad.",
            },
            {
              q: "¿Cuánto tarda el envío?",
              a: "El tiempo de envío varía según la vendedora y tu ubicación. Generalmente entre 5 y 7 días hábiles para envíos nacionales.",
            },
            {
              q: "¿Puedo devolver un producto?",
              a: "Sí, tenés 30 días para devolver productos que no cumplan con la descripción o lleguen dañados. Consultá nuestra política de devoluciones.",
            },
            {
              q: "¿Cómo me convierto en vendedora?",
              a: "Registrate con una cuenta de vendedora, completá tu perfil, verificá tu identidad y comenzá a publicar tus prendas. ¡Es gratis empezar!",
            },
            {
              q: "¿Qué métodos de pago aceptan?",
              a: "Aceptamos tarjetas de crédito/débito, Mercado Pago, transferencias bancarias y otros métodos locales.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-[#E0D6CC] p-6 hover:shadow-md transition-all duration-300"
            >
              <h3 className="font-sans-elegant text-sm uppercase tracking-wider text-[#2C2420] mb-3">{faq.q}</h3>
              <p className="text-[#7A6B5A] font-sans-elegant leading-relaxed text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Información de Envío */}
      <section id="shipping" className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white border border-[#E0D6CC] p-8 md:p-12">
          <p className="text-[#7A6B5A] font-sans-elegant text-xs tracking-[0.3em] uppercase mb-4">
            Entregas
          </p>
          <h2 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-8">
            Información de Envío
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-sans-elegant font-medium text-[#2C2420] mb-4 tracking-wider uppercase text-xs">
                Tiempos de Entrega
              </h3>
              <table className="w-full border border-[#E0D6CC]">
                <thead className="bg-[#F5F0EB]">
                  <tr>
                    <th className="border border-[#E0D6CC] p-3 text-left font-sans-elegant text-xs uppercase tracking-wider text-[#2C2420]">Destino</th>
                    <th className="border border-[#E0D6CC] p-3 text-left font-sans-elegant text-xs uppercase tracking-wider text-[#2C2420]">Tiempo</th>
                  </tr>
                </thead>
                <tbody className="font-sans-elegant text-sm">
                  <tr>
                    <td className="border border-[#E0D6CC] p-3 text-[#7A6B5A]">Argentina</td>
                    <td className="border border-[#E0D6CC] p-3 text-[#2C2420] font-medium">5-7 días hábiles</td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0D6CC] p-3 text-[#7A6B5A]">Resto de LATAM</td>
                    <td className="border border-[#E0D6CC] p-3 text-[#2C2420] font-medium">10-15 días hábiles</td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0D6CC] p-3 text-[#7A6B5A]">Internacional</td>
                    <td className="border border-[#E0D6CC] p-3 text-[#2C2420] font-medium">15-30 días hábiles</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div>
              <h3 className="font-sans-elegant font-medium text-[#2C2420] mb-4 tracking-wider uppercase text-xs">
                Costos de Envío
              </h3>
              <div className="space-y-3">
                <div className="bg-[#F5F0EB] border border-[#E0D6CC] p-4">
                  <p className="font-sans-elegant font-medium text-[#2C2420] mb-1">✓ Envío Gratis</p>
                  <p className="text-sm text-[#7A6B5A] font-sans-elegant">
                    En compras superiores a $45.000 dentro de Argentina
                  </p>
                </div>
                <div className="border border-[#E0D6CC] p-4">
                  <p className="font-sans-elegant font-medium text-[#2C2420] mb-1">Envío Estándar</p>
                  <p className="text-sm text-[#7A6B5A] font-sans-elegant">
                    $5.000 - $15.000 según peso y destino
                  </p>
                </div>
                <div className="border border-[#E0D6CC] p-4">
                  <p className="font-sans-elegant font-medium text-[#2C2420] mb-1">Envío Express</p>
                  <p className="text-sm text-[#7A6B5A] font-sans-elegant">
                    $12.000 - $25.000 (1-2 días hábiles)
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-[#F5F0EB] border border-[#E0D6CC] p-4">
            <p className="text-sm text-[#7A6B5A] font-sans-elegant">
              <span className="text-[#2C2420] font-medium">Nota:</span> La vendedora es responsable del envío. Los tiempos pueden variar según disponibilidad.
            </p>
          </div>
        </div>
      </section>

      {/* Política de Devoluciones */}
      <section id="returns" className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white border border-[#E0D6CC] p-8 md:p-12">
          <p className="text-[#7A6B5A] font-sans-elegant text-xs tracking-[0.3em] uppercase mb-4">
            Garantías
          </p>
          <h2 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-8">
            Política de Devoluciones
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-sans-elegant font-medium text-[#2C2420] mb-4 tracking-wider uppercase text-xs">
                Garantía de Satisfacción
              </h3>
              <p className="text-[#7A6B5A] font-sans-elegant leading-relaxed">
                En Pascale Closet queremos que estés 100% satisfecha con tu compra. 
                Si no estás conforme, tienes <strong className="text-[#2C2420]">30 días</strong> desde la recepción 
                para solicitar una devolución.
              </p>
            </div>

            <div>
              <h3 className="font-sans-elegant font-medium text-[#2C2420] mb-4 tracking-wider uppercase text-xs">
                Motivos Válidos para Devolución
              </h3>
              <ul className="space-y-2 text-[#7A6B5A] font-sans-elegant">
                <li className="flex items-start gap-2">
                  <span className="text-[#2C2420]">•</span>
                  <span>Producto no coincide con la descripción</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2C2420]">•</span>
                  <span>Producto llegó dañado o defectuoso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2C2420]">•</span>
                  <span>Talla incorrecta (si la vendedora lo permite)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-sans-elegant font-medium text-[#2C2420] mb-4 tracking-wider uppercase text-xs">
                Proceso de Devolución
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { num: "1", text: "Contacta a la vendedora" },
                  { num: "2", text: "Abre un reclamo" },
                  { num: "3", text: "Devuelve el producto" },
                  { num: "4", text: "Recibe tu reembolso" },
                ].map((step) => (
                  <div key={step.num} className="border border-[#E0D6CC] p-4 text-center">
                    <div className="w-8 h-8 bg-[#2C2420] text-white flex items-center justify-center mx-auto mb-3 font-sans-elegant">
                      {step.num}
                    </div>
                    <p className="text-sm font-sans-elegant text-[#7A6B5A]">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F5F0EB] border border-[#E0D6CC] p-4">
              <p className="font-sans-elegant font-medium text-[#2C2420] mb-2">Importante:</p>
              <ul className="text-sm text-[#7A6B5A] font-sans-elegant space-y-1">
                <li>• El producto debe estar en su estado original</li>
                <li>• Incluir todas las etiquetas y embalaje</li>
                <li>• Los gastos de envío de devolución corren por cuenta de la compradora (excepto si el producto está defectuoso)</li>
                <li>• El reembolso se procesa en 5-10 días hábiles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section id="contact" className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-[#E0D6CC] p-8 md:p-12">
          <p className="text-[#7A6B5A] font-sans-elegant text-xs tracking-[0.3em] uppercase mb-4">
            Escríbenos
          </p>
          <h2 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-8">
            Contáctanos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-sans-elegant font-medium text-[#2C2420] mb-6 tracking-wider uppercase text-xs">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F5F0EB] border border-[#E0D6CC] flex items-center justify-center text-[#2C2420]">
                    📍
                  </div>
                  <div>
                    <p className="font-sans-elegant font-medium text-[#2C2420]">Ubicación</p>
                    <p className="text-sm text-[#7A6B5A] font-sans-elegant">
                      Santiago, Chile
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F5F0EB] border border-[#E0D6CC] flex items-center justify-center text-[#2C2420]">
                    ✉️
                  </div>
                  <div>
                    <p className="font-sans-elegant font-medium text-[#2C2420]">Email</p>
                    <p className="text-sm text-[#7A6B5A] font-sans-elegant">soporte@pascalecloset.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F5F0EB] border border-[#E0D6CC] flex items-center justify-center text-[#2C2420]">
                    🕐
                  </div>
                  <div>
                    <p className="font-sans-elegant font-medium text-[#2C2420]">Horario</p>
                    <p className="text-sm text-[#7A6B5A] font-sans-elegant">
                      Lun-Vie: 10:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                label="Nombre"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                name="subject"
                label="Asunto"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <div className="mb-4">
                <label className="block text-xs font-sans-elegant font-medium mb-2 text-[#2C2420] uppercase tracking-wider">
                  Mensaje <span className="text-[#2C2420]">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full px-4 py-3 border border-[#E0D6CC] bg-white font-sans-elegant text-[#2C2420] focus:border-[#2C2420] focus:ring-0 outline-none transition-all duration-200"
                ></textarea>
              </div>

              <div id='bottom' className="flex items-center justify-between gap-4 pt-4">
                <Button type="submit" variant="primary">
                  Enviar mensaje
                </Button>
                <Link to="/products" className="text-xs text-[#7A6B5A] hover:text-[#2C2420] font-sans-elegant uppercase tracking-wider transition-colors">
                  Volver a la tienda
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;