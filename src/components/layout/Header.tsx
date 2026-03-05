import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { Menu, X, LogOut, Home, LayoutDashboard, ChevronRight, ShoppingBag, Shirt, Truck, Loader, Tags } from "lucide-react";
import { useProducts } from "../../contexts/ProductContext";
import { normalize } from "../../utils/normalize";
import type { User } from "../../types/global";

interface HeaderProps {
  isAuthenticated: boolean;
  user: User | null;
  userRole: string;
  onLogout: () => void;
  isLoading: boolean;
}

const Header = ({ isAuthenticated, user, userRole, onLogout, isLoading }: HeaderProps) => {
  const { products } = useProducts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const [isTabOpen, setIsTabOpen] = useState(false);
  const cleanedProducts = Array.isArray(products) ? [
    ...new Map(products.map((p) => [p.category, p])).values(),
  ] : [];
  const location = useLocation();

  const categories = [
    {
      slug: "jeans-pantalones",
      name: "JEANS Y PANTALONES",
      url: "products/category/jeans-pantalones",
    },
    {
      slug: "faldas-shorts",
      name: "FALDAS Y SHORTS",
      url: "products/category/faldas-shorts",
    },
    {
      slug: "vestidos-enteritos",
      name: "VESTIDOS Y ENTERITOS",
      url: "products/category/vestidos-enteritos",
    },
    {
      slug: "deportiva",
      name: "ROPA DEPORTIVA",
      url: "products/category/ropa-deportiva",
    },
    {
      slug: "poleras-tops",
      name: "POLERAS Y TOPS",
      url: "products/category/poleras-tops",
    },
    {
      slug: "accesorios",
      name: "ACCESORIOS",
      url: "products/category/accesorios",
    },
  ];

  const activeCategory = categories.find(
    (cat) => normalize(cat.slug) === normalize(location.pathname.split("/")[3]),
  );

  return (
    <header className="w-full z-50 bg-[#FAF8F5] relative">
      <div className="bg-[#FAF8F5] text-[#2C2420] text-xs hidden sm:block border-b border-[#E0D6CC]">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex gap-6 font-sans-elegant tracking-wide">
            <Link
              to="/"
              className="hover:text-[#7A6B5A] transition-colors duration-200"
            >
              Inicio
            </Link>
            <Link
              to="/about"
              className="hover:text-[#7A6B5A] transition-colors duration-200"
            >
              Acerca de
            </Link>
            <Link
              to="/help#bottom"
              className="hover:text-[#7A6B5A] transition-colors duration-200"
            >
              Contacto
            </Link>
          </div>
          <div className="flex gap-4 items-center font-sans-elegant">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="user/profile"
                  className="hover:text-[#7A6B5A] flex gap-1 items-center transition-colors duration-200"
                  style={{
                    fontWeight:
                      location.pathname === "/user/profile" ? "900" : "",
                  }}
                >
                  <picture>
                    <img
                      src={user?.avatar || "/assets/images/user.png"}
                      width={19}
                      height={19}
                      alt=""
                      className="hidden md:flex rounded-full border border-[#E0D6CC] object-contain aspect-square"
                    />
                  </picture>
                  <span>
                    {user?.name || ""} {user?.lastname}
                  </span>
                </Link>
                {userRole === "seller" && (
                  <Link
                    to="/seller/dashboard"
                    className="hover:text-[#7A6B5A] transition-colors duration-200 flex items-center gap-1"
                    style={{
                      fontWeight:
                        location.pathname === "/seller/dashboard" ? "900" : "",
                    }}
                  >
                    <LayoutDashboard size={12} />
                    Panel Vendedor
                  </Link>
                )}
                {userRole === "buyer" && (
                  <Link
                    to="/buyer/orders"
                    className="hover:text-[#7A6B5A] transition-colors duration-200 flex items-center gap-1"
                  >
                    <Tags size={12} />
                    Mis Compras
                  </Link>
                )}
                <button
                  onClick={onLogout}
                  className="hover:text-[#7A6B5A] transition-colors duration-200 flex items-center gap-1"
                >
                  {isLoading ? (
                    <Loader size={12} className="animate-spin" />
                  ) : (
                    <LogOut size={12} />
                  )}
                  Salir
                </button>
              </div>
            ) : (
              <p className="flex items-center gap-2">
                ¡Bienvenida!
                <Link
                  to="/login"
                  className="text-[#2C2420] font-medium hover:underline"
                >
                  Ingresar
                </Link>
                o
                <Link
                  to="/register"
                  className="text-[#2C2420] font-medium hover:underline"
                >
                  Registrarse
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Header - (MOBILE _SECTION) */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4 border-b border-[#E0D6CC] md:bg-transparent bg-primary-foreground md:static w-full fixed z-50">
        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 hover:bg-[#F5F0EB] transition-colors duration-200"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={22} className="text-[#2C2420]" />
        </button>

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-serif-display tracking-wider text-[#2C2420] uppercase">
            Pascale
          </h1>
        </Link>

        {/* Cart - Button */}
        {user?.role !== "seller" ? (
          <Link
            to="/cart"
            className="md:hidden text-black items-center hover:text-zinc-500 relative"
          >
            <ShoppingBag size={22} />
            <span
              style={{ display: getCartItemsCount() <= 0 ? "none" : "flex" }}
              className="px-1.5 pt-0.5 absolute -top-2 -right-2 text-xs font-medium bg-zinc-950 text-white rounded-full"
            >
              {getCartItemsCount()}
            </span>
          </Link>
        ) : (
          <Link
            to="/seller/dashboard"
            className="md:hidden text-black items-center hover:text-zinc-500 relative"
          >
            <LayoutDashboard size={22} />
          </Link>
        )}

        {/* Cart - Minimalist */}
        <Link
          to="/cart"
          className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-[#F5F0EB] transition-all duration-200 relative"
        >
          <ShoppingBag size={20} className="text-[#2C2420]" />
          <span
            style={{ display: getCartItemsCount() <= 0 ? "none" : "flex" }}
            className="px-1.5 pt-0.5 absolute top-0 right-0 text-xs font-medium bg-[var(--brand-dark)] text-white rounded-full"
          >
            {getCartItemsCount()}
          </span>
        </Link>
      </div>

      {/* Categories bar - Elegant */}
      <nav data-nosnippet className="bg-[#FAF8F5] overflow-hidden flex mt-18 md:mt-0 border-b border-border">
        <div className="max-w-6xl mx-auto flex text-xs font-sans-elegant tracking-[0.15em] uppercase text-[#2C2420] overflow-x-auto whitespace-nowrap">
          {categories.map((category) => {
            return (
              <Link
                key={category.slug}
                to={category.url}
                className={`hover:text-white transition-colors duration-200 px-4 py-2 hover:bg-[#2C2420] ${activeCategory?.slug === category.slug ? "bg-[#2C2420] text-white" : ""}`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div data-nosnippet className="bg-[#2C2420] text-white text-center py-2 text-xs tracking-wider font-sans-elegant flex items-center justify-center gap-2">
        <span>ENVÍO GRATIS A PARTIR DE $60.000</span>
        <Truck className="inline w-4 h-4 mb-[2px]" />
      </div>

      {/* Overlay y menú lateral - Minimalist */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => {
              setIsMenuOpen(false);
              setIsTabOpen(false);
            }}
          ></div>
          <aside className="fixed top-0 left-0 w-80 h-dvh overflow-y-auto bg-[#FAF8F5] shadow-xl z-50 p-6 flex flex-col gap-4 animate-slide-left aside-menu">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E0D6CC]">
              <h2 className="font-sans-elegant text-lg uppercase tracking-wider text-[#2C2420]">
                Menú
              </h2>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsTabOpen(false);
                }}
              >
                <X
                  size={22}
                  className="text-[#7A6B5A] hover:text-[#2C2420] transition-colors duration-200"
                />
              </button>
            </div>

            {isAuthenticated ? (
              <div className="flex flex-col font-sans-elegant gap-4">
                <Link
                  to="/user/profile"
                  className="flex items-center gap-3 text-[#2C2420]"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsTabOpen(false);
                  }}
                >
                  <img
                    src={(user && user.avatar) ?? "/assets/user.png"}
                    width={24}
                    height={24}
                    alt="Avatar del usuario"
                    className="rounded-full border border-[#E0D6CC] object-cover aspect-square"
                  />
                  <span className="font-medium">
                    {(user && user.name) || "Sin Nombre"}{" "}
                    {(user && user.lastname) || "Sin Nombre"}
                  </span>
                </Link>
                <Link
                  to="/"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsTabOpen(false);
                  }}
                  className="flex items-center gap-3 text-[#2C2420] hover:text-[#7A6B5A] transition-colors duration-200"
                >
                  <Home size={18} /> Inicio
                </Link>
                {userRole === "seller" && (
                  <Link
                    to="/seller/dashboard"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsTabOpen(false);
                    }}
                    className="flex items-center gap-3 text-[#2C2420] hover:text-[#7A6B5A] transition-colors duration-200"
                  >
                    <LayoutDashboard size={18} /> Panel Vendedor
                  </Link>
                )}
                {userRole === "buyer" && (
                  <Link
                    to="/buyer/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 text-[#2C2420] hover:text-[#7A6B5A] transition-colors duration-200"
                  >
                    <ShoppingBag size={18} /> Mis Compras
                  </Link>
                )}
                <button
                  onClick={() => setIsTabOpen(!isTabOpen)}
                  className="flex items-center justify-between gap-3 text-[#2C2420] hover:text-[#7A6B5A] transition-colors duration-200"
                >
                  <div className="inline-flex gap-3 items-center">
                    <Shirt size={18} /> Categorías
                  </div>
                  <ChevronRight
                    size={18}
                    className="translate-y-0.5 transition-transform duration-300"
                    style={{ rotate: isTabOpen ? "90deg" : "" }}
                  />
                </button>
                {isTabOpen && (
                  <div className="grid grid-cols-3 gap-1">
                    {cleanedProducts
                      ? cleanedProducts.map((product) => {
                        const images = JSON.parse(product.image || "[]");
                        return (
                          <Link
                            key={product.id}
                            to={`/product/category/${product.category}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center text-[#2C2420] hover:text-[#7A6B5A] transition-colors duration-200"
                          >
                            <picture className="relative hover:brightness-125 hover:scale-101">
                              <div className="absolute top-0 left-0 w-full h-full bg-zinc-950/50" />
                              <img
                                src={`${images[0]}`}
                                width={80}
                                height={80}
                                className="aspect-[2/4] object-cover"
                              />
                              <small className="capitalize text-xs absolute bottom-0 left-[50%] translate-[-50%] text-white font-semibold">
                                {product.category}
                              </small>
                            </picture>
                          </Link>
                        )
                      })
                      : null}
                  </div>
                )}
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-[#DC3545] hover:underline mt-4 pt-4 border-t border-[#E0D6CC]"
                >
                  <LogOut size={18} /> Salir
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 font-sans-elegant">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#2C2420] hover:underline"
                >
                  Ingresar
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#2C2420] font-medium hover:underline"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </aside>
        </>
      )}
    </header>
  );
};

export default Header;
