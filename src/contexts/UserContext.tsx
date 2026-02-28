import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { showDialog } from "../components/common/Dialog";
import { useAuth, type User } from "./AuthContext";
import { toast } from "../components/common/Toast";
import {
  FooterFormData,
  HeroFormData,
  UserProfileFormData,
} from "../types/global";

const BACK_URL = import.meta.env.VITE_BACK_API_URL;

export interface HeroData {
  id: number;
  hero_collection: string;
  hero_title: string;
  hero_subtitle: string;
  url_image: string;
  created_at?: string;
  updated_at?: string;
}

export interface FooterData {
  id: number;
  title: string;
  location: string;
  schedule: string;
  url_image: string;
  created_at?: string;
  updated_at?: string;
}

interface PartialFormData {
  address: string;
  phone: string;
  state: string;
}

interface UserContextType {
  error: string | Error;
  isLoading: boolean;
  deleteUser: () => Promise<void>;
  updateUser: (form: UserProfileFormData) => Promise<User | undefined>;
  getUserById: (id: string) => boolean | null;
  getUserHero: () => Promise<void>;
  heroData: HeroData | null;
  updateUserHero: (form: HeroFormData) => Promise<void>;
  updatePartialInformation: (formData: PartialFormData) => Promise<void>;
  footerData: FooterData | null;
  getUserFooter: () => Promise<void>;
  updateUserFooter: (form: FooterFormData) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | Error>("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();
  const [heroData, setHero] = useState<HeroData | null>(null);
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  const getUserHero = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACK_URL}/user/user_hero`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        return showDialog({ content: <div>{data.message}</div> });
      }

      setHero(data.hero);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : "Error desconocido");
    } finally {
      setIsLoading(false);
      setError("");
    }
  }, []);

  const updateUserHero = useCallback(
    async (form: HeroFormData) => {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("heroCollection", form.heroCollection);
      formData.append("heroTitle", form.heroTitle);
      formData.append("heroSubTitle", form.heroSubTitle);
      formData.append("heroUrlImage", form.heroUrlImage);

      try {
        const response = await fetch(`${BACK_URL}/user/user_hero/1`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          return showDialog({ content: <div>{data.message}</div> });
        }

        setHero(data.hero);

        toast({ timer: 4, tunner: 20, message: <div>{data.message}</div> });
      } catch (err: unknown) {
        setError(err instanceof Error ? err : "Error desconocido");
      } finally {
        setIsLoading(false);
        setError("");
      }
    },
    [getUserHero],
  );

  const getUserFooter = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACK_URL}/user/user_footer`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setFooterData(data.footer);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUserFooter = useCallback(
    async (form: FooterFormData) => {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("location", form.location);
      formData.append("schedule", form.schedule);
      formData.append("footerUrlImage", form.footerUrlImage);

      try {
        const response = await fetch(`${BACK_URL}/user/user_footer/1`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          return showDialog({ content: <div>{data.message}</div> });
        }

        setFooterData(data.footer);

        toast({ timer: 4, tunner: 20, message: <div>{data.message}</div> });
      } catch (err: unknown) {
        setError(err instanceof Error ? err : "Error desconocido");
      } finally {
        setIsLoading(false);
        setError("");
      }
    },
    [getUserHero],
  );

  useEffect(() => {
    getUserHero();
    getUserFooter();
  }, [getUserHero, getUserFooter]);

  const getUserById = (id: string) => {
    return user ? user.user_id === id : null;
  };

  const updateUser = async (form: UserProfileFormData) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("lastname", form.lastname);
    formData.append("email", form.email);
    formData.append("city", form.city || "");
    formData.append("postalCode", form.postalCode || "");
    if (form.image) formData.append("image", form.image);
    formData.append("address", form.address || "");
    formData.append("phone", form.phone || "");
    try {
      const response = await fetch(`${BACK_URL}/user/update`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const updatedUser = await response.json();

      return updatedUser;
    } catch (err: unknown) {
      setError(err instanceof Error ? err : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePartialInformation = async (formData: PartialFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${BACK_URL}/user/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          address: formData.address,
          phone: formData.phone,
          state: formData.state,
        }),
      });
      const updatedData = await response.json();
      if (!response.ok) {
        throw new Error(updatedData.message);
      }

      setUser(updatedData.user);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : "Error desconocido");
    } finally {
      setIsLoading(false);
      setError("");
    }
  };

  const deleteUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACK_URL}/user/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const deletedUser = await response.json();
      if (!response.ok) {
        return showDialog({ content: <div>{deletedUser.message}</div> });
      }
      showDialog({ content: <div>{deletedUser.message}</div> });
      setUser(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : "Error desconocido");
    } finally {
      setIsLoading(false);
      setError("");
    }
  };

  const values: UserContextType = {
    error,
    isLoading,
    deleteUser,
    updateUser,
    getUserById,
    getUserHero,
    heroData,
    updateUserHero,
    updatePartialInformation,
    getUserFooter,
    footerData,
    updateUserFooter,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("El contexto debe ser usado dentro del Provider");
  }
  return context;
};
