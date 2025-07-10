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

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      let updatedCart;
      if (existing) {
        updatedCart = prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prev, { product, quantity: 1 }];
      }
      saveToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.product._id !== productId);
    setCartItems(updatedCart);
    saveToLocalStorage(updatedCart);
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.product._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
    saveToLocalStorage(updatedCart);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cartItems
      .map((item) =>
        item.product._id === productId
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
