// src/components/CartButton.jsx
import React, { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import "../styles/CartButton.css";

const CartButton = ({ onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="cart-button-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={(e) => {
        e.stopPropagation(); // evita navegación
        onClick && onClick();
      }}
    >
      <FaShoppingBag className="cart-icon" />
      {showTooltip && <div className="cart-tooltip">Agregar al carrito</div>}
    </div>
  );
};

export default CartButton;
