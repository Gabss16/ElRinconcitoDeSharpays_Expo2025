import { useState, useEffect } from "react";


const API_ORDERS = "http://localhost:4000/api/orders";
const API_CATEGORIES = "http://localhost:4000/api/categories";

const useOrdersWithCategories = () => {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [resOrders, resCat] = await Promise.all([
        fetch(API_ORDERS),
        fetch(API_CATEGORIES),
      ]);
    
      const [ordersData, categoriesData] = await Promise.all([
        resOrders.json(),
        resCat.json(),
      ]);
      setOrders(ordersData);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error("Error cargando pedidos o categorías");
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



      const updatedOrder = await res.json();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, ...updatedOrder } : order
        )
      );

      toast.success("Orden actualizada");
    } catch (err) {
      setError(err.message);
      toast.error("Error al actualizar orden");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { orders, categories, loading, error, refresh: fetchAll, updateOrder };
};

export default useOrdersWithCategories;
