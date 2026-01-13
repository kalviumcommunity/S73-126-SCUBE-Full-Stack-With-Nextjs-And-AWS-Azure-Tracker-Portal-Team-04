"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  accessToken: string | null;
  login: () => Promise<void>;
  logout: () => void;
  fetchWithAuth: (url: string) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Simulated login
  const login = async () => {
    // Mock access token (15 min expiry simulated)
    const mockAccessToken = "mock-access-token";
    setAccessToken(mockAccessToken);

    console.log("Access token issued");
    console.log("Refresh token stored as HTTP-only cookie (simulated)");
  };

  const logout = () => {
    setAccessToken(null);
    console.log("User logged out, tokens cleared");
  };

  // Simulated refresh token call
  const refreshAccessToken = async () => {
    console.log("Access token expired, refreshing...");
    const newAccessToken = "new-mock-access-token";
    setAccessToken(newAccessToken);
    return newAccessToken;
  };

  const fetchWithAuth = async (url: string) => {
    let res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 401) {
      const newToken = await refreshAccessToken();
      res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      });
    }

    return res;
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
