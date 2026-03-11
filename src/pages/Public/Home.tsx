import { Link, useNavigate } from "react-router-dom";
import { ProductCard } from "../../components/common/ProductCard";
import { useProducts } from "../../contexts/ProductContext";
import { Loader } from "../../components/common/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useState, useEffect } from "react";
import "swiper/css";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  Package,
  Shirt,
  Instagram,
} from "lucide-react";
import { useUser } from "../../contexts/UserContext";
import { useCart } from "../../contexts/CartContext";
import Button from "../../components/common/Button";

export const Home = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [swiperRef2, setSwiperRef2] = useState<SwiperType | null>(null);
  const { heroData, footerData } = useUser();
  const [showAdd, setShowAdd] = useState(false);
  const { setDiscount, discount, discountContent } = useCart();

  const newHires = Array.isArray(products)
    ? products
      .sort(
        (a, b) =>
          new Date(b.created_at ?? 0).getTime() -
          new Date(a.created_at ?? 0).getTime(),
      )
      .slice(0, 6)
    : [];

  const bestSellerProduct = Array.isArray(products)
    ? products
      .sort(
        (a, b) =>
          new Date(a.created_at ?? 0).getTime() -
          new Date(b.created_at ?? 0).getTime(),
      )
      .slice(0, 4)
    : [];

  useEffect(() => {
    if (!discountContent?.discount_is_active || discount > 0) return;

    const worker = new Worker(
      new URL("../../workers/timerWorker.ts", import.meta.url),
    );

    worker.postMessage(1000);
    worker.onmessage = (event: MessageEvent<number>) => {
      const timer = event.data;
      if (timer === 5) {
        setShowAdd(true);
        worker.terminate();
      }
    };

    return () => worker.terminate();
  }, [discount, discountContent]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-destructive text-lg font-sans-elegant">
          Chequee la conexión a internet. {error}
        </p>
      </div>
    );
  }

  return (
    <div
      onClick={() => setShowAdd(false)}
      className="min-h-screen bg-background overflow-x-hidden"
    >
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroData?.hero_url_image || "/assets/pascale_logo.png"}
            alt="Pascale Closet Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/90 font-sans-elegant text-xs tracking-[0.4em] uppercase mb-4">
            {heroData?.hero_collection || "Colección 2026"}
          </p>
          <h1 className="text-4xl md:text-6xl uppercase lg:text-7xl font-serif-display text-white mb-6 tracking-wide">
            {heroData?.hero_title || "Nueva Temporada"}
          </h1>
          <p className="text-white/80 font-sans-elegant text-sm md:text-base mb-8 max-w-md">
            {heroData?.hero_subtitle ||
              "Descubrí las últimas tendencias en moda femenina"}
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-white text-[var(--brand-dark)] font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-secondary transition-all duration-300"
          >
            Ver Colección
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif-display text-foreground">
            NUEVOS INGRESOS
          </h2>
          <Link
            to="/products"
            className="text-foreground hover:text-muted-foreground font-sans-elegant text-xs tracking-[0.15em] uppercase border-b border-foreground pb-1 transition-colors duration-300"
          >
            Ver Más
          </Link>
        </div>

        <div className="relative">
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={1}
            spaceBetween={4}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="!pb-4 !overflow-visible"
          >
            {newHires && newHires.length > 0 ? (
              newHires.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div>No hay productos cargados aún.</div>
              </SwiperSlide>
            )}
          </Swiper>

          {/* Flechas de navegación abajo a la derecha */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => swiperRef?.slidePrev()}
              className="w-10 h-10 border border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-200"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swiperRef?.slideNext()}
              className="w-10 h-10 border border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-200"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif-display text-foreground">
            CATEGORÍAS
          </h2>
          <Link
            to="/products"
            className="text-foreground font-sans-elegant text-xs tracking-[0.15em] uppercase border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Ver Todas
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            to="/products/category/vestidos"
            className="group relative aspect-[3/4] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80"
              alt="Vestidos"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-white font-sans-elegant text-sm tracking-[0.2em] uppercase">
                Vestidos
              </p>
            </div>
          </Link>
          <Link
            to="/products/category/tops"
            className="group relative aspect-[3/4] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80"
              alt="Tops & Blusas"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-white font-sans-elegant text-sm tracking-[0.2em] uppercase">
                Tops & Blusas
              </p>
            </div>
          </Link>
          <Link
            to="/products/category/faldas"
            className="group relative aspect-[3/4] overflow-hidden hidden md:block"
          >
            <img
              src="https://images.unsplash.com/photo-1646054224885-f978f5798312?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Faldas & Shorts"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-white font-sans-elegant text-sm tracking-[0.2em] uppercase">
                Faldas & Shorts
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif-display text-foreground">
            MÁS VENDIDOS
          </h2>
          <Link
            to="/products"
            className="text-foreground hover:text-muted-foreground font-sans-elegant text-xs tracking-[0.15em] uppercase border-b border-foreground pb-1 transition-colors duration-300"
          >
            Ver Más
          </Link>
        </div>
        <div className="relative">
          <Swiper
            onSwiper={setSwiperRef2}
            slidesPerView={1}
            spaceBetween={4}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="!pb-4 !overflow-visible"
          >
            {bestSellerProduct && bestSellerProduct.length > 0 ? (
              bestSellerProduct.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div>No hay productos cargados aún.</div>
              </SwiperSlide>
            )}
          </Swiper>

          {/* Flechas de navegación abajo a la derecha */}
          <div className="flex justify-between gap-2 mt-6">
            <Button onClick={() => window.open("https://www.instagram.com/pascalecloset", "_blank")} className="flex gap-1 items-center">
              <Instagram size={18} />
              sigue @pascalecloset
            </Button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => swiperRef2?.slidePrev()}
                className="w-10 h-10 border border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-200"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => swiperRef2?.slideNext()}
                className="w-10 h-10 border border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-200"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <picture>
          <img
            src={footerData?.footer_url_image || "/assets/pascale-mall.jpeg"}
            className="h-150 w-full object-cover aspect-square"
          />
        </picture>
        <div className="absolute top-0 left-0 w-full h-full bg-zinc-950/50" />
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white w-full">
          <h3 className="font-semibold xl:text-6xl text-center text-4xl font-serif-display tracking-wide">
            {footerData?.footer_title || "Mall Costanera Center"}
          </h3>
          <div className="text-center mt-6 space-y-1 xl:text-lg text-base">
            <p>
              {footerData?.footer_location || "Piso PB, Frente a Sally Beauty"}
            </p>
            <p>
              {footerData?.footer_schedule || "Lunes a Sábados de 10:00 a 21:00"}
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios - Minimalist */}
      <section className="bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <Truck className="w-8 h-8 mx-auto mb-3 text-foreground" />
            <h4 className="font-sans-elegant text-sm uppercase tracking-wider text-foreground mb-2">
              Envíos y Retiros Flash
            </h4>
            <p className="text-xs text-muted-foreground font-sans-elegant">
              Gratis en compras superiores a $60.000
            </p>
          </div>

          <div className="text-center p-6">
            <Package className="w-8 h-8 mx-auto mb-3 text-foreground" />
            <h4 className="font-sans-elegant text-sm uppercase tracking-wider text-foreground mb-2">
              Confección Nacional
            </h4>
            <p className="text-xs text-muted-foreground font-sans-elegant">
              Prendas de calidad premium
            </p>
          </div>

          <div className="text-center p-6">
            <Shirt className="w-8 h-8 mx-auto mb-3 text-foreground" />
            <h4 className="font-sans-elegant text-sm uppercase tracking-wider text-foreground mb-2">
              Talles para Todas
            </h4>
            <p className="text-xs text-muted-foreground font-sans-elegant">
              XS a XL disponibles
            </p>
          </div>
        </div>
      </section>

      {showAdd && (
        <section className="fixed bottom-0 left-0 w-full z-50 animate-slide-up border-t-4 border-[var(--brand-gold)] ">
          <div className="bg-[var(--brand-dark)] border-t border-primary/30 shadow-[0_-4px_30px_rgba(0,0,0,0.3)]">
            <button
              onClick={() => setShowAdd(false)}
              className="absolute top-3 right-4 text-white/50 hover:text-background transition-colors text-xl leading-none"
              aria-label="Cerrar"
            >
              ✕
            </button>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--brand-gold)]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 bg-[var(--brand-gold)]/10 rounded-tr-full"></div>
            <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className="hidden sm:flex items-center justify-center w-16 h-16 border-2 border-[var(--brand-gold)] rounded-full shrink-0">
                  <span className="text-[var(--brand-gold)] font-serif-display text-xl font-bold tracking-tight">
                    {discountContent?.discount}%
                  </span>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-[var(--brand-gold)] font-sans-elegant text-[10px] tracking-[0.3em] uppercase mb-1">
                    Oferta Exclusiva
                  </p>
                  <h3 className="text-white font-serif-display text-2xl sm:text-3xl tracking-wide uppercase">
                    <span className="sm:hidden text-[var(--brand-gold)]">
                      {discountContent?.discount}%{" "}
                    </span>
                    Descuento
                  </h3>
                  <p className="text-white/60 font-sans-elegant text-xs mt-1">
                    {discountContent?.discount_description}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDiscount(discountContent?.discount ?? 0);
                  setShowAdd(false);
                  navigate("/products");
                }}
                className="px-8 py-3 bg-[var(--brand-gold)] text-[var(--brand-dark)] font-sans-elegant text-xs tracking-[0.2em] uppercase font-bold hover:brightness-110 transition-all duration-300 shrink-0"
              >
                Obtener Cupón
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
