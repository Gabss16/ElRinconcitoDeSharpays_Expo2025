import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext"; // Ajusta la ruta según tu proyecto
import { Alert } from "react-native";

export const useEmployee = () => {
  const { userId, authToken, API } = useContext(AuthContext);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función para obtener los datos del empleado
  const getEmployee = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await fetch(`${API}/employees/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener empleado");
      }

      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      console.error("Error fetching employee:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }, [userId, authToken, API]);

  // Función para actualizar el empleado (PUT)
  const saveEmployee = useCallback(
    async (employeeData) => {
      if (!userId) return false;

      setLoading(true);
      try {
        const response = await fetch(`${API}/employees/${userId}`, {
          method: "PUT", // Cambiado a PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(employeeData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error al actualizar empleado");
        }

        setEmployee(data);
        Alert.alert("Perfil actualizado correctamente");
        return true;
      } catch (error) {
        console.error("Error updating employee:", error);
        Alert.alert("Error", error.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [userId, authToken, API]
  );

  // Cargar el empleado automáticamente cuando cambia el userId
  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

  return { employee, loading, getEmployee, saveEmployee };
};
