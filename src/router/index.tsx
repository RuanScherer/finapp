import { Container } from "@components/Container";
import { Header } from "@components/Header";
import { AuthContextProvider, useAuth } from "@contexts/AuthContext";
import { TransactionsViewContextProvider } from "@contexts/TransactionsViewContext/TransactionsViewContext";
import { Dashboard } from "@pages/Dashboard";
import { SignIn } from "@pages/SignIn";
import { NewTransaction } from "@pages/Transaction/New";
import { TransactionsView } from "@pages/Transaction/View";
import { ReactNode } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

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
            element={
              <PublicOnlyRoute>
                <Outlet />
              </PublicOnlyRoute>
            }
          >
            <Route index element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>

          <Route
            element={
              <Container>
                <Header />
                <Outlet />
              </Container>
            }
          >
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
                  <TransactionsViewContextProvider>
                    <TransactionsView />
                  </TransactionsViewContextProvider>
                </AuthProtectedRoute>
              }
            />
          </Route>

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
