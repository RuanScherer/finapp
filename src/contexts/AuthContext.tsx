import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

interface AuthContextType {
  user: UserType | undefined;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

type UserType = {
  id: string;
  name: string;
  avatar: string | null;
  username?: string;
};

type FirestoreUser = {
  username?: string;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserType>();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(fillUserData);
    return () => unsubscribe();
  }, []);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    fillUserData(user);
    navigate("/dashboard", { replace: true });
  }

  function fillUserData(user: User | null) {
    if (!user) return;

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
