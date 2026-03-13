import { ProductCard } from "../../components/common/ProductCard";
import { useProducts } from "../../contexts/ProductContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/common/Loader";
import { useState, useEffect } from "react";
import {
  LayoutGrid,
  List,
  Shirt,
  Truck,
  Package,
  Ruler,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Palette,
} from "lucide-react";

export const AllProducts = () => {
  const { products, loading, error } = useProducts();
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const activeSlug = categorySlug || null;
  const [tabFilter, setTabFilter] = useState(false);
  const [filter, setFilter] = useState<string>("Nuevos ingresos");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState("grid");
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 20;

  // Resetear página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSlug, filter, selectedSize, selectedColor]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="bg-card border border-border p-12 text-center max-w-md">
          <div className="text-5xl mb-6">✕</div>
          <h2 className="text-2xl font-serif-display text-foreground mb-4">
            Error
          </h2>
          <p className="text-muted-foreground font-sans-elegant mb-6">{error}</p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-[var(--brand-brown)] text-background font-sans-elegant text-sm tracking-wide hover:opacity-80 transition-all duration-300"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!products) navigate("/");

  // Filtrado por categoría
  const filteredByCategory = activeSlug
    ? Array.isArray(products) && products.filter((product) => activeSlug.includes(product.category!))
    : products;

  // Extraer tallas y colores únicos disponibles
  const uniqueSizes = Array.from(new Set(
    (filteredByCategory || [])
      .map(p => p.size)
      .filter((size): size is string => Boolean(size))
  )).sort();

  const uniqueColors = Array.from(new Set(
    (filteredByCategory || [])
      .map(p => p.color)
      .filter((color): color is string => Boolean(color))
  )).sort();

  // Aplicar filtros de precio, talla y color
  let orderedProducts = [...(filteredByCategory || [])];

  // Filtrar por talla
  if (selectedSize) {
    orderedProducts = orderedProducts.filter(p => p.size === selectedSize);
  }

  // Filtrar por color
  if (selectedColor) {
    orderedProducts = orderedProducts.filter(p => p.color === selectedColor);
  }

  // Ordenar por el filtro seleccionado
  if (filter === "Precio más alto") {
    orderedProducts.sort((a, b) => b.price - a.price);
  } else if (filter === "Precio más bajo") {
    orderedProducts.sort((a, b) => a.price - b.price);
  }
  // "Nuevos ingresos" mantiene el orden original

  const filtered = orderedProducts;

  const handleFilterTab = () => {
    setTabFilter(!tabFilter);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Filter Bar */}
      <div className="border-b border-border bg-card sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Left - Filter buttons */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setTabFilter(true)}
                className="text-[11px] font-sans-elegant uppercase tracking-wider text-foreground hover:text-muted-foreground transition-colors">
                FILTROS
              </button>
              <button className="text-[11px] font-sans-elegant uppercase tracking-wider text-foreground hover:text-muted-foreground transition-colors hidden md:block">
                CARACTERÍSTICAS
              </button>
            </div>

            {/* filter layer */}
            {tabFilter && (
              <div
                onClick={handleFilterTab}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40">
              </div>
            )}

            {/* Filter Tab */}
            <aside className={`absolute top-0 left-0 md:w-80 w-full h-dvh overflow-y-auto 
              bg-background shadow-xl z-999 p-6 flex flex-col gap-4 transition-transform duration-500
              ${tabFilter ? "translate-x-0" : "-translate-x-[100%]"}
            `}>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
                <h2 className="font-sans-elegant text-lg uppercase tracking-wider text-foreground">
                  Filtrar
                </h2>
                <button
                  onClick={handleFilterTab}
                >
                  <X
                    size={22}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  />
                </button>
              </div>

              {/* Sorting Options */}
              <article className="flex flex-col gap-3 pb-4 border-b border-border">
                <h3 className="text-xs font-sans-elegant uppercase tracking-wider text-muted-foreground">
                  Ordenar por
                </h3>
                {[
                  { text: "Nuevos ingresos", icon: Shirt },
                  { text: "Precio más bajo", icon: ArrowDownWideNarrow },
                  { text: "Precio más alto", icon: ArrowUpWideNarrow },
                ].map(({ text, icon }) => {
                  const Icon = icon;
                  return (
                    <div
                      key={text}
                      onClick={() => {
                        setFilter(text);
                        setCurrentPage(1);
                      }}
                      className={`flex gap-2 items-center p-2 rounded cursor-pointer transition-colors ${
                        filter === text
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-sm">{text}</span>
                    </div>
                  );
                })}
              </article>

              {/* Size Filter */}
              {uniqueSizes.length > 0 && (
                <article className="flex flex-col gap-3 pb-4 border-b border-border">
                  <h3 className="text-xs font-sans-elegant uppercase tracking-wider text-muted-foreground">
                    Talla
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setSelectedSize(null);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 text-xs font-sans-elegant uppercase rounded transition-colors ${
                        selectedSize === null
                          ? "bg-foreground text-background"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      Todas
                    </button>
                    {uniqueSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-1 text-xs font-sans-elegant uppercase rounded transition-colors ${
                          selectedSize === size
                            ? "bg-foreground text-background"
                            : "bg-secondary text-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </article>
              )}

              {/* Color Filter */}
              {uniqueColors.length > 0 && (
                <article className="flex flex-col gap-3">
                  <h3 className="text-xs font-sans-elegant uppercase tracking-wider text-muted-foreground">
                    Color
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setSelectedColor(null);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 text-xs font-sans-elegant uppercase rounded transition-colors ${
                        selectedColor === null
                          ? "bg-foreground text-background"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      Todos
                    </button>
                    {uniqueColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-1 text-xs font-sans-elegant uppercase rounded transition-colors ${
                          selectedColor === color
                            ? "bg-foreground text-background"
                            : "bg-secondary text-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </article>
              )}
            </aside>

            {/* Center - Count */}
            <p className="text-[11px] text-muted-foreground font-sans-elegant">
              {(filtered || []).length} PRODUCTOS
            </p>

            {/* Right - View toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1 ${viewMode === "grid" ? "text-foreground" : "text-muted-foreground"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1 ${viewMode === "list" ? "text-foreground" : "text-muted-foreground"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Shirt className="w-16 h-16 text-border mx-auto mb-6" />
            <h2 className="text-lg font-sans-elegant uppercase tracking-wider text-foreground mb-4">
              No hay piezas en esta categoría
            </h2>
            <p className="text-muted-foreground font-sans-elegant text-sm mb-8">
              Explora otras categorías o descubre toda nuestra colección
            </p>
            <Link to="/products">
              <button className="px-8 py-3 bg-foreground text-background font-sans-elegant text-[11px] tracking-[0.2em] uppercase hover:opacity-80 transition-all duration-300">
                Ver toda la colección
              </button>
            </Link>
          </div>
        ) : viewMode === "grid" ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-1 gap-y-1">
              {filtered.slice(
                (currentPage - 1) * PRODUCTS_PER_PAGE,
                currentPage * PRODUCTS_PER_PAGE,
              ).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-1">
            {filtered.slice(
              (currentPage - 1) * PRODUCTS_PER_PAGE,
              currentPage * PRODUCTS_PER_PAGE,
            ).map((product) => {
              const images = JSON.parse(product.image || "[]");
              return (
                <div
                  key={product.id}
                  className="flex bg-card max-w-2xl w-full mx-auto border border-border hover:border-foreground/40 transition-all duration-300"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="block w-48 h-56 flex-shrink-0 bg-secondary overflow-hidden relative group"
                  >
                    {product.image ? (
                      <img
                        src={images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-border">
                        <Shirt className="w-16 h-16" />
                      </div>
                    )}

                  </Link>
                  <div className="flex-1 xl:flex flex-col justify-between p-6">
                    <div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-sans-elegant text-sm uppercase tracking-wider text-foreground mb-3 hover:text-muted-foreground transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      {product.description && (
                        <p className="text-xs text-muted-foreground font-sans-elegant line-clamp-2 mb-4 leading-relaxed">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-xl font-sans-elegant text-foreground">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link to={`/product/${product.id}`}>
                        <button className="px-6 py-2.5 bg-foreground text-background text-[10px] font-sans-elegant uppercase tracking-[0.15em] hover:opacity-80 transition-all duration-300">
                          Ver Detalle
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {Math.ceil(filtered.length / PRODUCTS_PER_PAGE) > 1 && (
          <div className="flex items-center justify-center gap-1 mt-16">
            <button
              className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-secondary transition-colors disabled:opacity-30"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(Math.ceil(filtered.length / PRODUCTS_PER_PAGE), 7) }).map((_, i) => {
              let pageNum;
              const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
              if (totalPages <= 7) {
                pageNum = i + 1;
              } else if (currentPage <= 4) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 3) {
                pageNum = totalPages - 6 + i;
              } else {
                pageNum = currentPage - 3 + i;
              }
              return (
                <button
                  key={pageNum}
                  className={`w-8 h-8 text-[11px] font-sans-elegant ${currentPage === pageNum ? "bg-foreground text-background" : "text-foreground hover:bg-secondary"} transition-colors`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-secondary transition-colors disabled:opacity-30"
              onClick={() => setCurrentPage((p) => Math.min(Math.ceil(filtered.length / PRODUCTS_PER_PAGE), p + 1))}
              disabled={currentPage === Math.ceil(filtered.length / PRODUCTS_PER_PAGE)}
              aria-label="Página siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Features Bar */}
      <div className="border-t border-border bg-card py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center gap-4">
              <Truck className="w-5 h-5 text-foreground" />
              <p className="text-[11px] font-sans-elegant uppercase tracking-[0.15em] text-foreground">
                ENVÍOS Y RETIROS FLASH
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Package className="w-5 h-5 text-foreground" />
              <p className="text-[11px] font-sans-elegant uppercase tracking-[0.15em] text-foreground">
                CONFECCIÓN NACIONAL
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Ruler className="w-5 h-5 text-foreground" />
              <p className="text-[11px] font-sans-elegant uppercase tracking-[0.15em] text-foreground">
                TALLAS PARA TODAS DE XS A XL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
