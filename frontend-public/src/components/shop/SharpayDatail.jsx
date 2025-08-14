import React, { useState, useRef } from "react";
import SizeSelector from "../Size";
import QuantitySelector from "../QuantitySelector";
import useDataShoppingCart from "../../components/shoppingCart/hooks/useDataShoppingCart.jsx";
import "../../styles/CamisaDetail.css";
import SuccessAlert from "../../components/SuccessAlert.jsx";

import { useNavigate } from "react-router-dom"

const CamisaDetail = ({ product }) => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(product.size?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const zoomRef = useRef(null);

  const { addToCart } = useDataShoppingCart();

  const handleSizeChange = (size) => setSelectedSize(size);
  const handleQuantityChange = (qty) => setQuantity(qty);

  const handleAddToCart = () => {
    if (!selectedSize) return;

    const productWithSize = { ...product, size: selectedSize };
    SuccessAlert("Se agregó al carrito");
    addToCart(productWithSize, quantity);
    navigate("/carrito");
  };

  // Nueva función para redirigir a la página de personalización
  const handleCustomizeShirt = () => {
    // Verifica si el objeto tiene los datos correctos
    
console.log("Funcion handleCustomizeShirt");
  const productData = {
    name: product.name,
    price: product.price,
    description: product.description,
    selectedSize,
    quantity,
  };
  
// Verifica si el objeto tiene los datos correctos
console.log("Enviando datos al navigate:", productData);

  // Navegar a /TshirtDesign con el estado del producto
  navigate("/TshirtDesign", { state: productData });
};

  const handleMouseMove = (e) => {
    const zoomContainer = zoomRef.current;
    const rect = zoomContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    zoomContainer.classList.add("active");
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

        {/* Contenedor para los botones */}
        <div className="buttons-container">
   
          
          <button className="customize-btn" onClick={handleCustomizeShirt}>
            Personaliza tu camisa
          </button>
        </div>
      </div>
    </div>
  );
};

export default CamisaDetail;