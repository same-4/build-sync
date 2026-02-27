import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USER: User = {
  email: "pm@buildsync.com",
  name: "Alex Morgan",
  role: "project_manager",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("buildsync_user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    if (email && password.length >= 4) {
      const u = { ...DEMO_USER, email, name: email.split("@")[0] };
      setUser(u);
      localStorage.setItem("buildsync_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("buildsync_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
