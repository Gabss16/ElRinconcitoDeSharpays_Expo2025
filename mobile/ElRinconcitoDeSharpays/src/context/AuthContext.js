import React, { createContext, useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const AuthContext = createContext(null);
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = "http://10.10.4.21:4000/api";

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("user");
        const storedUserImage = await AsyncStorage.getItem("userImage");
        
        if (token && token !== 'undefined') {
          setAuthToken(token);
        }
        if (storedUser && storedUser !== 'undefined') {
          setUser(storedUser);
        }
        if (storedUserImage && storedUserImage !== 'undefined') {
          setUserImage(storedUserImage);
        }
      } catch (error) {
        console.error("Error loading stored data:", error);
      }
    };
    loadStoredData();
  }, []);

  const clearSession = async () => {
    await AsyncStorage.multiRemove(["token", "user", "userImage"]);
    setUser(null);
    setUserImage(null);
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
      const response = await fetch(`${API_URL}/login/private`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar token solo si existe
        if (data.token) {
          await AsyncStorage.setItem("token", data.token);
          setAuthToken(data.token);
        }
        
        // Guardar name (no userName) solo si existe y no es undefined
        if (data.name && data.name !== undefined) {
          await AsyncStorage.setItem("user", data.name);
          setUser(data.name);
        }
        
        // Guardar la imagen de perfil si viene en la respuesta
        if (data.image && data.image !== undefined) {
          await AsyncStorage.setItem("userImage", data.image);
          setUserImage(data.image);
        }
        
        console.log("Datos recibidos del servidor:", data);
        Alert.alert("Inicio de sesión exitoso");
        return true;
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

  return (
    <AuthContext.Provider
      value={{
        user,
        userImage,
        authToken,
        loading,
        login,
        logout,
        API: API_URL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};