import React from "react";
import "../components/productCardItem.css";
import useDataShoppingCart from "./shoppingCart/hooks/useDataShoppingCart";

const ProductCartItem = ({ product }) => {
  const { updateQuantity, removeFromCart, cart } = useDataShoppingCart();

  const { _id, name, price, image, description } = product;
  const quantity = cart[_id]?.quantity || 1;

  const handleIncrement = () => updateQuantity(_id, quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(_id, quantity - 1);
    } else {
      removeFromCart(_id);
    }
  };

  return (
    <div className="cart-card">
      <div className="cart-image">
        <img src={image} alt={name} />
      </div>

      <div className="cart-info">
        <h4 className="cart-title">{name}</h4>
        <p className="cart-description">{description}</p>
        <div className="cart-qty-price">
          <div className="cart-qty-controls">
            <button onClick={handleDecrement}>–</button>
            <span>{quantity}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
          <div className="cart-price">${(price * quantity).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCartItem;
