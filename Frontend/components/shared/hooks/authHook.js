import { useState, useEffect } from "react";
import cookies from "next-cookies";
export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function login(token, userId) {
    setToken(token);
    setUserId(userId);
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
    localStorage.setItem("user", userId);
  }
  function logout() {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");

    if (token) {
      login(token, userId);
    }
  }, [isLoggedIn]);

  return { token, userId, login, logout };
};
