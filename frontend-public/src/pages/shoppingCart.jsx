import React from "react";
import useDataShoppingCart from "../components/shoppingCart/hooks/useDataShoppingCart.jsx";
import ProductCartItem from "../components/productCardItem.jsx";
import { useAuth } from "../context/AuthContext";

const ShoppingCartPage = () => {
  const {
    cartItems,
    total,
    createOrderFromCart,
    clearCart,
    loading,
  } = useDataShoppingCart();

  const { user, isLoggedIn } = useAuth();

  // Usar el id del usuario logueado para el customerId
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
    <div className="cart-container">
      <h2>Carrito de Compras</h2>

      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <ProductCartItem key={item.product._id} product={item.product} />
          ))}

          <div className="cart-summary">
            <h3>Total: ${total.toFixed(2)}</h3>
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
  );
};

export default ShoppingCartPage;
