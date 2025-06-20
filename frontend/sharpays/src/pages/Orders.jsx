import React, { useState } from "react";
import "../styles/Orders.css";
import Sidebar from "../components/Sidebar";
import CustomTitle from "../components/CustomTitle";
import OrderCard from "../components/Orders/ordersCard";
import useOrders from "../components/Orders/hook/useOrders";

const Orders = () => {
  const { orders, loading, error } = useOrders();
  const [activeStore, setActiveStore] = useState("Todos");

  const stores = ["Todos", "El rinconcito de Sharpay", "Bougies", "FrostyBites", "El Rincon de Dios"];

  const filteredOrders = activeStore === "Todos"
    ? orders
    : orders.filter((order) => order.storeName === activeStore);

  return (
  <div className="orders-page">
    <Sidebar />

    <div className="orders-wrapper">
      <div className="orders-content">
        <CustomTitle text="Pedidos" style="page-title" />

        <div className="store-tabs">
  {stores.map((store) => (
    <button
      key={store}
      className={`store-tab ${activeStore === store ? "active" : ""}`}
      onClick={() => setActiveStore(store)}
    >
      {store}
    </button>
  ))}
</div>


        <div className="orders-grid">
          {loading ? (
            <p>Cargando pedidos...</p>
          ) : error ? (
            <p>Error al cargar pedidos</p>
          ) : filteredOrders.length === 0 ? (
            <p>No hay pedidos para esta tienda.</p>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          )}
        </div>
      </div>
    </div>
  </div>

  );
};

export default Orders;
