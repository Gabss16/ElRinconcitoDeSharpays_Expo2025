import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useDataOrders = () => {
  const API_ORDERS = "http://localhost:4000/api/orders";
  const API_CREATE_FROM_CART = "http://localhost:4000/api/createOrderFromCart/create-from-cart";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorOrder, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_ORDERS);
      if (!res.ok) throw new Error("Error al obtener órdenes");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
      toast.error("Error al cargar órdenes");
    } finally {
      setLoading(false);
    }
  };

  const createOrderFromCart = async (customerId) => {
    setLoading(true);
    try {
      const res = await fetch(API_CREATE_FROM_CART, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId }),
      });

      if (!res.ok) throw new Error("Error al crear orden desde el carrito");

      const createdOrder = await res.json();
      toast.success("Orden creada correctamente desde el carrito");
      setSuccess("Orden creada desde el carrito");
      fetchOrders();
      return createdOrder;
    } catch (err) {
      setError(err.message);
      toast.error("Error al crear orden desde el carrito");
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (orderId, updatedFields) => {
    try {
      const res = await fetch(`${API_ORDERS}/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (!res.ok) throw new Error("Error al actualizar orden");

      toast.success("Orden actualizada");
      fetchOrders();
    } catch (err) {
      setError(err.message);
      toast.error("Error al actualizar orden");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const res = await fetch(`${API_ORDERS}/${orderId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar orden");

      toast.success("Orden eliminada correctamente");
      fetchOrders();
    } catch (err) {
      setError(err.message);
      toast.error("Error al eliminar orden");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    errorOrder,
    success,
    fetchOrders,
    createOrderFromCart,
    updateOrder,
    deleteOrder,
  };
};

export default useDataOrders;
