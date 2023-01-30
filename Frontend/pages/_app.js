import "@/styles/globals.css";
import { AuthContext } from "@/components/shared/context/authContext";
import { useAuth } from "@/components/shared/hooks/authHook";
export default function App({ Component, pageProps }) {
  const { token, userId, login, logout } = useAuth();

  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          userId,
          isLoggedIn: !!token,
          login,
          logout,
        }}
      >
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  );
}
