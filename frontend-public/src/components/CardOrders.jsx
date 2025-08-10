import React from "react";
import orderslogo from "../assets/orderslogoprofile.png";
import "../styles/CardOrders.css";

const CardOrders = ({ cartItems = [] }) => {
  return (
    <div className="card-orders">
      <div className="card-orders__header">
        <h2 className="header-title">Pedidos</h2>
      </div>
      <div className="card-orders__body">
        {cartItems.length === 0 ? (
          <>
            <img src={orderslogo} alt="No tienes pedidos" className="card-orders__image" />
            <p className="card-orders__text">No tienes pedidos</p>
          </>
        ) : (
          <div className="orders-list">
            {cartItems.map((item, index) => (
              <div key={index} className="order-item">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="order-item-image"
                />
                <div className="order-item-details">
                  <p className="order-item-name">{item.product.name}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.product.price * item.quantity}</p>
                  {item.options?.size && <p>Tamaño: {item.options.size}</p>}
                  {item.options?.flavor && <p>Sabor: {item.options.flavor}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardOrders;