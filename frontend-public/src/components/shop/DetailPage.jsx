import React, { useState, useRef } from "react";
import QuantitySelector from "../QuantitySelector";
import useDataShoppingCart from "../../components/shoppingCart/hooks/useDataShoppingCart.jsx";
import "../../styles/CamisaDetail.css";

const CamisaDetail = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.size?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  const zoomRef = useRef(null);

  const { addToCart } = useDataShoppingCart();

  const handleSizeChange = (size) => setSelectedSize(size);
  const handleQuantityChange = (qty) => setQuantity(qty);

  const handleAddToCart = () => {
    if (!selectedSize) return; 
    const productWithSize = { ...product, size: selectedSize };
    addToCart(productWithSize, quantity);
  };

  const handleMouseMove = (e) => {
    const zoomContainer = zoomRef.current;
    const rect = zoomContainer.getBoundingClientRect();

    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Activa la clase para zoom
    zoomContainer.classList.add("active");

    // Ajusta el origen de la transformación para que el zoom siga el mouse
    zoomContainer.querySelector("img").style.transformOrigin = `${xPercent}% ${yPercent}%`;
  };

  const handleMouseLeave = () => {
    const zoomContainer = zoomRef.current;
    zoomContainer.classList.remove("active");
    zoomContainer.querySelector("img").style.transformOrigin = `center center`;
  };

  return (
    <div className="camisa-detail-wrapper">
      <div className="camisa-image-container">
        <div
          className="camisa-image-wrapper zoom-container"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={zoomRef}
        >
          <img
            src={product.image}
            alt={product.name}
            className="camisa-image"
            loading="lazy"
          />
        </div>
      </div>
      <div className="camisa-info-container">
        <h1 className="camisa-name">{product.name}</h1>
        <p className="camisa-description">{product.description}</p>
        <p className="camisa-price">${product.price.toFixed(2)}</p>

        {/* No tienes un selector visible para talla aquí, por eso no llamo handleSizeChange */}

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
