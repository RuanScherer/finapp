import { useToast } from "@hooks/useToast";
import { supabase } from "@services/supabase";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthContextProviderProps,
  AuthContextType,
  UserType,
} from "./AuthContext.types";

const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserType>();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION" || event === "USER_UPDATED") {
        startSession(session?.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      toast({
        title: "Erro ao fazer login com o Google.",
        description:
          "Ocorreu um erro ao fazer login com o Google. Por favor, tente novamente mais tarde.",
        status: "error",
      });
      return;
    }
  }

  async function startSession(user?: User) {
    if (!user) return;

    const isUserAllowed = await checkIsUserAllowed(user?.email);
    if (!isUserAllowed) {
      toast({
        title: "Usuário sem permissão para usar o FinApp.",
        description: "O usuário não tem permissão para usar o FinApp.",
        status: "error",
      });
      await signOut();
      return;
    }

    fillUserData(user);
    navigate("/dashboard");
  }

  async function checkIsUserAllowed(userEmail?: string) {
    if (!userEmail) return false;

    const { error, count: isUserAllowed } = await supabase
      .from("allowed_users")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("email", userEmail);

    if (error) {
      toast({
        title: "Erro ao verificar permissão do usuário.",
        description:
          "Ocorreu um erro ao verificar se o usuário tem permissão para usar o FinApp. Por favor, tente novamente mais tarde.",
        status: "error",
      });
      return false;
    }

    return !!isUserAllowed;
  }

  function fillUserData(user: User) {
    const { id, user_metadata } = user;

    if (!user_metadata.full_name) {
      throw new Error("Informacões faltando na conta do usuário.");
    }

    setUser({
      id,
      name: user_metadata.full_name,
      avatar: user_metadata.avatar_url,
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
