import { useToast } from "@hooks/useToast";
import { fauna } from "@services/faunadb";
import { query as q } from "faunadb";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import {
  AuthContextProviderProps,
  AuthContextType,
  UserType,
} from "./AuthContext.types";

const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserType>();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(startSession);
    return () => unsubscribe();
  }, []);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    startSession(user);
    navigate("/dashboard", { replace: true });
  }

  async function startSession(user: User | null) {
    if (!user) return;

    const isUserAllowed = await checkIsUserAllowed(user.email);
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
  }

  async function checkIsUserAllowed(userEmail: string | null) {
    if (!userEmail) return false;

    try {
      const allowedUser = await fauna.query<{ data: any[] }>(
        q.Paginate(q.Match(q.Index("allowed_user_by_email"), userEmail), {
          size: 1,
        })
      );
      return !!allowedUser.data.length;
    } catch (error) {
      toast({
        title: "Erro ao verificar permissão do usuário.",
        description:
          "Ocorreu um erro ao verificar se o usuário tem permissão para usar o FinApp. Por favor, tente novamente mais tarde.",
        status: "error",
      });
      return false;
    }
  }

  function fillUserData(user: User) {
    const { displayName, photoURL, uid } = user;

    if (!displayName) {
      throw new Error("Missing information from Google Account");
    }

    setUser({
      id: uid,
      name: displayName,
      avatar: photoURL,
    });
  }

  async function signOut() {
    await firebaseSignOut(auth);
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
