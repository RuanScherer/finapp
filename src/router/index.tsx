import { Container } from "@components/Container";
import { Header } from "@components/Header";
import { AuthContextProvider } from "@contexts/AuthContext";
import { TransactionsViewContextProvider } from "@contexts/TransactionsViewContext";
import { Dashboard } from "@pages/Dashboard";
import { SignIn } from "@pages/SignIn";
import { NewTransaction } from "@pages/Transaction/New";
import { TransactionsView } from "@pages/Transaction/View";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { AuthProtectedRoute } from "./AuthProtectedRoute";
import { PublicOnlyRoute } from "./PublicOnlyRoute";

export function Router() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          {/* === Public Routes === */}
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

          {/* === Private Routes === */}
          <Route
            element={
              <AuthProtectedRoute>
                <Outlet />
              </AuthProtectedRoute>
            }
          >
            <Route
              element={
                <>
                  <Header />
                  <Container>
                    <Outlet />
                  </Container>
                </>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />

              <Route
                path="/transactions"
                element={
                  <TransactionsViewContextProvider>
                    <TransactionsView />
                  </TransactionsViewContextProvider>
                }
              />
            </Route>

            <Route path="/transaction/new" element={<NewTransaction />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
