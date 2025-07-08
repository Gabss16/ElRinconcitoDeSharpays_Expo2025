import React, { useState } from "react";
import SizeSelector from "../Size";
import QuantitySelector from "../QuantitySelector";
import "../../styles/CamisaDetail.css";

const CamisaDetail = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.size?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (size) => setSelectedSize(size);
  const handleQuantityChange = (qty) => setQuantity(qty);

  const handleAddToCart = () => {
    alert(
      `Añadiste ${quantity} camisa(s) talla ${selectedSize} al carrito. (Aquí iría la lógica real)`
    );
  };

  return (
    <div className="camisa-detail-wrapper">
      <div className="camisa-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="camisa-image"
          loading="lazy"
        />
      </div>
      <div className="camisa-info-container">
        <h1 className="camisa-name">{product.name}</h1>
        <p className="camisa-description">{product.description}</p>
        <p className="camisa-price">${product.price.toFixed(2)}</p>

        <SizeSelector
          sizes={product.size}
          selectedSize={selectedSize}
          onChange={handleSizeChange}
        />

        <QuantitySelector
          max={product.stock}
          quantity={quantity}
          onChange={handleQuantityChange}
        />

        <button className="add-cart-btn" onClick={handleAddToCart}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default CamisaDetail;
