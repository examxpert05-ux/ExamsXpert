import { createContext, useEffect, useState } from "react";
import { api } from "./api";

export const AuthCtx = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api.get("/auth/me")
      .then(res => setUser(res.data.user))
      .catch(() => console.log('Server not running - demo mode'))
      .finally(()=>setReady(true));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setUser(data.user);
  };
  const signup = async (name, email, password, role) => {
    const { data } = await api.post("/auth/signup", { name, email, password, role });
    setUser(data.user);
  };
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return <AuthCtx.Provider value={{ user, ready, login, signup, logout }}>
    {children}
  </AuthCtx.Provider>;
}
