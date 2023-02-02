import { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContextProvider, useAuth } from "../contexts/AuthContext";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { NewTransaction } from "../pages/Transaction/New";

interface PublicOnlyRouteProps {
  children: ReactNode;
}

function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { user } = useAuth();
  if (user) return <Navigate to="/home" replace />;
  return <>{children}</>;
}

interface AuthProtectedRouteProps {
  children: ReactNode;
}

function AuthProtectedRoute({ children }: AuthProtectedRouteProps) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export function Router() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route
            index
            element={
              <PublicOnlyRoute>
                <SignIn />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicOnlyRoute>
                <SignIn />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/home"
            element={
              <AuthProtectedRoute>
                <Home />
              </AuthProtectedRoute>
            }
          />
          <Route
            path="/transaction/new"
            element={
              <AuthProtectedRoute>
                <NewTransaction />
              </AuthProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
