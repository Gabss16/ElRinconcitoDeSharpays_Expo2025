import React from "react";
import { useNavigate } from "react-router-dom";
import useDataShoppingCart from "../components/shoppingCart/hooks/useDataShoppingCart.jsx";
import ProductCartItem from "../components/productCardItem.jsx";
import CircularGallery from "../components/reactBits/CircularGallery.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import CheckoutPage from "./CheckOut.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";
import "../styles/ShoppingCart.css";
import { Link } from "react-router-dom";

const ShoppingCartPage = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    total,
    createOrderFromCart,
    clearCart,
    moveCartToOrderDetail,
  } = useDataShoppingCart();

  const subtotal = total;
  const deliveryFee = 0;
  const finalTotal = subtotal + deliveryFee;

  const { user, isLoggedIn } = useAuth();
  const customerId = user?._id || user?.id;

  const handleCreateOrder = () => {
    if (!isLoggedIn) {
      ErrorAlert("Debes iniciar sesión para crear una orden");
      return;
    }

    if (cartItems.length === 0) return;

    const orderDetail = {
      items: cartItems,
      total,
      customerId,
    };

    localStorage.setItem("OrderDetail", JSON.stringify(orderDetail));
    console.log("das")
    navigate("/checkOut");
  };

  return (
    <div className="shopping-cart-page">
      <div className="carousel-wrapper">
        <CircularGallery />
      </div>

      <div className="cart-content">
        <h2 className="cart-title-main">Carrito de Compras</h2>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Tu carrito está vacío.</p>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-section">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <ProductCartItem key={item.product._id} item={item} />
                ))}
              </div>
            </div>

          </div>
        )}
        {cartItems.length > 0 ? (<Link type="submit" className="purchase-button text-center text-decoration-none text-white" to={"/checkOut"} onClick={handleCreateOrder}>
              Comprar
            </Link> ) : null}
      </div>
    </div>
  );
};

export default ShoppingCartPage;
