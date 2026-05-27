import { useCallback } from "react";
import { setAuthTokenGetter } from "@workspace/api-client-react";

setAuthTokenGetter(() => localStorage.getItem("admin_token"));

export function useAdminAuth() {
  const login = useCallback((newToken: string) => {
    localStorage.setItem("admin_token", newToken);
    setAuthTokenGetter(() => localStorage.getItem("admin_token"));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    setAuthTokenGetter(null);
  }, []);

  return {
    login,
    logout,
    isAuthenticated: !!localStorage.getItem("admin_token"),
  };
}
