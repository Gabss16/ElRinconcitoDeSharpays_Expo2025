import React from "react";
import "../components/productCardItem.css";
import useDataShoppingCart from "./shoppingCart/hooks/useDataShoppingCart";

const ProductCartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useDataShoppingCart();

  const { product, quantity } = item;
  const { _id, name, price, image, description, size, flavor } = product;

  const handleIncrement = () => updateQuantity(product, quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product, quantity - 1);
    } else {
      removeFromCart(product);
    }
  };

  return (
    <div className="cart-card">
      <div className="cart-image">
        <img src={image} alt={name} />
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
  );
};

export default ProductCartItem;
