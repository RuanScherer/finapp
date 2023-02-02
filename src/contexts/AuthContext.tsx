import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../services/firebase";

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
    const { user: googleUser } = await signInWithPopup(auth, provider);
    const firestoreUser = await getUserRecordOnFirestore(googleUser);
    fillUserData({ ...googleUser, username: firestoreUser?.username });
    navigate("/home", { replace: true });
  }

  async function getUserRecordOnFirestore(user: User) {
    const userRef = doc(firestore, `users/${user.uid}`);
    const userSnapshot = await getDoc<FirestoreUser>(userRef);
    const userData = userSnapshot.data();
    return userData;
  }

  function fillUserData(user: (User & { username?: string }) | null) {
    if (!user) return;

    const { displayName, photoURL, uid, username } = user;

    if (!displayName) {
      throw new Error("Missing information from Google Account");
    }

    setUser({
      id: uid,
      name: displayName,
      avatar: photoURL,
      username,
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
