// src/components/CardProduct.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import CartButton from "../CartButton";
import "../../styles/CardProduct.css";


const CardProduct = ({ producto }) => {
     
  const navigate = useNavigate();

  const handleProductInfo = () => {
    navigate(`/sharpays/${producto._id.$oid || producto._id}`);
  };

  return (
    
    <div className="product-card" onClick={handleProductInfo}>
      <div className="product-image-container">
        <img src={producto.image} alt={producto.name} className="product-img" />
        <CartButton onClick={() => console.log("Agregar al carrito")} />
      </div>
      
      <p className="product-name">{producto.name}</p>
      <p className="product-price">${parseFloat(producto.price).toFixed(2)}</p>
    </div>
  );
};

export default CardProduct;
