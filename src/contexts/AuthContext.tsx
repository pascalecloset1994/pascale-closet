import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { showDialog } from "../components/common/Dialog";
import { useLocation } from "./LocationContext";
import { toast } from "../components/common/Toast";

const BACK_URL = import.meta.env.VITE_BACK_API_URL;

export interface User {
  user_id: string;
  name: string;
  lastname: string;
  email: string;
  role: "seller" | "buyer";
  avatar?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  address?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

interface RegisterFormData {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string;
  user: User | null;
  error: string;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (formData: RegisterFormData) => Promise<void>;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  setUser: Dispatch<SetStateAction<User | null>>;
  recoveryPassword: (email: string) => Promise<{ success: boolean }>;
  resetPassword: (password: string) => Promise<{ success: boolean }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { ip, city, country } = useLocation();

  const refreshUser = useCallback(async () => {
    try {
      const response = await fetch(`${BACK_URL}/api/user/profile`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401) {
        setIsAuthenticated(false);
        setUser(null);
        setUserRole("");
        return;
      }

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setUser(data.user);
      setUserRole(data.user?.role);
      setIsAuthenticated(true);
    } catch {
      // nunca invalidar sesión por error de red
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${BACK_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setUser(data.user);
      setUserRole(data.user?.role);
      setIsAuthenticated(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData: RegisterFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACK_URL}/api/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          ip,
          city,
          country,
          postalCode: city.postalCode,
        }),
      });
      const data = await response.json();

      if (response.status === 409) {
        return showDialog({ content: <div>{data.message}</div> });
      }

      setIsLoading(false);
      setUser(data);
      showDialog({ content: <div>{data.message}</div> });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await fetch(`${BACK_URL}/api/user/logout`, {
        method: "GET",
        credentials: "include",
      });
    } finally {
      setIsLoading(false);
      setUser(null);
      setIsAuthenticated(false);
      setUserRole("");
      setError("");
    }
  };

  const recoveryPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BACK_URL}/api/user/recovery-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast({ message: data.message });
      return { success: true };
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error desconocido");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (password: string) => {
    try {
      const res = await fetch(`${BACK_URL}/api/user/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast({ message: data.message });
      return { success: true };
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error desconocido");
      return { success: false };
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    userRole,
    user,
    error,
    login,
    logout,
    register,
    isLoading,
    refreshUser,
    setUser,
    recoveryPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
