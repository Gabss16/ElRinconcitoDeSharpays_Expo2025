import React, { createContext, useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const AuthContext = createContext(null);
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = "http://192.168.1.18:4000/api";

  useEffect(() => {
  const loadToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  };
  loadToken();
}, []);


  const clearSession = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
    setAuthToken(null);
  };

  const logout = useCallback(async () => {
    try {
      await fetch(`${API_URL}/logOut`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      await clearSession();
      Alert.alert("Sesión cerrada correctamente");
    }
  }, [API_URL]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("token", data.token);
        setAuthToken(data.token);
        console.log(data)
        setUser(data.userName);
        Alert.alert("Inicio de sesión exitoso");
        return true; // El componente que llama decide redirigir
      } else {
        Alert.alert(data.message || "Error al iniciar sesión");
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Error con el servidor");
      return false;
    }
  };

  /*
  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/registerClients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Alert.show("Cuenta registrada correctamente.");
        return true;
      } else {
        const data = await response.json();
        Alert.show(data.message || "Error al registrar");
        return false;
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      Alert.show("Error de conexión al registrar.");
      return false;
    }
  };*/

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        loading,
        login,
        logout,
        //register,
        API: API_URL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};