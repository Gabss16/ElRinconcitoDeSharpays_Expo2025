import React from "react";
import "../styles/QuantitySelector.css";

const QuantitySelector = ({ quantity, max, onChange }) => {
  const decrement = () => {
    if (quantity > 1) onChange(quantity - 1);
  };
  const increment = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  return (
    <div className="quantity-selector">
      <label>Cantidad:</label>
      <div className="qty-controls">
        <button type="button" onClick={decrement} disabled={quantity <= 1}>
          -
        </button>
        <input
          type="number"
          value={quantity}
          min="1"
          max={max}
          onChange={(e) => {
            let val = parseInt(e.target.value, 10);
            if (isNaN(val)) val = 1;
            if (val > max) val = max;
            if (val < 1) val = 1;
            onChange(val);
          }}
        />
        <button type="button" onClick={increment} disabled={quantity >= max}>
          +
        </button>
      </div>
      <small>{max} unidades disponibles</small>
    </div>
  );
};

export default QuantitySelector;
