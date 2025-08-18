import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import ErrorAlert from "../components/ErrorAlert";

// Creamos el contexto
const AuthContext = createContext(null);

// Exportamos el contexto para que pueda ser importado por useAuth.js
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCookie, setauthCookie] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const API_URL = "http://localhost:4000/api";

  const navigate = useNavigate();

  // Función para limpiar sesión
  const clearSession = () => {
    localStorage.removeItem("token");
    Cookies.remove("authToken", { path: "/" });
    setUser(null);
    setauthCookie(null);
    setIsLoggedIn(false);
  };

  const logout = useCallback(() => {
    const logoutUser = async () => {
      try {
        await fetch(`${API_URL}/logOut`, {
          method: "POST",
          credentials: "include",
        });
      } catch (error) {
        console.error("Error during logout:", error);
      } finally {
        clearSession();
        navigate("/elRinconcitoDeSharpays");
      }
    };

    logoutUser();
  }, [API_URL, navigate]);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login/public`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setauthCookie(data.token);
        setUser({
          id: data.userId,
          name: data.name,
          email: data.email,
          userType: data.userType,
          image: data.image,
        });
        setIsLoggedIn(true);
        return { success: true, message: data.message };
      } else {
        // No establecer la sesión si hay error
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, message: "Error de conexión" };
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const cookieToken = Cookies.get("authToken");

        if (token || cookieToken) {
          const response = await fetch(`${API_URL}/Products`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token || cookieToken}`,
            },
            credentials: "include",
          });

          if (response.ok) {
            try {
              const tokenParts = (token || cookieToken).split(".");
              if (tokenParts.length === 3) {
                const payload = JSON.parse(atob(tokenParts[1]));
                setUser({
                  id: payload.id,
                  name: payload.name,
                  email: payload.email,
                  department: payload.department, // Agregar el departamento al payload
                  image: payload.image,
                });
                setauthCookie(token || cookieToken);
                setIsLoggedIn(true);
              } else {
                clearSession();
              }
            } catch (e) {
              console.error("Error decoding token:", e);
              clearSession();
            }
          } else {
            clearSession();
          }
        } else {
          clearSession();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        clearSession();
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authCookie,
        login,
        logout,
        isLoggedIn,
        API: API_URL,
        clearSession, // Opcional si quieres usar desde otros componentes
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);