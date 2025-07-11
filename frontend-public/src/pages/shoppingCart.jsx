import React from "react";
import useDataShoppingCart from "../components/shoppingCart/hooks/useDataShoppingCart.jsx";
import ProductCartItem from "../components/productCardItem.jsx";
import { useAuth } from "../context/AuthContext";
import CarouselCard from "../components/carouselCard.jsx";
import "../styles/shoppingCart.css";

const ShoppingCartPage = () => {
  const {
    cartItems,
    total,
    createOrderFromCart,
    clearCart,
    loading,
  } = useDataShoppingCart();

  const { user, isLoggedIn } = useAuth();
  const customerId = user?._id || user?.id;

  const handleCreateOrder = async () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para crear una orden");
      return;
    }
    if (cartItems.length === 0) return;

    try {
      await createOrderFromCart(customerId);
      clearCart();
    } catch (err) {
      console.error("Error al crear orden:", err);
    }
  };

  return (
    <div className="shopping-cart-page">
      <div className="carousel-wrapper">
        <CarouselCard />
      </div>

      <div className="cart-content">
        <h2 className="cart-title">Carrito de Compras</h2>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <ProductCartItem key={item.product._id} item={item} />
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total: <span>${total.toFixed(2)}</span></h3>
              <button
                className="create-order-button"
                onClick={handleCreateOrder}
                disabled={loading}
              >
                {loading ? "Procesando..." : "Crear Orden"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;
