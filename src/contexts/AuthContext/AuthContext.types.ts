import { ReactNode } from "react";

export interface AuthContextType {
  user: UserType | undefined;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export type UserType = {
  id: string;
  name: string;
  avatar: string | null;
  username?: string;
};

export interface AuthContextProviderProps {
  children: ReactNode;
}
