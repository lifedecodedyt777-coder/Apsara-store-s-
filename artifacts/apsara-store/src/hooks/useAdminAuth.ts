import { useState, useCallback, useEffect } from "react";
import { setAuthTokenGetter } from "@workspace/api-client-react";

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("admin_token");
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("admin_token", token);
      setAuthTokenGetter(() => token);
    } else {
      localStorage.removeItem("admin_token");
      setAuthTokenGetter(null);
    }
  }, [token]);

  // Initializing auth token getter outside useEffect is also good
  if (typeof window !== "undefined") {
    setAuthTokenGetter(() => localStorage.getItem("admin_token"));
  }

  const login = useCallback((newToken: string) => {
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  return {
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };
}