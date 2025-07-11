import React from "react";
import useDataShoppingCart from "../components/shoppingCart/hooks/useDataShoppingCart.jsx";
import ProductCartItem from "../components/productCardItem.jsx";
import PaymentMethod from "../components/PaymentMethod.jsx";
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

  const handleCreateOrder = async (paymentMethod) => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para crear una orden");
      return;
    }
    if (cartItems.length === 0) return;

    try {
      // Aquí puedes agregar la lógica para el método de pago seleccionado
      console.log("Método de pago seleccionado:", paymentMethod);
      await createOrderFromCart(customerId);
      clearCart();
    } catch (err) {
      console.error("Error al crear orden:", err);
    }
  };

  
  const subtotal = total;
  const deliveryFee = 0; 
  const discount = 0;
  const finalTotal = subtotal + deliveryFee - discount;

  return (
    <div className="shopping-cart-page">
      <div className="carousel-wrapper">
        <CarouselCard />
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

            <div className="payment-section">
              <PaymentMethod
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                discount={discount}
                total={finalTotal}
                onCreateOrder={handleCreateOrder}
                loading={loading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;