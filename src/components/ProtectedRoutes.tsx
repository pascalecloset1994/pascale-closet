import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { type ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRole?: "buyer" | "seller" | string;
}

/**
 * Componente para rutas protegidas
 * @param {React.ReactNode} children
 * @param {string} allowedRoute roles permitidos 'buyer' o 'seller'
 * @returns {React.ReactNode}
 */
export const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};
