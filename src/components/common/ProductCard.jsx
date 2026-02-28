import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { toast } from "./Toast";
import { ShoppingBag } from "lucide-react";
import { Loader } from "lucide-react";

export const ProductCard = ({ product }) => {
  const { addToCart, cartItems, getStockFromProduct, discount, isLoading } =
    useCart();

  const currentCartItem = cartItems.find((it) => it.id === product.id);
  const currentQty = currentCartItem ? currentCartItem.quantity : 0;
  const stock = getStockFromProduct(product);
  const isSoldOut = typeof stock === "number" && stock <= 0;
  const cannotAddMore = typeof stock === "number" && currentQty >= stock;

  const handleAddWithSize = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSoldOut || cannotAddMore) {
      toast({
        message: <div>No hay suficiente stock disponible</div>,
        timer: 6,
        tunner: 20,
      });
      return;
    }
    const ok = addToCart({ ...product, selectedSize: size }, 1);
    if (!ok) {
      toast(<div>No se pudo agregar, no hay stock suficiente.</div>);
    } else {
      toast({
        timer: 4,
        tunner: 8,
        message: (
          <div className="flex gap-2 items-center">
            <ShoppingBag />
            Agregado al carrito:
            <span className="font-semibold">{product.name}</span> - Talla {size}
          </div>
        ),
      });
    }
  };

  console.log;

  return (
    <div className="group bg-white h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="block relative">
        {/* Imagen del producto */}
        <div className="relative w-full aspect-[3/4] bg-[#F5F0EB] overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#E0D6CC] text-4xl">
              👗
            </div>
          )}

          {/* Badge de oferta */}
          {discount > 0 && (
            <div className="absolute top-1 left-1">
              <small className="text-[10px] px-1 py-0.5 bg-zinc-950/80 text-white tracking-wide">%{discount} OFF</small>
            </div>
          )}

          {isLoading && (
            <div className="absolute top-1/2 left-1/2">
              <Loader className="animate-spin" />
            </div>
          )}

          {/* Tallas en hover - superpuestas en la imagen */}
          <div className="absolute -bottom-[1px] left-0 right-0 bg-white/10 backdrop-blur-sm py-6 px-2 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300">
            <div className="flex justify-center ">
              {["XS", "S", "M", "L", "XL"].map((size) => {
                const currentSizes =
                  product.size.split(",").map((s) => s.trim().toUpperCase()) ||
                  [];
                const isAvailable = currentSizes.includes(size);

                return (
                  <button
                    key={size}
                    onClick={(e) => handleAddWithSize(e, size)}
                    disabled={isSoldOut || cannotAddMore || !isAvailable}
                    className={`px-4 py-4 text-[12
                    px] font-sans-elegant uppercase tracking-wider transition-all duration-200 ${
                      isSoldOut || cannotAddMore
                        ? "border-[#E0D6CC] text-[#CCC] cursor-not-allowed bg-white"
                        : "border-[#E0D6CC] text-[#2C2420] hover:bg-[#2C2420] hover:text-white hover:border-[#2C2420] bg-white"
                    }
                  ${isAvailable ? "font-semibold" : " line-through text-gray-400 cursor-not-allowed"}
                  `}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Link>

      {/* Info del producto */}
      <div className="pt-3 space-y-3 text-center bg-[#FAF8F5]">
        <h3 className="font-sans-elegant font-bold text-[14px] uppercase tracking-wider text-[#2C2420] line-clamp-1 leading-tight">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-2">
          {product.originalPrice && (
            <span className="text-[11px] text-[#999] line-through font-sans-elegant">
              ${product.originalPrice.toLocaleString("es-CL")}
            </span>
          )}
          {discount > 0 && (
            <span className="text-[10px] text-muted-foreground font-sans-elegant line-through">
              ${product.price.toLocaleString("es-CL")}
            </span>
          )}
          <span className="flex gap-2 text-[12px] font-sans-elegant text-white bg-[#2C2420] font-light p-1">
            {discount > 0 && <span>-10%</span>}$
            {discount > 0
              ? Math.abs(
                  Number(product.price) - (Number(product.price) * discount) / 100,
                ).toLocaleString("es-CL")
              : Number(product.price).toLocaleString("es-CL")}{" "}
            CLP
          </span>
        </div>
      </div>
    </div>
  );
};
