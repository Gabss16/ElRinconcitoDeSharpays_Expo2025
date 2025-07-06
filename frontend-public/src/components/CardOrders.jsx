import React from "react";
import orderslogo from "../assets/orderslogoprofile.png";
import "../styles/CardOrders.css";

const CardOrders = () => {
  return (
    <div className="card-orders">
      <div className="card-orders__header"></div>
      <div className="card-orders__body">
        <img src={orderslogo} alt="No tienes pedidos" className="card-orders__image" />
             <p className="card-orders__text">No tienes pedidos</p>
      </div>
    </div>
  );
};

export default CardOrders;
