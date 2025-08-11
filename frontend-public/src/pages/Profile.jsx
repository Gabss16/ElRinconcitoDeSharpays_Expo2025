import React from "react";
import CardOrders from "../components/CardOrders.jsx";
import CardPersonalInformation from "../components/CardPersonalInformation.jsx";
import CardUbication from "../components/CardUbication.jsx";
import CardImage from "../components/CardImageProfile.jsx";
import useDataShoppingCart from "../components/shoppingCart/hooks/useDataShoppingCart.jsx"; // ¡Importa el hook!
import "../styles/Profile.css";

const Profile = () => {
  const { cartItems } = useDataShoppingCart(); // Obtiene los items del carrito

  return (
    <div className="profile-container">
      <main className="flex-grow-1 d-flex justify-content-start">
        {/* Pasa cartItems como prop */}
        <CardOrders cartItems={cartItems || []} /> {/* Fallback con array vacío */}
        <CardUbication />
        <CardPersonalInformation />
        <CardImage />
      </main>
    </div>
  );
};

export default Profile;