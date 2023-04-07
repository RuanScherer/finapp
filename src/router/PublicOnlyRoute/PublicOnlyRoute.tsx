import { useAuth } from "@contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { PublicOnlyRouteProps } from "./PublicOnlyRoute.types";

export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
