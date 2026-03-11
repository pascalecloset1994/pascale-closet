import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { Menu, X, LogOut, Home, LayoutDashboard, ChevronRight, ShoppingBag, Shirt, Truck, Loader, Tags, Instagram, Facebook, Sun, Moon } from "lucide-react";
import { useProducts } from "../../contexts/ProductContext";
import { normalize } from "../../utils/normalize";
import type { User } from "../../types/global";
import { TikTokIcon } from "./Footer";
import { useTheme } from "../../contexts/ThemeContext";
import { ThemeSwitch } from "../common/ThemeSwitch";

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
  const { theme, setTheme } = useTheme();
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
    {
      slug: "otros",
      name: "OTROS",
      url: "products/category/otros",
    }
  ];

  const activeCategory = categories.find(
    (cat) => normalize(cat.slug) === normalize(location.pathname.split("/")[3]),
  );

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setIsTabOpen(false);
    document.body.style.overflow = "auto";
  }

  return (
    <header className="w-full z-50 bg-background relative">
      <div className="bg-background text-foreground text-xs hidden sm:block border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex gap-6 font-sans-elegant tracking-wide">
            <Link
              to="/"
              className="hover:text-muted-foreground transition-colors duration-200"
            >
              Inicio
            </Link>
            <Link
              to="/about"
              className="hover:text-muted-foreground transition-colors duration-200"
            >
              Acerca de
            </Link>
            <Link
              to="/help#bottom"
              className="hover:text-muted-foreground transition-colors duration-200"
            >
              Contacto
            </Link>
          </div>
          <div className="flex gap-4 items-center font-sans-elegant">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="user/profile"
                  className="hover:text-muted-foreground flex gap-1 items-center transition-colors duration-200"
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
                      className="hidden md:flex rounded-full border border-border object-contain aspect-square"
                    />
                  </picture>
                  <span>
                    {user?.name || ""} {user?.lastname}
                  </span>
                </Link>
                {userRole === "seller" && (
                  <Link
                    to="/seller/dashboard"
                    className="hover:text-muted-foreground transition-colors duration-200 flex items-center gap-1"
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
                    className="hover:text-muted-foreground transition-colors duration-200 flex items-center gap-1"
                  >
                    <Tags size={12} />
                    Mis Compras
                  </Link>
                )}
                <button
                  onClick={onLogout}
                  className="hover:text-muted-foreground transition-colors duration-200 flex items-center gap-1"
                >
                  {isLoading ? (
                    <Loader size={12} className="animate-spin" />
                  ) : (
                    <LogOut size={12} />
                  )}
                  Salir
                </button>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="ml-1 hover:opacity-80"
                  title={`${theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}`}
                >
                  {theme === "dark" ? (
                    <Sun size={15} />
                  ) : (
                    <Moon size={15} />
                  )}
                </button>
              </div>
            ) : (
              <p className="flex items-center gap-2">
                ¡Bienvenida!
                <Link
                  to="/login"
                  className="text-foreground font-medium hover:underline"
                >
                  Ingresar
                </Link>
                o
                <Link
                  to="/register"
                  className="text-foreground font-medium hover:underline"
                >
                  Registrarse
                </Link>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="ml-1 hover:opacity-80"
                  title={`${theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}`}
                >
                  {theme === "dark" ? (
                    <Sun size={15} />
                  ) : (
                    <Moon size={15} />
                  )}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Header - (MOBILE _SECTION) */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4 border-b border-border md:bg-transparent bg-primary-foreground md:static w-full fixed z-50">
        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 hover:bg-secondary transition-colors duration-200"
          onClick={() => {
            document.body.style.overflow = "hidden";
            setIsMenuOpen(true)
          }}
        >
          <Menu size={22} className="text-foreground" />
        </button>

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-serif-display tracking-wider text-foreground uppercase">
            Pascale
          </h1>
        </Link>

        {/* Cart - Button */}
        {user?.role !== "seller" ? (
          <Link
            to="/cart"
            className="md:hidden text-foreground items-center hover:text-muted-foreground relative"
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
            className="md:hidden text-foreground items-center hover:text-muted-foreground relative"
          >
            <LayoutDashboard size={22} />
          </Link>
        )}

        {/* Cart - Minimalist */}
        <Link
          to="/cart"
          className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-secondary transition-all duration-200 relative"
        >
          <ShoppingBag size={20} className="text-foreground" />
          <span
            style={{ display: getCartItemsCount() <= 0 ? "none" : "flex" }}
            className="px-1.5 pt-0.5 absolute top-0 right-0 text-xs font-medium bg-[var(--brand-dark)] text-white rounded-full"
          >
            {getCartItemsCount()}
          </span>
        </Link>
      </div>

      {/* Categories bar - Elegant */}
      <nav data-nosnippet className="bg-background overflow-hidden flex mt-18 md:mt-0 border-b border-border">
        <div className="max-w-6xl mx-auto flex text-xs font-sans-elegant tracking-[0.15em] uppercase text-foreground overflow-x-auto whitespace-nowrap">
          {categories.map((category) => {
            return (
              <Link
                key={category.slug}
                to={category.url}
                className={`hover:text-background transition-colors duration-200 px-4 py-2 hover:bg-foreground ${activeCategory?.slug === category.slug ? "bg-foreground text-background" : ""}`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div data-nosnippet className="bg-foreground text-background text-center py-2 text-xs tracking-wider font-sans-elegant flex items-center justify-center gap-2">
        <span>ENVÍO GRATIS A PARTIR DE $60.000</span>
        <Truck className="inline w-4 h-4 mb-[2px]" />
      </div>

      {/* Overlay y menú lateral - Minimalist */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={handleCloseMenu}
        ></div>
      )}

      <aside className={`fixed top-0 left-0 md:w-80 w-full h-dvh overflow-y-auto 
        bg-background shadow-xl z-50 p-6 flex flex-col gap-4 transition-transform duration-500
        ${isMenuOpen ? "translate-x-0" : "-translate-x-[100%]"}
        `}>
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
          <h2 className="font-sans-elegant text-lg uppercase tracking-wider text-foreground">
            Menú
          </h2>
          <button
            onClick={handleCloseMenu}
          >
            <X
              size={22}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            />
          </button>
        </div>

        {isAuthenticated ? (
          <div className="flex flex-col font-sans-elegant gap-4">
            <Link
              to="/user/profile"
              className="flex items-center gap-3 text-foreground"
              onClick={handleCloseMenu}
            >
              <img
                src={(user && user.avatar) ?? "/assets/user.png"}
                width={24}
                height={24}
                alt="Avatar del usuario"
                className="rounded-full border border-border object-cover aspect-square"
              />
              <span className="font-medium">
                {(user && user.name) || "Sin Nombre"}{" "}
                {(user && user.lastname) || "Sin Nombre"}
              </span>
            </Link>
            <Link
              to="/"
              onClick={handleCloseMenu}
              className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-200"
            >
              <Home size={18} /> Inicio
            </Link>
            {userRole === "seller" && (
              <Link
                to="/seller/dashboard"
                onClick={handleCloseMenu}
                className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-200"
              >
                <LayoutDashboard size={18} /> Panel Vendedor
              </Link>
            )}
            {userRole === "buyer" && (
              <Link
                to="/buyer/orders"
                onClick={handleCloseMenu}
                className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-200"
              >
                <ShoppingBag size={18} /> Mis Compras
              </Link>
            )}
            <button
              onClick={() => setIsTabOpen(!isTabOpen)}
              className="flex items-center justify-between gap-3 text-foreground hover:text-muted-foreground transition-colors duration-200"
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
              <div className="grid grid-cols-5 gap-0.5">
                {cleanedProducts
                  ? cleanedProducts.map((product) => {
                    const images = JSON.parse(product.image || "[]");
                    return (
                      <Link
                        key={product.id}
                        to={`/products/category/${product.category}`}
                        onClick={handleCloseMenu}
                        className="flex items-center text-foreground hover:text-muted-foreground transition-colors duration-200"
                      >
                        <picture className="relative hover:brightness-125 hover:scale-101">
                          <div className="absolute top-0 left-0 w-full h-full bg-zinc-950/50" />
                          <img
                            src={`${images[0]}`}
                            width={80}
                            height={80}
                            className="aspect-[2/4] object-cover"
                          />
                          <small className="capitalize text-[10px] absolute bottom-0 left-[50%] translate-x-[-50%] text-white">
                            {product.category}
                          </small>
                        </picture>
                      </Link>
                    )
                  })
                  : null}
              </div>
            )}
            <ThemeSwitch />
            <button
              onClick={() => {
                onLogout();
                handleCloseMenu();
              }}
              className="flex items-center gap-3 text-destructive hover:underline mt-4 pt-4 border-t border-border"
            >
              <LogOut size={18} /> Salir
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 font-sans-elegant">
              <Link
                to="/login"
                onClick={handleCloseMenu}
                className="text-foreground hover:underline"
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                onClick={handleCloseMenu}
                className="text-foreground font-medium hover:underline"
              >
                Registrarse
              </Link>
            </div>
            <ThemeSwitch />
            <div className="absolute bottom-0 left-0 w-full h-16 border-t border-border">
              <div className="flex justify-between px-4 my-6">
                <h3 className="font-sans-elegant text-xs uppercase tracking-wider">
                  Síguenos por
                </h3>
                <div className="flex gap-6">
                  <a href="https://instagram.com/pascalecloset" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://facebook.com/pascalecloset" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://tiktok.com/@pascalecloset" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200">
                    <TikTokIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </header>
  );
};

export default Header;
