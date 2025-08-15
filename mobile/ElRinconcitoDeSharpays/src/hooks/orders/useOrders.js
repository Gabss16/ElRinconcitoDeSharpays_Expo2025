// hooks/useOrders.js
import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../../config.js";

const useOrders = () => {
  const [orders, setOrders] = useState([]); // Siempre arreglo para evitar errores con .filter()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las órdenes
  const getOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/orders`);
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

      const data = await res.json();

      // Verificamos si la API devuelve arreglo directo o dentro de un objeto
      if (Array.isArray(data)) {
        setOrders(data);
      } else if (Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error al obtener órdenes:", err);
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar estado de una orden
  const updateOrderStatus = useCallback(async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

      const updatedOrder = await res.json();

      // Actualizamos el estado local
      setOrders((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (err) {
      console.error("Error al actualizar orden:", err);
      setError(err.message);
    }
  }, []);

  // Ejecutar getOrders al montar el hook
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return {
    orders,
    loading,
    error,
    getOrders,
    updateOrderStatus,
  };
};

export default useOrders;
