import { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Alert } from "react-native";

export const useOrders = () => {
  const { authToken, API } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Obtener todas las órdenes
  const getOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al obtener órdenes");
      }

      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }, [API, authToken]);

  // Actualizar estado de una orden
  const updateOrderStatus = useCallback(
    async (orderId, newStatus) => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/orders/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ status: newStatus }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Error al actualizar orden");
        }

        // Actualizar localmente la lista de órdenes
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );

        Alert.alert("Éxito", "Estado de la orden actualizado");
      } catch (error) {
        console.error("Error al actualizar orden:", error);
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    },
    [API, authToken]
  );

  // Cargar órdenes al montar el componente
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return { orders, loading, getOrders, updateOrderStatus };
};
