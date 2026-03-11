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
} from "lucide-react";

export const AllProducts = () => {
  const { products, loading, error } = useProducts();
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const activeSlug = categorySlug || null;
  const [viewMode, setViewMode] = useState("grid");
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 20;

  // Resetear página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSlug]);

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
            className="inline-block px-8 py-3 bg-[var(--brand-brown)] text-white font-sans-elegant text-sm tracking-wide hover:opacity-80 transition-all duration-300"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!products) navigate("/");

  // Filtrado usando la columna `category` del producto
  const filtered = activeSlug
    ? Array.isArray(products) && products.filter((product) => activeSlug.includes(product.category!))
    : products;

  // Paginación
  const totalPages = Math.ceil((filtered || []).length / PRODUCTS_PER_PAGE);
  const paginatedProducts = (filtered || []).slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-background">

      {/* Filter Bar */}
      <div className="border-b border-border bg-card sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Left - Filter buttons */}
            <div className="flex items-center gap-6">
              <button className="text-[11px] font-sans-elegant uppercase tracking-wider text-foreground hover:text-muted-foreground transition-colors">
                FILTROS
              </button>
              <button className="text-[11px] font-sans-elegant uppercase tracking-wider text-foreground hover:text-muted-foreground transition-colors hidden md:block">
                CARACTERÍSTICAS
              </button>
            </div>

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
        {paginatedProducts.length === 0 ? (
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-1 gap-y-1">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {paginatedProducts.map((product) => {
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
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-16">
            <button
              className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-secondary transition-colors disabled:opacity-30"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
              let pageNum;
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
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
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
