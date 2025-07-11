import { useState } from "react";

const API_CREATE_ORDER = "http://localhost:4000/api/createOrderFromCart/create-from-cart";

const useDataShoppingCart = () => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("shoppingCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("shoppingCart", JSON.stringify(items));
  };

  const addToCart = (product, quantity = 1, options = {}) => {
    const key = `${product._id}_${options.size || ""}_${options.flavor || ""}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      let updatedCart;

      if (existing) {
        updatedCart = prev.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem = {
          key,
          product,
          quantity,
          options
        };
        updatedCart = [...prev, newItem];
      }

      saveToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (key) => {
    const updatedCart = cartItems.filter((item) => item.key !== key);
    setCartItems(updatedCart);
    saveToLocalStorage(updatedCart);
  };

  const incrementQuantity = (key) => {
    const updatedCart = cartItems.map((item) =>
      item.key === key
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
    saveToLocalStorage(updatedCart);
  };

  const decrementQuantity = (key) => {
    const updatedCart = cartItems
      .map((item) =>
        item.key === key
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    saveToLocalStorage(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("shoppingCart");
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const createOrderFromCart = async (customerId) => {
    setLoading(true);
    try {
      const res = await fetch(API_CREATE_ORDER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId }),
      });

      if (!res.ok) throw new Error("Error al crear orden desde el carrito");

      const data = await res.json();
      clearCart();
      return data;
    } catch (err) {
      setError(err.message);
      console.error("❌", err.message);
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
    incrementQuantity,
    decrementQuantity,
    clearCart,
    createOrderFromCart,
  };
};

export default useDataShoppingCart;
