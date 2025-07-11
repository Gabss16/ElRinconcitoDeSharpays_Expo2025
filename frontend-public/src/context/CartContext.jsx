import React, { createContext, useContext } from "react";
import useDataShoppingCart from "../components/shoppingCart/hooks/useDataShoppingCart.jsx";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cart = useDataShoppingCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
