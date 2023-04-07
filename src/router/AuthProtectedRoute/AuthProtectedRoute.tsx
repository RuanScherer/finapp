import { useAuth } from "@contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { AuthProtectedRouteProps } from "./AuthProtectedRoute.types";

export function AuthProtectedRoute({ children }: AuthProtectedRouteProps) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}
