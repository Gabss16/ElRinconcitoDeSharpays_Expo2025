import { useState } from "react";

const API_CREATE_ORDER = "http://localhost:4000/api/createOrderFromCart/create-from-cart";

const useDataShoppingCart = () => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("shoppingCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveToLocalStorage = (items) => localStorage.setItem("shoppingCart", JSON.stringify(items));

  const addToCart = (product, quantity = 1, options = {}) => {
    const key = `${product._id}_${options.size || ""}_${options.flavor || ""}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.key === key);
      let updatedCart;
      if (existing) {
        updatedCart = prev.map(item => item.key === key ? { ...item, quantity: item.quantity + quantity } : item);
      } else {
        const newItem = { key, product, quantity, options };
        updatedCart = [...prev, newItem];
      }
      saveToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (key) => {
    const updatedCart = cartItems.filter(item => item.key !== key);
    setCartItems(updatedCart);
    saveToLocalStorage(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("shoppingCart");
  };

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // 🔹 Crear orden desde el carrito (el backend sube las imágenes)
  const createOrderFromCart = async (customerId, shippingAddress, status = "pendiente") => {
    setLoading(true);
    setError(null);
  
    try {
      const products = cartItems.map(item => {
        // Si es DUA, usar carnetImage como image
        let imageUrl = item.product.image;
        if (item.product.duaData) {
          imageUrl = item.product.duaData.carnetImage || item.product.customDesign || null;
        }
  
        return {
          productId: item.product._id.startsWith("custom-") ? null : item.product._id,
          categoryId: item.product.categoryId?._id || null,
          productName: item.product.name,
          unitPrice: item.product.price,
          image: imageUrl,
          customDesign: item.product.customDesign || null,
          duaData: item.product.duaData || null,
          quantity: item.quantity,
          totalPrice: item.product.price * item.quantity,
          discount: 0
        };
      });
  
      const payload = { customerId, products, shippingAddress, status };
  
      const res = await fetch(API_CREATE_ORDER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error al crear la orden desde el carrito");
      }
  
      const data = await res.json();
      clearCart();
      return data;
    } catch (err) {
      console.error("❌ Error al crear orden:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  

  return {
    cartItems,
    total,
    loading,
    error,
    addToCart,
    removeFromCart,
    clearCart,
    createOrderFromCart
  };
};

export default useDataShoppingCart;
