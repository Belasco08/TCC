// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  nome: string;
  email: string;
  foto?: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, jwtToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // ==== EVITA TRAVAMENTO DE LOADING INFINITO ====
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser && typeof parsedUser === "object") {
          setUser(parsedUser);
          setToken(storedToken);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar AuthContext:", err);
      localStorage.clear(); // limpa se estiver corrompido
    }
  }, []);

  const login = (userData: User, jwtToken: string) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
