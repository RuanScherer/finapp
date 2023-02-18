import { AuthContextProvider, useAuth } from "@contexts/AuthContext";
import { Dashboard } from "@pages/Dashboard";
import { SignIn } from "@pages/SignIn";
import { NewTransaction } from "@pages/Transaction/New";
import { TransactionsView } from "@pages/Transaction/View";
import { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

interface PublicOnlyRouteProps {
  children: ReactNode;
}

function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
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
            path="/dashboard"
            element={
              <AuthProtectedRoute>
                <Dashboard />
              </AuthProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <AuthProtectedRoute>
                <TransactionsView />
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
