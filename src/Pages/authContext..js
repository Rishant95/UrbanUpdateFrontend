import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user and token from localStorage on initial render
    const storedJwt = localStorage.getItem("jwt");
    const storedUser = localStorage.getItem("user");

    if (storedJwt && storedUser) {
      setJwt(storedJwt);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (jwt, user) => {
    setJwt(jwt);
    setUser(user);
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setJwt(null);
    setUser(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const isAuthenticated = !!jwt;

  return (
    <AuthContext.Provider value={{ user, jwt, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
