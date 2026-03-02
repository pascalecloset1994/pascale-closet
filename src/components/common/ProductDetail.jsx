import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useProducts } from "../../contexts/ProductContext";
import { ProductCard } from "./ProductCard";
import { showDialog, closeDialog } from "./Dialog";
import {
  Star,
  Truck,
  Shield,
  Heart,
  Share2,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Copy,
} from "lucide-react";
import { useRef } from "react";
import { TriangleAlert } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { toast } from "./Toast";
import { HeartCrack } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { Tag } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, MAX_PAYMENT, SHIPMENT_COST, discount, discountContent } = useCart();
  const { getProductById, products, loading, isFavorite, toggleFavorite } =
    useProducts();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState("descripcion");
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const showSizesRef = useRef(null);
  const product = getProductById(id);
  const [swiperRef, setSwiperRef] = useState(null);

  // Guardar productos vistos recientemente
  useEffect(() => {
    if (product) {
      const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      const filtered = viewed.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 6);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
      setRecentlyViewed(filtered.slice(0, 6));
    }
  }, [product]);

  // Productos relacionados (misma categoría)
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  // Colores disponibles del producto
  const productColors = product?.color
    ? product.color.split(",").map((c) => c.trim())
    : [];
  // Tallas disponibles del producto
  const productSizes = product?.size
    ? product.size.split(",").map((s) => s.trim())
    : [];

  // Actualizar estado de favorito cuando cambie el producto
  useEffect(() => {
    if (product) {
      setIsFav(isFavorite(product.id));
    }
  }, [product, isFavorite]);

  // Función para abrir imagen en dialog
  const openImageDialog = () => {
    const ZoomableImage = ({ src, alt }) => {
      const [isZoomed, setIsZoomed] = useState(false);
      const [position, setPosition] = useState({ x: 0, y: 0 });

      const handleImageClick = (e) => {
        if (!isZoomed) {
          const { left, top, width, height } = e.target.getBoundingClientRect();
          const x = ((e.clientX - left) / width) * 100;
          const y = ((e.clientY - top) / height) * 100;
          setPosition({ x, y });
        }
        setIsZoomed(!isZoomed);
      };

      const handleMouseMove = (e) => {
        if (isZoomed) {
          const { left, top, width, height } = e.target.getBoundingClientRect();
          const x = ((e.clientX - left) / width) * 100;
          const y = ((e.clientY - top) / height) * 100;
          setPosition({ x, y });
        }
      };

      return (
        <div
          className={`relative overflow-hidden cursor-zoom-in ${isZoomed ? "cursor-zoom-out" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={src}
            alt={alt}
            onClick={handleImageClick}
            onMouseMove={handleMouseMove}
            className={`max-w-[90vw] max-h-[90vh] object-contain transition-transform duration-200 ${isZoomed ? "scale-[2]" : "scale-100"}`}
            style={
              isZoomed
                ? { transformOrigin: `${position.x}% ${position.y}%` }
                : {}
            }
          />
        </div>
      );
    };

    showDialog({
      title: "",
      content: (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
          <button
            onClick={closeDialog}
            className="absolute top-4 right-4 z-[999] w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors rounded-full"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <ZoomableImage src={product.image} alt={product.name} />
        </section>
      ),
    });
  };

  // Función para manejar favoritos
  const handleToggleFavorite = () => {
    const result = toggleFavorite(product);
    setIsFav(result);
    toast({
      timer: 4,
      tunner: 20,
      message: (
        <div className="flex items-center gap-2">
          {result ? (
            <>
              <Heart className="fill-[var(--brand-brown)] stroke-none" />
              <small>Agregado a Favoritos</small>
            </>
          ) : (
            <>
              <HeartCrack />
              <small>Eliminado de Favoritos</small>
            </>
          )}
        </div>
      ),
    });
  };

  // Función para compartir
  const handleShare = async () => {
    const url = window.location.href;
    const text = `Mira este producto: ${product.name}`;

    if (navigator.share) {
      await navigator.share({ title: product.name, text, url });
    }
  };

  // Rating simulado
  const averageRating = 4.8;
  const reviewCount = 12;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-6 bg-[#F5F0EB] rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-[#F5F0EB] rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-6">
            Producto no encontrado
          </h2>
          <Link
            to="/products"
            className="inline-block bg-[#2C2420] text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#333333] transition-colors"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const stockValue = Number(product.stock) || 0;

  const handleAddToCart = () => {
    if (!selectedColor) {
      showDialog({
        content: <div>Debes elegir un color para tu prenda!</div>,
      });
      return;
    } else if (!selectedSize) {
      showDialog({
        content: <div>Debes elegir un talle para tu prenda!</div>,
      });
      return;
    }
    addToCart(product, quantity);
    toast({
      timer: 4,
      tunner: 8,
      message: (
        <div className="flex gap-2 items-center">
          <ShoppingBag />
          Agregado en tu bolso:
          <span className="font-semibold">{product.name}</span> - Talla{" "}
          {selectedSize}
          <p>Color: {selectedColor}</p>
        </div>
      ),
    });
  };

  const handleBuyNow = () => {
    if (!selectedColor) {
      showDialog({
        content: <div>Debes elegir un color para tu prenda!</div>,
      });
      return;
    } else if (!selectedSize) {
      showDialog({
        content: <div>Debes elegir un talle para tu prenda!</div>,
      });
      return;
    }
    addToCart(product, quantity);
    navigate("/cart");
  };

  const handleShowSizes = () => {
    setShowSizes(!showSizes);
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const renderStars = (rating, size = "sm") => {
    const sizeClass = size === "sm" ? "w-3 h-3" : "w-4 h-4";
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${star <= rating ? "fill-[#2C2420] text-[#2C2420]" : "text-[#cec0b3]"}`}
          />
        ))}
      </div>
    );
  };

  const colorDetect = (color) => {
    if (String(color).toLowerCase() === "negro") return "black";
    if (String(color).toLowerCase() === "beige") return "#F5F5DC";
    if (String(color).toLowerCase() === "blanco") return "white";
    if (String(color).toLowerCase() === "azul") return "#A7C7E7";
    if (String(color).toLowerCase() === "rojo") return "tomato";
    if (String(color).toLowerCase() === "marron") return "brown";
    if (String(color).toLowerCase() === "crema") return "#FFFDD0";
    return "";
  };

  const images = JSON.parse(product.image);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="">
          <div className="max-w-7xl mx-auto py-4">
            <nav className="text-xs font-sans-elegant uppercase tracking-wider">
              <Link
                to="/"
                className="text-[#7A6B5A] hover:text-[#2C2420] transition-colors"
              >
                Inicio
              </Link>
              <span className="mx-2 text-[#E0D6CC]">/</span>
              <Link
                to="/products"
                className="text-[#7A6B5A] hover:text-[#2C2420] transition-colors"
              >
                {product.category || "Productos"}
              </Link>
              <span className="mx-2 text-[#E0D6CC]">/</span>
              <span className="text-[#2C2420]">{product.name}</span>
            </nav>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <div
              className="relative aspect-square bg-[#F5F0EB] overflow-hidden group cursor-zoom-in max-w-md mx-auto lg:mx-0"
              onClick={openImageDialog}
            >
              {product.originalPrice && (
                <span className="absolute top-4 left-4 z-10 bg-[#2C2420] text-white text-[10px] px-3 py-1.5 font-sans-elegant uppercase tracking-wider">
                  Oferta
                </span>
              )}
              {product.image ? (
                <img
                  src={images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#E0D6CC] text-8xl">
                  👗
                </div>
              )}
              {/* Icono de zoom */}
              <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-5 h-5 text-[#2C2420]" />
              </div>
              {/* Thumbnails */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button className="w-12 h-12 bg-white border-2 border-[#2C2420] overflow-hidden">
                  {product.image ? (
                    <img
                      src={images[1]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#F5F0EB]"></div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Información del producto */}
          <div className="lg:pl-4">
            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              {renderStars(averageRating)}
              <span className="text-xs text-[#7A6B5A] font-sans-elegant">
                ({reviewCount})
              </span>
            </div>

            {/* Nombre */}
            <h1 className="text-2xl md:text-3xl font-sans-elegant uppercase tracking-wide text-[#2C2420] mb-4">
              {product.name}
            </h1>

            {/* Precio */}
            <div className="gap-3 mb-6">
              <span
                className={`text-2xl font-sans-elegant text-[#2C2420] flex items-center gap-2 ${discount > 0 ? " line-through text-muted-foreground text-base" : ""}`}
              >
                ${product.price?.toLocaleString("es-AR")}{" "}
              </span>
              {discount > 0 && (
                <div className="flex gap-2 items-center">
                  <span
                    className={`text-2xl font-sans-elegant text-[#2C2420] flex items-center gap-2`}
                  >
                    $
                    {Math.round(
                      Number(product.price) -
                        (Number(product.price) * Number(discountContent && discountContent.discount)) / 100,
                    )?.toLocaleString("es-AR")}{" "}
                  </span>
                  <span className="flex items-center text-sm bg-primary/10 p-0.5">
                    <Tag size={16} /> {discountContent && discountContent.discount}% OFF
                  </span>
                </div>
              )}

              {product.originalPrice && (
                <>
                  <span className="text-lg text-[#7A6B5A] line-through font-sans-elegant">
                    ${Number(product.originalPrice).toLocaleString("es-AR")}
                  </span>
                  <span className="text-xs bg-[#C9B8A8] text-[#2C2420] px-2 py-1 font-sans-elegant uppercase">
                    -
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100,
                    )}
                    %
                  </span>
                </>
              )}
            </div>

            {/* Color */}
            <div className="mb-6">
              <p className="text-xs font-sans-elegant uppercase tracking-wider text-[#7A6B5A] mb-3">
                Color:{" "}
                <span className="text-[#2C2420]">
                  {selectedColor || "Seleccionar"}
                </span>
              </p>
              <div className="flex gap-2">
                {productColors.map((color) =>
                  color === "negro y blanco" ? (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all relative overflow-hidden ${
                        String(selectedColor).toLowerCase() ===
                        String(color).toLowerCase()
                          ? "border-[#2C2420] scale-110"
                          : "border-[#E0D6CC]"
                      }`}
                    >
                      <span className="absolute top-0 left-0 bg-zinc-950 p-1 w-[50%] h-full"></span>
                      <span className="absolute top-0 right-0 bg-zinc-50 p-1 w-[50%] h-full"></span>
                    </button>
                  ) : (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        String(selectedColor).toLowerCase() ===
                        String(color).toLowerCase()
                          ? "border-[#2C2420] scale-110"
                          : "border-[#E0D6CC]"
                      }`}
                      style={{ backgroundColor: colorDetect(color) }}
                      title={String(color).toUpperCase()}
                    />
                  ),
                )}
              </div>
            </div>

            {/* Talla */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-sans-elegant uppercase tracking-wider text-[#7A6B5A]">
                  Talla:{" "}
                  <span className="text-[#2C2420]">
                    {selectedSize || "Seleccionar"}
                  </span>
                </p>
                <button
                  onClick={handleShowSizes}
                  className="text-xs text-[#2C2420] underline font-sans-elegant hover:no-underline"
                >
                  Guía de tallas
                </button>
              </div>
              <div className="flex gap-2">
                {productSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border text-xs font-sans-elegant uppercase tracking-wider transition-all ${
                      selectedSize === size
                        ? "bg-[#2C2420] text-white border-[#2C2420]"
                        : "border-[#E0D6CC] text-[#2C2420] hover:border-[#2C2420]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {showSizes && (
              <>
                <div
                  className="fixed w-full h-dvh top-0 left-0 bg-zinc-900/50 z-50 backdrop-blur-sm"
                  onClick={() => setShowSizes(false)}
                />
                <div
                  ref={showSizesRef}
                  className={`fixed right-0 top-0 z-50 h-dvh md:w-[400px] bg-white/95 backdrop-blur-sm border-l border-[#E0D6CC] shadow-lg
                   transition-transform duration-600 
                   ${showSizes ? "translate-x-0" : "-translate-x-full"}
                   `}
                >
                  <div className="p-6 flex flex-col gap-4 h-full overflow-y-auto">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Guía de talles
                    </h3>

                    <button
                      className="absolute top-[22px] right-4"
                      onClick={() => setShowSizes(false)}
                    >
                      <X className="text-[#E0D6CC] hover:bg-black/30" />
                    </button>

                    <p className="text-sm text-gray-700 leading-relaxed">
                      En la conversión más común de talles numéricos a letras
                      (ropa) se usa así:
                    </p>

                    <ul className="text-sm text-gray-800 space-y-1 pl-4 list-disc">
                      <li>
                        <strong>36</strong> → S (Small / Chico)
                      </li>
                      <li>
                        <strong>38</strong> → M (Medium / Mediano)
                      </li>
                      <li>
                        <strong>40</strong> → L (Large / Grande)
                      </li>
                      <li>
                        <strong>42</strong> → XL (Extra Large)
                      </li>
                    </ul>

                    <picture className="aspect-video">
                      <img
                        src="/assets/guia-talles.png"
                        width="100%"
                        height="100%"
                      />
                    </picture>

                    <div className="mt-4 rounded-md border border-[#E0D6CC] bg-white p-4 text-sm text-gray-700">
                      <span className="flex items-center gap-1 font-semibold text-gray-900">
                        <TriangleAlert size={20} className="text-[#E0D6CC]" />{" "}
                        Aclaración importante
                      </span>
                      <p className="mt-2 leading-relaxed">
                        Esto es una referencia estándar, pero puede variar según
                        la marca, el país y el tipo de prenda (remeras,
                        pantalones, vestidos, etc.)
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Cantidad */}
            <div className="mb-6">
              <p className="text-xs font-sans-elegant uppercase tracking-wider text-[#7A6B5A] mb-3">
                Cantidad
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#E0D6CC]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-[#F5F0EB] text-[#2C2420] transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-3 border-x border-[#E0D6CC] font-sans-elegant min-w-[60px] text-center text-[#2C2420]">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(
                        Math.min(stockValue || quantity + 1, quantity + 1),
                      )
                    }
                    className="px-4 py-3 hover:bg-[#F5F0EB] text-[#2C2420] transition-colors"
                    disabled={stockValue > 0 && quantity >= stockValue}
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-[#7A6B5A] font-sans-elegant">
                  {stockValue} disponibles
                </span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-300"
              >
                Añadir al carrito
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-4 border border-[#2C2420] text-[#2C2420] font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#2C2420] hover:text-white transition-all duration-300"
              >
                Comprar ahora
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleToggleFavorite}
                  className={`flex-1 py-3 border font-sans-elegant text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                    isFav
                      ? "border-[#C9B8A8] bg-[#FDF8F8] text-[#2C2420]"
                      : "border-[#E0D6CC] text-[#7A6B5A] hover:border-[#2C2420] hover:text-[#2C2420]"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${isFav ? "fill-[#C9B8A8] text-[#C9B8A8]" : ""}`}
                  />
                  {isFav ? "En Favoritos" : "Favoritos"}
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 py-3 border border-[#E0D6CC] text-[#7A6B5A] font-sans-elegant text-xs tracking-wider uppercase hover:border-[#2C2420] hover:text-[#2C2420] transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Compartir
                </button>
              </div>
            </div>

            {/* Info de envío */}
            <div className="border-t border-[#E0D6CC] pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#2C2420] mt-0.5" />
                <div>
                  <p className="text-sm font-sans-elegant text-[#2C2420]">
                    {product.price > 60000
                      ? "Envío gratis"
                      : "Envío desde $" +
                        Number(MAX_PAYMENT).toLocaleString("es-CL")}
                  </p>
                  <p className="text-xs text-[#7A6B5A] font-sans-elegant">
                    Entrega estimada: 3-5 días hábiles
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#2C2420] mt-0.5" />
                <div>
                  <p className="text-sm font-sans-elegant text-[#2C2420]">
                    Compra segura
                  </p>
                  <p className="text-xs text-[#7A6B5A] font-sans-elegant">
                    Pago protegido con encriptación SSL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de información */}
      <div className="border-t border-[#E0D6CC]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tab headers */}
          <div className="flex border-b border-[#E0D6CC]">
            <button
              onClick={() => toggleAccordion("descripcion")}
              className={`px-6 py-4 text-xs font-sans-elegant uppercase tracking-wider transition-colors border-b-2 -mb-[2px] ${
                activeAccordion === "descripcion"
                  ? "border-[#2C2420] text-[#2C2420]"
                  : "border-transparent text-[#7A6B5A] hover:text-[#2C2420]"
              }`}
            >
              Descripción
            </button>
            <button
              onClick={() => toggleAccordion("detalles")}
              className={`px-6 py-4 text-xs font-sans-elegant uppercase tracking-wider transition-colors border-b-2 -mb-[2px] ${
                activeAccordion === "detalles"
                  ? "border-[#2C2420] text-[#2C2420]"
                  : "border-transparent text-[#7A6B5A] hover:text-[#2C2420]"
              }`}
            >
              Detalles
            </button>
            <button
              onClick={() => toggleAccordion("envio")}
              className={`px-6 py-4 text-xs font-sans-elegant uppercase tracking-wider transition-colors border-b-2 -mb-[2px] ${
                activeAccordion === "envio"
                  ? "border-[#2C2420] text-[#2C2420]"
                  : "border-transparent text-[#7A6B5A] hover:text-[#2C2420]"
              }`}
            >
              Envío
            </button>
          </div>

          {/* Tab content */}
          <div className="py-8">
            {activeAccordion === "descripcion" && (
              <div className="max-w-3xl">
                <p className="text-[#7A6B5A] font-sans-elegant leading-relaxed">
                  {product.description ||
                    "Luce fabulosa con esta prenda de nuestra colección. Ideal para destacar en cualquier ocasión. Con un diseño cómodo y elegante, es la mezcla perfecta entre estilo y comodidad."}
                </p>
                <p className="text-[#7A6B5A] font-sans-elegant leading-relaxed mt-4">
                  Modelo usa talla M.
                </p>
              </div>
            )}
            {activeAccordion === "detalles" && (
              <div className="max-w-3xl">
                <table className="w-full">
                  <tbody className="font-sans-elegant text-sm">
                    {product.brand && (
                      <tr className="border-b border-[#E0D6CC]">
                        <td className="py-3 text-[#7A6B5A] w-1/3">Marca</td>
                        <td className="py-3 text-[#2C2420]">{product.brand}</td>
                      </tr>
                    )}
                    <tr className="border-b border-[#E0D6CC]">
                      <td className="py-3 text-[#7A6B5A] w-1/3">Categoría</td>
                      <td className="py-3 text-[#2C2420]">
                        {product.category || "Ropa"}
                      </td>
                    </tr>
                    {product.size && (
                      <tr className="border-b border-[#E0D6CC]">
                        <td className="py-3 text-[#7A6B5A] w-1/3">
                          Tallas disponibles
                        </td>
                        <td className="py-3 text-[#2C2420]">
                          {productSizes.map((size) => size).join(",")}
                        </td>
                      </tr>
                    )}
                    {product.color && (
                      <tr className="border-b border-[#E0D6CC]">
                        <td className="py-3 text-[#7A6B5A] w-1/3">Color</td>
                        <td className="py-3 text-[#2C2420]">{product.color}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="py-3 text-[#7A6B5A] w-1/3">Cuidados</td>
                      <td className="py-3 text-[#2C2420]">
                        Lavar a mano o en ciclo delicado
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeAccordion === "envio" && (
              <div className="max-w-3xl space-y-4">
                <div>
                  <h4 className="text-sm font-sans-elegant text-[#2C2420] mb-2">
                    Tiempos de entrega
                  </h4>
                  <p className="text-sm text-[#7A6B5A] font-sans-elegant">
                    • Regiones exteriores a Santiago 2-3 días hábiles
                    <br />• Interior del país: 4-7 días hábiles
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-sans-elegant text-[#2C2420] mb-2">
                    Costos de envío
                  </h4>
                  <p className="text-sm text-[#7A6B5A] font-sans-elegant">
                    • Envío gratis en compras mayores a $
                    {Number(MAX_PAYMENT).toLocaleString("es-CL")}
                    <br />• Envío estándar desde $
                    {Number(SHIPMENT_COST).toLocaleString("es-CL")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* También te podría gustar */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-[#E0D6CC]">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-xl font-sans-elegant uppercase tracking-wider text-[#2C2420] text-center mb-8">
              También te podría gustar
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vistos recientemente */}
      {recentlyViewed.length > 0 && (
        <div className="border-t border-[#E0D6CC] bg-[#F5F0EB]">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-xl font-sans-elegant uppercase tracking-wider text-[#2C2420] text-center mb-8">
              Vistos recientemente
            </h2>
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
                className="!pb-4"
              >
                {recentlyViewed && recentlyViewed.length > 0 ? (
                  recentlyViewed.map((product) => (
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
                  className="w-10 h-10 border border-[#2C2420] flex items-center justify-center hover:bg-[#2C2420] hover:text-white transition-all duration-200"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => swiperRef?.slideNext()}
                  className="w-10 h-10 border border-[#2C2420] flex items-center justify-center hover:bg-[#2C2420] hover:text-white transition-all duration-200"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
