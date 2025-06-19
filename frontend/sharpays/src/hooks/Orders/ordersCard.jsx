import React from "react";
import CustomButton from "./CustomButton";
import "../styles/OrderCard.css";

const OrderCard = ({ order }) => {
  const { orderDetails, total, status, customerId } = order;

  return (
    <div className="order-card">
      <div className="order-header">
        <div className="avatar">{customerId.name?.slice(0, 2).toUpperCase()}</div>
        <div>
          <p className="customer-name">{customerId.name}</p>
          <p className="order-id">Orden #{order._id.slice(-4)}</p>
        </div>
        <span className={`status-badge ${status}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>Productos</th>
            <th>Cant.</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((item, i) => (
            <tr key={i}>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>${item.unitPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="order-total">
        <strong>Total:</strong> ${total.toFixed(2)}
      </div>

      <div className="order-actions">
        <CustomButton text="Ver detalles" background="#fff" color="#000" border="1px solid #ccc" />
        <CustomButton text="Marcar como entregado" background="#000" color="#fff" />
      </div>
    </div>
  );
};

export default OrderCard;
