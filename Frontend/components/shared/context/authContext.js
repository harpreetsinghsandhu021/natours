import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
