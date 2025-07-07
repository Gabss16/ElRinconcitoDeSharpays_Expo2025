import React from "react";
import "../styles/SizeSelector.css";

const SizeSelector = ({ sizes = [], selectedSize, onChange }) => {
  return (
    <div className="size-selector">
      <label>Talla:</label>
      <div className="size-options">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            className={`size-btn ${size === selectedSize ? "selected" : ""}`}
            onClick={() => onChange(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
