import { useState, useEffect } from "react";
import toast from "react-hot-toast";

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
      if (!resOrders.ok || !resCat.ok) throw new Error("Error cargando datos");
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

  useEffect(() => {
    fetchAll();
  }, []);

  return { orders, categories, loading, error, refresh: fetchAll };
};

export default useOrdersWithCategories;
