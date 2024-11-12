import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getToken, saveToken } from '../pages/Auth/lib/action';
import { JwtPayload, jwtDecode } from "jwt-decode";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  loginContext: (token: string) => void;
  logoutContext: () => void;
  role: string | null;
  isLoading: boolean;
  setRole: (role: string) => void;
  setUser: (user: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  interface DecodedToken extends JwtPayload {
    role: string;
  }

  const checkAuth = () => {
    const token = getToken();
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUser(decoded);
        setRole(decoded.role);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
        setRole(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setRole(null);
    }
    setIsLoading(false);
  };

  const loginContext = (token: string) => {
    saveToken(token, "local");
    checkAuth();
  };

  const logoutContext = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loginContext, logoutContext, role, isLoading, setRole, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
