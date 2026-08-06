import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // LOGIN
  // =========================
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    // Save JWT Token
    localStorage.setItem("token", data.token);

    // Set Logged In User
    setUser({
      _id: data._id,
      name: data.name,
      email: data.email,
      profileImage: data.profileImage || "",
    });

    return data;
  };

  // =========================
  // REGISTER
  // =========================
  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    // Registration ke baad JWT Token save hoga
    localStorage.setItem("token", data.token);

    // User ko immediately login kar do
    setUser({
      _id: data._id,
      name: data.name,
      email: data.email,
      profileImage: data.profileImage || "",
    });

    return data;
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // =========================
  // GET CURRENT USER
  // =========================
  const getMe = async () => {
    try {
      const { data } = await api.get("/auth/me");

      setUser(data);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CHECK LOGIN ON PAGE LOAD
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getMe();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
