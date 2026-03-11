import { Link } from 'react-router-dom';

export const About = () => { 
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-card border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground font-sans-elegant text-xs tracking-[0.3em] uppercase mb-4">
            Nuestra Historia
          </p>
          <h1 className="text-3xl md:text-4xl font-sans-elegant uppercase tracking-wider text-foreground mb-6">
            Pascale Closet
          </h1>
          <div className="w-16 h-[1px] bg-foreground mx-auto mb-6"></div>
          <p className="text-sm text-muted-foreground font-sans-elegant font-light max-w-2xl mx-auto">
            Ropa pensada para mujeres que buscan elegancia sin esfuerzo, piezas
            que funcionan en el día a día y en los momentos especiales.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 py-6 text-xs font-sans-elegant uppercase tracking-wider">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Inicio</Link>
        <span className="mx-3 text-border">/</span>
        <span className="text-foreground">Nosotras</span>
      </nav>

      {/* Quiénes Somos */}
      <section id="quienes-somos" className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-card border border-border p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-muted-foreground font-sans-elegant text-xs tracking-[0.3em] uppercase mb-4">
                Sobre Pascale Closet
              </p>
              <h2 className="text-2xl font-sans-elegant uppercase tracking-wider text-foreground mb-6">
                Quiénes Somos
              </h2>
              <p className="text-muted-foreground font-sans-elegant leading-relaxed mb-4">
                <strong className="text-foreground">Pascale Closet</strong> nació de la pasión
                de Marcela Merino por las prendas bien hechas. Marcela empezó
                seleccionando ropa que la hacía sentir cómoda y con estilo, y
                con el tiempo decidió compartir esa selección con otras mujeres.
              </p>
              <p className="text-muted-foreground font-sans-elegant leading-relaxed mb-4">
                Detrás de la marca está Marcela Merino: fundadora y curadora.
                Ella busca piezas con carácter —esas que te acompañan en el
                trabajo, en una salida o en un fin de semana— siempre cuidando
                la calidad y el ajuste.
              </p>
              <p className="text-muted-foreground font-sans-elegant leading-relaxed">
                Vestirnos es una forma de mostrarnos al mundo. Marcela te ayuda
                a encontrar prendas que encajen con lo que sos y con lo que
                querés transmitir en cada momento. Seguila en
                <a
                  href="https://instagram.com/pascalecloset"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline ml-1 text-foreground"
                >
                  Instagram
                </a>
                .
              </p>
            </div>
            <div className="bg-secondary border border-border p-10 text-center">
              <div className="text-4xl mb-6">✨</div>
              <h3 className="text-xl font-sans-elegant uppercase tracking-wider text-foreground mb-4">Nuestra Misión</h3>
              <p className="text-muted-foreground font-sans-elegant leading-relaxed">
                Queremos que encontrar tu próxima prenda favorita sea fácil y
                placentero: atención cercana, selección honesta y ropa pensada
                para durar más de una temporada.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-border">
            <div className="text-center">
              <p className="text-4xl font-sans-elegant text-foreground mb-2">500+</p>
              <p className="text-xs text-muted-foreground font-sans-elegant tracking-wider uppercase">Prendas exclusivas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-sans-elegant text-foreground mb-2">2K+</p>
              <p className="text-xs text-muted-foreground font-sans-elegant tracking-wider uppercase">Clientas felices</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-sans-elegant text-foreground mb-2">140K+</p>
              <p className="text-xs text-muted-foreground font-sans-elegant tracking-wider uppercase">Seguidoras Instagram</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-sans-elegant text-foreground mb-2">100%</p>
              <p className="text-xs text-muted-foreground font-sans-elegant tracking-wider uppercase">Satisfacción</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-muted-foreground font-sans-elegant text-xs tracking-[0.3em] uppercase mb-3">
            Lo Que Nos Define
          </p>
          <h2 className="text-2xl font-sans-elegant uppercase tracking-wider text-foreground">
            Nuestros Valores
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border border-border p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-6">💎</div>
            <h3 className="text-lg font-sans-elegant uppercase tracking-wider text-foreground mb-4">Calidad</h3>
            <p className="text-muted-foreground font-sans-elegant leading-relaxed">
              Seleccionamos cada prenda cuidadosamente, garantizando materiales y confección de primera.
            </p>
          </div>
          <div className="bg-card border border-border p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-6">🤍</div>
            <h3 className="text-lg font-sans-elegant uppercase tracking-wider text-foreground mb-4">Confianza</h3>
            <p className="text-muted-foreground font-sans-elegant leading-relaxed">
              Transparencia y honestidad en cada transacción. Tu satisfacción es nuestra prioridad.
            </p>
          </div>
          <div className="bg-card border border-border p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-6">✨</div>
            <h3 className="text-lg font-sans-elegant uppercase tracking-wider text-foreground mb-4">Elegancia</h3>
            <p className="text-muted-foreground font-sans-elegant leading-relaxed">
              Creemos en la belleza atemporal y el estilo que trasciende las tendencias pasajeras.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-[var(--brand-dark)] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white/50 font-sans-elegant text-xs tracking-[0.3em] uppercase mb-4">
            Tu Estilo Te Espera
          </p>
          <h2 className="text-2xl md:text-3xl font-sans-elegant uppercase tracking-wider text-white mb-6">
            ¿Lista para descubrir tu próxima pieza favorita?
          </h2>
          <p className="text-sm text-white/60 font-sans-elegant font-light mb-10 max-w-xl mx-auto">
            Date una vuelta por la tienda, seguro encontrarás esa prenda que
            querrás usar una y otra vez.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/products">
              <button className="px-10 py-4 bg-white text-[var(--brand-dark)] font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-secondary transition-all duration-300">
                Explorar Colección
              </button>
            </Link>
            <Link to="/register">
              <button className="px-10 py-4 border border-white text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[var(--brand-dark)] transition-all duration-300">
                Crear Cuenta
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;