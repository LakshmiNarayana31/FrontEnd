import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { CURRENT_USER } from "../data/mockData";

interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  avatar: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "workforce_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  async function login(email: string, password: string): Promise<boolean> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Demo credentials: demo / demo
    if (email === "demo" && password === "demo") {
      setUser(CURRENT_USER);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(CURRENT_USER));
      return true;
    }

    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
