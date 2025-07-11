import { useState, useEffect } from "react";

const API_PRODUCTS = "http://localhost:4000/api/products";
const API_CATEGORIES = "http://localhost:4000/api/categories";

const useProductsWithCategories = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [resProducts, resCat] = await Promise.all([
        fetch(API_PRODUCTS),
        fetch(API_CATEGORIES),
      ]);

      if (!resProducts.ok || !resCat.ok) throw new Error("Error cargando datos");

      const [productsData, categoriesData] = await Promise.all([
        resProducts.json(),
        resCat.json(),
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { products, categories, loading, error, refresh: fetchAll };
};

export default useProductsWithCategories;
