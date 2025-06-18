"use client";

import {
  decryptToken,
  loadUserSessionFromCookies,
} from "@/features/authentication/lib/actions/session";
import { TokenUser } from "@/types/db";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  user: TokenUser;
  isOAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TokenUser | null>(null);
  const [isOAuth, setIsOAuth] = useState<boolean>(false);

  useEffect(() => {
    const wrapper = async () => {
      const cookie = await loadUserSessionFromCookies();
      if (cookie) {
        const session = await decryptToken(cookie);
        if (session) {
          setUser(session.user);
          setIsOAuth(session.isOAuth);
        }
      }
    };
    wrapper();
  }, []);

  if (user === null) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isOAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthContext");
  }
  return context;
};
