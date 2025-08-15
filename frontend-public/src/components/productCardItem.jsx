import React, { useState } from "react";
import "../components/productCardItem.css";
import useDataShoppingCart from "./shoppingCart/hooks/useDataShoppingCart";
import trashIcon from "../assets/trashIcon.png";

const ProductCartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useDataShoppingCart();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { product, quantity } = item;
  const {
    _id,
    name,
    price,
    image,
    description,
    size,
    flavor,
    customDesign,
    duaData,
  } = product;

  // Determinar la imagen a mostrar
  const productImage =
    duaData?.carnetImage ||
    customDesign ||
    image ||
    "https://via.placeholder.com/160x200?text=Sin+Foto";

  // Abrir o cerrar preview
  const togglePreview = () => setIsPreviewOpen(!isPreviewOpen);

  return (
    <>
      <div className="cart-card">
        <div className="cart-image">
          <img
            src={productImage}
            alt={name}
            onClick={togglePreview}
            style={{ cursor: "pointer" }} // para que se note que es clickeable
          />
        </div>

        <div className="cart-info">
          <h4 className="cart-title">{name}</h4>
          {description && <p className="cart-description">{description}</p>}
          {size && (
            <p style={{ fontSize: "13px", marginTop: "4px" }}>
              <strong>Talla:</strong> {size}
            </p>
          )}
          {flavor && (
            <p style={{ fontSize: "13px", marginTop: "4px" }}>
              <strong>Sabor:</strong> {flavor}
            </p>
          )}

          <div className="cart-qty-price">
            <div className="cart-price">${(price * quantity).toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* ✅ Modal de vista previa */}
      {isPreviewOpen && (
        <div
          className="image-preview-overlay"
          onClick={togglePreview}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <img
            src={productImage}
            alt="Vista previa"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              boxShadow: "0 0 15px rgba(255,255,255,0.4)",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
    </>
  );
};

export default ProductCartItem;
