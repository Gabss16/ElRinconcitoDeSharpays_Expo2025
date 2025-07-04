import { useState, useEffect } from "react";

const API_URL = "http://localhost:4000/api/orders";

const useDataOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Obtener todos los pedidos
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      setMessage("Error al obtener pedidos.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Crear pedido
  const createOrder = async (order) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("¡Pedido creado exitosamente!");
        fetchOrders();
      } else {
        setMessage(data.message || "Error al crear el pedido.");
      }
    } catch (error) {
      setMessage("Error de conexión.");
    }
    setLoading(false);
  };

  // Actualizar pedido
  const updateOrder = async (id, updatedOrder) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrder),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Pedido actualizado correctamente.");
        fetchOrders();
      } else {
        setMessage(data.message || "Error al actualizar el pedido.");
      }
    } catch (error) {
      setMessage("Error de conexión.");
    }
    setLoading(false);
  };

  // Eliminar pedido
  const deleteOrder = async (id) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessage("Pedido eliminado correctamente.");
        fetchOrders();
      } else {
        setMessage("Error al eliminar el pedido.");
      }
    } catch (error) {
      setMessage("Error de conexión.");
    }
    setLoading(false);
  };

  return {
    orders,
    loading,
    message,
    setMessage,
    fetchOrders,
    createOrder,
    updateOrder,
    deleteOrder,
  };
};

export default useDataOrders;
