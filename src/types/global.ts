/**
 * Definiciones de tipos globales del proyecto.
 *
 * Re-exporta las interfaces principales desde los contextos
 * para un acceso centralizado en toda la aplicación.
 */

// ─── Auth ───────────────────────────────────────────────
export type { User } from "../contexts/AuthContext";

// ─── Cart ───────────────────────────────────────────────
export type { CartItem } from "../contexts/CartContext";

// ─── Orders ─────────────────────────────────────────────
export type { Order, OrderItem } from "../contexts/OrderContext";

// ─── Products ───────────────────────────────────────────
export type { Product } from "../contexts/ProductContext";

// ─── User / Seller ──────────────────────────────────────
export type { HeroData, FooterData } from "../contexts/UserContext";

// ─── Formularios ────────────────────────────────────────

export interface UserProfileFormData {
  name: string;
  lastname: string;
  email: string;
  avatar: string;
  city: string;
  country: string;
  postalCode: string;
  address: string;
  image: File | null;
  phone: string;
}

export interface HeroFormData {
  heroCollection: string;
  heroTitle: string;
  heroSubTitle: string;
  heroUrlImage: string | File;
}

export interface FooterFormData {
  title: string;
  location: string;
  schedule: string;
  footerUrlImage: string | File;
}

export interface DiscountContentProps {
  discount_is_active: boolean;
  discount: number;
  discount_description: string;
  discount_updated_at: Date | string | number;
  message?: string | Error;
}

// ─── Utilidades ─────────────────────────────────────────

/** Respuesta genérica de la API */
export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
  error?: string;
}
