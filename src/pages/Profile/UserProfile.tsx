import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { showDialog, closeDialog } from "../../components/common/Dialog";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";
import { Loader } from "../../components/common/Loader";
import {
  Camera,
  User,
  Mail,
  Trash2,
  Edit3,
  X,
  Map,
  MapPin,
  Signpost,
  Heart,
  ShoppingCart,
  VerifiedIcon,
  History,
} from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useProducts } from "../../contexts/ProductContext";
import { Navigate } from "react-router-dom";
import { FrontPageForm } from "./components/FrontPageForm";
import { FooterForm } from "./components/FooterForm";
import { DiscountForm } from "./components/DiscountForm";
import { formatDate } from "../../utils/formatDate";
import { toast } from "../../components/common/Toast";
import type {
  UserProfileFormData,
  HeroFormData,
  FooterFormData,
  DiscountContentProps,
} from "../../types/global";
import { MapPinHouse } from "lucide-react";

const defaultAvatar = "/assets/user.png";

export const UserProfile = () => {
  const { user, refreshUser } = useAuth();
  const {
    deleteUser,
    updateUser,
    isLoading,
    heroData,
    updateUserHero,
    footerData,
    updateUserFooter,
    getUserHero,
    getUserFooter,
    error,
  } = useUser();
  const {
    addToCart,
    discountContent,
    updateDiscountContent,
    getDiscountContent,
  } = useCart();
  const { favorites, removeFromFavorites, clearFavoriteItems } = useProducts();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const saveRef = useRef<HTMLDivElement | null>(null);
  const [_checked, setChecked] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserProfileFormData>({
    name: user?.name || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    city: user?.city || "",
    country: user?.country || "",
    postalCode: user?.postal_code || "",
    address: user?.address || "",
    image: null,
    phone: user?.phone || "",
  });
  const [heroFormData, setHeroFormData] = useState<HeroFormData>({
    heroCollection: heroData?.hero_collection || "",
    heroTitle: heroData?.hero_title || "",
    heroSubTitle: heroData?.hero_subtitle || "",
    heroUrlImage: heroData?.hero_url_image || "",
  });
  const [imageHeroPreview, setHeroPreview] = useState<string | null>(null);
  const [imageFooterPreview, setFooterPreview] = useState<string | null>(null);
  const [footerFormData, setFooterFormData] = useState<FooterFormData>({
    title: footerData?.footer_title || "",
    location: footerData?.footer_location || "",
    schedule: footerData?.footer_schedule || "",
    footerUrlImage: footerData?.footer_url_image || "",
  });
  const [discountFormData, setDiscountFormData] =
    useState<DiscountContentProps>({
      discount: discountContent?.discount || 0,
      discount_description: discountContent?.discount_description || "",
      discount_is_active: discountContent?.discount_is_active || false,
      discount_updated_at: discountContent?.discount_updated_at || new Date(),
    });

  // Sync local form when remote data loads
  useEffect(() => {
    if (discountContent) {
      setDiscountFormData({
        discount: discountContent.discount,
        discount_description: discountContent.discount_description,
        discount_is_active: discountContent.discount_is_active,
        discount_updated_at: discountContent.discount_updated_at,
      });
      setChecked(discountContent.discount_is_active);
    }
  }, [discountContent]);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSelectedItem, setIsSelectedItem] = useState<
    "usuario" | "información"
  >("usuario");
  const [selectedEdition, setSelectedEdition] = useState<
    "hero" | "footer" | "discount"
  >("hero");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeDiscountContent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDiscountFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUser(formData);
    setIsEditing(false);
    setTimeout(async () => {
      await refreshUser();
    }, 300);
    showDialog({
      title: "¡Listo!",
      content: (
        <div className="text-center py-2">
          <div className="w-12 h-12 bg-secondary  flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-muted-foreground font-sans-elegant">
            Tu perfil ha sido actualizado correctamente.
          </p>
        </div>
      ),
    });
  };

  const checkFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showDialog({
        title: "Error",
        content: (
          <p className="text-muted-foreground font-sans-elegant">
            Por favor selecciona un archivo de imagen válido.
          </p>
        ),
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showDialog({
        title: "Error",
        content: (
          <p className="text-muted-foreground font-sans-elegant">
            La imagen no debe superar los 5MB.
          </p>
        ),
      });
      return;
    }
  }

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    checkFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    saveRef &&
      saveRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    checkFile(file);
    setHeroPreview(URL.createObjectURL(file));
    setHeroFormData((prev) => ({ ...prev, heroUrlImage: file }));
  };

  const handleDeleteUser = () => {
    showDialog({
      title: "Eliminar cuenta",
      content: (
        <div className="text-center">
          <div className="w-16 h-16 bg-secondary  flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-foreground" />
          </div>
          <p className="text-foreground font-sans-elegant font-medium mb-2">
            ¿Estás segura de eliminar tu cuenta?
          </p>
          <p className="text-sm text-muted-foreground font-sans-elegant mb-6">
            Esta acción no se puede deshacer. Se eliminarán todos tus datos
            permanentemente.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={closeDialog}
              className="px-5 py-2.5 border border-border text-muted-foreground font-sans-elegant text-xs tracking-wide uppercase hover:bg-secondary transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                await deleteUser();
                await refreshUser();
                closeDialog();
              }}
              className="px-5 py-2.5 bg-foreground text-background font-sans-elegant text-xs tracking-wide uppercase hover:opacity-80 transition-all duration-200"
            >
              Eliminar cuenta
            </button>
          </div>
        </div>
      ),
    });
  };

  const handleAddToCart = () => {
    favorites.map((favorite) => addToCart({ ...favorite, quantity: 1 }));
    showDialog({
      content: (
        <div>
          Se han añadido {favorites.length} artículo/s al carrito de tus
          favoritos 🤎!
        </div>
      ),
    });
  };

  const handleChangeHeroData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHeroFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToUpdateHero = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserHero(heroFormData);
      setHeroFormData({
        heroCollection: "",
        heroTitle: "",
        heroSubTitle: "",
        heroUrlImage: "",
      });
      await getUserHero();
      window.scrollTo({ top: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeFooterData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFooterFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeFooterImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showDialog({
        title: "Error",
        content: (
          <p className="text-muted-foreground font-sans-elegant">
            Por favor selecciona un archivo de imagen válido.
          </p>
        ),
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showDialog({
        title: "Error",
        content: (
          <p className="text-muted-foreground font-sans-elegant">
            La imagen no debe superar los 5MB.
          </p>
        ),
      });
      return;
    }

    setFooterPreview(URL.createObjectURL(file));
    setFooterFormData((prev) => ({ ...prev, footerUrlImage: file }));
  };

  const handleToUpdateFooter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserFooter({
        title: footerFormData.title,
        location: footerFormData.location,
        footerUrlImage: footerFormData.footerUrlImage,
        schedule: footerFormData.schedule,
      });
      setFooterFormData({
        title: "",
        location: "",
        schedule: "",
        footerUrlImage: "",
      });
      await getUserFooter();
      window.scrollTo({ top: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Loader />;

  if (!user) {
    return <Navigate to="/" />;
  }

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleCheckedDiscount = (checked: boolean) => {
    setChecked(checked);
    setDiscountFormData((prev) => ({ ...prev, discount_is_active: checked }));
  };

  const handleUpdateDiscount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToUpdate: DiscountContentProps = {
      ...discountFormData,
      discount_updated_at: new Date(),
    };
    await updateDiscountContent(dataToUpdate);
    await getDiscountContent();
  };

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-12 overflow-hidden">
      {/* --- Cover Image Section (Like a Social Profile) --- */}
      <div className="bg-card border-b border-border">
        <div className="relative h-40 md:h-52 w-full bg-muted overflow-hidden">
          {/* Cover gradient/pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-muted-foreground to-primary opacity-20"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232C2420' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>
        </div>

        {/* --- Profile Header Bar --- */}
        <div className="max-w-6xl mx-auto md:px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 sm:-mt-24 pb-6 flex flex-col md:flex-row items-center md:items-end gap-6">
            {/* Avatar Circle */}
            <div className="relative group shrink-0 z-10">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-[6px] border-white shadow-lg overflow-hidden bg-secondary">
                <img
                  src={avatarPreview || user.avatar || defaultAvatar}
                  alt={`Avatar de ${user.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {isEditing && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] cursor-pointer"
                  >
                    <Camera className="w-8 h-8 text-white drop-shadow-md" />
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 p-2 bg-foreground text-background rounded-full shadow-lg border-2 border-background hover:opacity-80 transition"
                  >
                    <Camera size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Basic Info & Stats */}
            <div className="flex-1 text-center md:text-left mb-2 md:mb-6 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-sans-display text-foreground font-bold tracking-wide break-words">
                {user.name} {user.lastname}
              </h1>
              <p className="text-muted-foreground font-sans-elegant text-sm mt-1">
                {user.email}
              </p>

              <div className="flex flex-wrap gap-3 mt-3 justify-center md:justify-start">
                <span className="inline-flex items-center px-3 py-1 bg-secondary border border-border text-secondary-foreground text-xs font-sans-elegant uppercase tracking-wider ">
                  {user.role === "seller" ? (
                    <div className="flex items-center gap-1">
                      <VerifiedIcon size={20} />
                      <p>Pascale Closet</p>
                    </div>
                  ) : (
                    "Miembro Pascale Closet"
                  )}
                </span>
                {user.role === "seller" && (
                  <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider ">
                    Owner
                  </span>
                )}
              </div>
            </div>

            {/* Global Actions */}
            <div className="flex gap-3 mb-6 shrink-0">
              <button
                onClick={handleEdit}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-sans-elegant tracking-[0.1em] uppercase transition-all duration-300 ${isEditing
                    ? "bg-foreground text-background ring-2 ring-foreground ring-offset-2"
                    : "bg-card border border-border text-foreground hover:bg-background hover:border-primary"
                  }`}
              >
                <Edit3 size={14} />
                {isEditing ? "Edición Activa" : "Editar Perfil"}
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <section className="overflow-x-scroll md:overflow-x-auto">
            <div className="flex border-t border-border w-180 xl:w-full pt-1 xl:justify-between">
              <div>
                <button
                  onClick={() => setIsSelectedItem("usuario")}
                  className={`${isSelectedItem === "usuario" ? "border-t-2 bg-secondary" : ""} w-32 py-4 px-1 text-xs font-sans-elegant uppercase tracking-wider text-foreground border-primary -mt-1.5 transition hover:border-border`}
                >
                  Usuario
                </button>
                <button
                  onClick={() => setIsSelectedItem("información")}
                  className={`${isSelectedItem === "información" ? "border-t-2 bg-secondary" : ""} w-32 py-4 px-1 text-xs font-sans-elegant uppercase tracking-wider text-foreground border-primary -mt-1.5 transition hover:border-border`}
                >
                  Información
                </button>
                {user.role === "buyer" && (
                  <a
                    href="#favorites"
                    className="py-4 px-1 w-32 text-xs font-sans-elegant font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition border-t-2 border-transparent hover:border-border -mt-1.5"
                  >
                    Favoritos ({favorites?.length || 0})
                  </a>
                )}
              </div>

              {user.role === "seller" && (
                <div>
                  <button
                    onClick={() => {
                      setSelectedEdition("hero");
                      goTo("hero");
                    }}
                    className={`${selectedEdition === "hero" ? "border-t-2 border-primary bg-secondary" : ""} py-4 px-1 w-32 text-xs font-sans-elegant uppercase tracking-wider text-muted-foreground hover:text-foreground transition hover:border-border -mt-1.5`}
                  >
                    Portada
                  </button>

                  <button
                    onClick={() => {
                      setSelectedEdition("footer");
                      goTo("footer");
                    }}
                    className={`${selectedEdition === "footer" ? "border-t-2 border-primary bg-secondary" : ""} py-4 px-1 w-32 text-xs font-sans-elegant uppercase tracking-wider text-muted-foreground hover:text-foreground transition hover:border-border -mt-1.5`}
                  >
                    Pié de Página
                  </button>

                  <button
                    onClick={() => {
                      setSelectedEdition("discount");
                      goTo("discount");
                    }}
                    className={`${selectedEdition === "discount" ? "border-t-2 border-primary bg-secondary" : ""} py-4 px-1 w-32 text-xs font-sans-elegant uppercase tracking-wider text-muted-foreground hover:text-foreground transition hover:border-border -mt-1.5`}
                  >
                    Descuento
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* --- Main Content Container --- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Intro / Details */}
          <div className="lg:col-span-4 space-y-6">
            {/* About Card */}
            <div className="bg-card border border-border p-6">
              <h3 className="font-sans-elegant text-lg text-foreground font-bold mb-4">
                {isSelectedItem === "usuario" ? "Sobre Mí" : "Ubicación"}
              </h3>

              {isSelectedItem === "usuario" && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-background rounded-full text-primary">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Nombre Completo
                      </p>
                      <p className="text-foreground">
                        {user.name} {user.lastname}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-background rounded-full text-primary">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Correo Electrónico
                      </p>
                      <p className="text-foreground break-all">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-background rounded-full text-primary">
                      <Heart size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Miembro desde
                      </p>
                      <p className="text-foreground">
                        {formatDate(user.created_at as string)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-background rounded-full text-primary">
                      <History size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Actualizado el
                      </p>
                      <p className="text-foreground">
                        {formatDate(user.updated_at as string, true)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isSelectedItem === "información" && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-background rounded-full text-primary">
                      <Map size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        País
                      </p>
                      <p className="text-foreground">{user.country}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-background rounded-full text-primary">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Ciudad
                      </p>
                      <p className="text-foreground break-all">{user.city}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-background rounded-full text-primary">
                      <Signpost size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Código Postal
                      </p>
                      <p className="text-foreground">{user.postal_code}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-background rounded-full text-primary">
                      <MapPinHouse size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Dirección
                      </p>
                      <p className="text-foreground">{user.address || "Sin confirmar"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Danger Zone Card */}
            {user && user.role === "buyer" && (
              <div className="bg-card border border-border p-6 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>
              <h3 className="font-sans-elegant text-sm text-foreground font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
                <Trash2 size={16} className="text-red-500" />
                Zona de Peligro
              </h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Si eliminas tu cuenta perderás todos tus datos y favoritos
                permanentemente.
              </p>
              <button
                onClick={handleDeleteUser}
                className="w-full py-2 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Eliminar Cuenta
              </button>
            </div>
            )}
          </div>

          {/* Right Column: Feed / Forms / Favorites */}
          <div className="lg:col-span-8" ref={saveRef}>
            {/* Edit Profile Form (Only visible when Editing) */}
            {isEditing && (
              <div className="bg-card border border-border mb-6 overflow-hidden animate-fade-in-down">
                <div className="p-4 border-b border-border bg-background flex justify-between items-center">
                  <h3 className="font-sans-elegant text-sm font-bold uppercase tracking-wider text-foreground">
                    Editando Usuario
                  </h3>
                  <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold uppercase">
                    No guardado
                  </span>
                </div>
                <form onSubmit={handleUpdate} className="p-6 sm:p-8">
                  <div className="felx felx-col space-y-2 md:space-y-0 md:grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-sans-elegant text-muted-foreground uppercase tracking-wide mb-2 font-bold">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border text-foreground focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans-elegant text-muted-foreground uppercase tracking-wide mb-2 font-bold">
                        Apellido
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border text-foreground focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-sans-elegant text-muted-foreground uppercase tracking-wide mb-2 font-bold">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border text-foreground focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans-elegant text-muted-foreground uppercase tracking-wide mb-2 font-bold">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border text-foreground focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans-elegant text-muted-foreground uppercase tracking-wide mb-2 font-bold">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border text-foreground focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-sans-elegant text-muted-foreground uppercase tracking-wide mb-2 font-bold">
                        Dirección
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border text-foreground focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-border">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-foreground text-background font-sans-elegant text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:opacity-80 transition-all transform active:scale-95"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setAvatarPreview(null);
                        setFormData({
                          name: user.name || "",
                          lastname: user.lastname || "",
                          email: user.email || "",
                          avatar: user.avatar || "",
                          city: user.city || "",
                          country: user.country || "",
                          postalCode: user.postal_code || "",
                          address: user.address || "",
                          image: null,
                          phone: user.phone || "",
                        });
                      }}
                      className="px-6 py-2.5 bg-card border border-border text-muted-foreground font-sans-elegant text-xs font-bold uppercase tracking-wider hover:bg-background transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Favorites Feed  */}
            {user.role === "buyer" && (
              <div
                className="bg-card border border-border overflow-hidden"
                id="favorites"
              >
                <div className="p-4 border-b border-border flex justify-between items-center bg-card sticky top-0 z-10">
                  <h3 className="font-sans-elegant text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                    <Heart className="text-primary fill-current" size={16} />
                    Mis Favoritos
                  </h3>
                  <div className="flex gap-2">
                    {favorites && favorites.length > 0 && (
                      <>
                        <button
                          onClick={clearFavoriteItems}
                          className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          title="Borrar todos"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={handleAddToCart}
                          className="flex items-center gap-1 px-3 py-1.5 bg-foreground text-background text-[10px] font-bold uppercase tracking-wider hover:opacity-80"
                        >
                          <ShoppingCart size={12} /> Añadir Todo
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {favorites && favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {favorites.map((fav) => (
                        <div
                          key={fav.id}
                          className="group relative flex items-center gap-4 p-3 border border-border hover:shadow-md hover:border-primary transition-all bg-background"
                        >
                          <div className="w-16 h-16 shrink-0 rounded overflow-hidden bg-card border border-border">
                            <img
                              src={fav.image}
                              alt={fav.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-sans-elegant text-sm font-bold text-foreground truncate">
                              {fav.name}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              $ {fav.price}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromFavorites(fav.id)}
                            className="absolute top-2 right-2 text-border hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                          <button
                            onClick={() => {
                              addToCart({ ...fav, quantity: 1 });
                              toast({
                                timer: 4,
                                message: (
                                  <div>Producto añadido al carrito.</div>
                                ),
                              });
                            }}
                            className="absolute bottom-2 right-2 p-1.5 bg-card text-foreground border border-border  hover:bg-foreground hover:text-background transition-all shadow-sm"
                          >
                            <ShoppingCart size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-background rounded-lg border border-dashed border-border">
                      <Heart
                        size={32}
                        className="mx-auto text-border mb-3"
                      />
                      <p className="text-sm text-muted-foreground">
                        No tienes favoritos guardados aún.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Explora la tienda para añadir prendas.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Seller Hero Form */}
            {user.role === "seller" &&
              selectedEdition === "hero" &&
              heroData && (
                <div
                  className="bg-card border border-border overflow-hidden"
                  id="hero"
                >
                  <div className="p-2 px-4 border-b border-border bg-card flex justify-between items-center">
                    <h3 className="font-sans-elegant text-sm font-bold uppercase tracking-wider text-foreground">
                      Personalizar Portada
                    </h3>
                    <small className="text-yellow-800 rounded text-[10px] md:text-[12px]">
                      Actualizada el {formatDate(heroData.hero_updated_at as string, true)}
                    </small>
                  </div>
                  <div className="md:p-6">
                    <FrontPageForm
                      formData={heroFormData}
                      handleChange={handleChangeHeroData}
                      handleSubmit={handleToUpdateHero}
                      handleChangeImage={handleChangeImage}
                      heroImagePreview={imageHeroPreview}
                    />
                  </div>
                </div>
              )}

            {/* Seller Footer Form */}
            {user.role === "seller" && selectedEdition === "footer" && (
              <div
                className="bg-card border border-border overflow-hidden"
                id="footer"
              >
                <div className="p-2 px-4 border-b border-border bg-card flex justify-between items-center">
                  <h3 className="font-sans-elegant text-sm font-bold uppercase tracking-wider text-foreground">
                    Personalizar Pié de Página
                  </h3>
                  {footerData?.footer_updated_at && (
                    <small className="text-yellow-800 rounded text-[10px] md:text-[12px]">
                      Actualizada el {formatDate(footerData.footer_updated_at as string, true)}
                    </small>
                  )}
                </div>
                <div className="md:p-6">
                  <FooterForm
                    formData={footerFormData}
                    handleChange={handleChangeFooterData}
                    handleSubmit={handleToUpdateFooter}
                    handleChangeImage={handleChangeFooterImage}
                    footerImagePreview={imageFooterPreview}
                  />
                </div>
              </div>
            )}

            {/* Seller Discount Options */}
            {user.role === "seller" && selectedEdition === "discount" && (
              <div
                className="bg-card border border-border overflow-hidden"
                id="discount"
              >
                <div className="p-2 px-4 border-b border-border bg-card flex justify-between items-center">
                  <h3 className="font-sans-elegant text-sm font-bold uppercase tracking-wider text-foreground">
                    Personalizar Tarjeta de Descuento
                  </h3>
                  {discountFormData?.discount_updated_at && (
                    <small className="text-yellow-800 rounded text-[10px] md:text-[12px]">
                      Actualizada el{" "}
                      {formatDate(discountFormData.discount_updated_at as string, true)}
                    </small>
                  )}
                </div>
                <div className="md:p-6">
                  <DiscountForm
                    formData={discountFormData}
                    handleChecked={handleCheckedDiscount}
                    handleChange={handleChangeDiscountContent}
                    handleSubmit={handleUpdateDiscount}
                    isLoading={isLoading}
                  />
                  {error && (
                    <small className="text-red-400">*{error.toString()}</small>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
