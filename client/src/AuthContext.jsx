import { createContext, useEffect, useState } from "react";
import { api } from "./api";

export const AuthCtx = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // On mount, fetch current user
  useEffect(() => {
    api.get("/auth/me")
      .then(res => setUser(res.data.user))
      .catch(() => console.log('Server not running - demo mode'))
      .finally(() => setReady(true));
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setUser(data.user);
    } catch (err) {
      // Throw error to catch in Login.jsx
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      const { data } = await api.post("/auth/signup", { name, email, password, role });
      setUser(data.user);
    } catch (err) {
      // Throw error to catch in Signup.jsx
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.log("Logout error", err);
    }
  };

  return (
    <AuthCtx.Provider value={{ user, ready, login, signup, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
