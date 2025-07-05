import React, { useState, useEffect } from "react";
import "../styles/Orders.css";
import CustomTitle from "../components/CustomTitle";
import OrderCard from "../components/Orders/ordersCard";
import useOrders from "../components/Orders/hook/useOrders";
import LoadingScreen from "../components/loadingScreen";

const Orders = () => {
  const { orders, loading, error } = useOrders();
  const [activeStore, setActiveStore] = useState("Todos");
  
  // Estado para controlar si se sigue mostrando el loading
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    let timer;

    if (!loading) {
      // Cuando loading pasa a false, espera 3 segundos para ocultar la pantalla
      timer = setTimeout(() => setShowLoading(false), 1000);
    } else {
      // Si loading es true, mostramos loading inmediatamente
      setShowLoading(true);
    }

    // Limpia el timer si cambia loading antes de tiempo
    return () => clearTimeout(timer);
  }, [loading]);

  const stores = [
    "Todos",
    "El rinconcito de Sharpay",
    "Bougies",
    "FrostyBites",
    "El Rincon de Dios",
  ];

  const filteredOrders =
    activeStore === "Todos"
      ? orders
      : orders.filter((order) => order.storeName === activeStore);

  return (
    <div className="orders-page">
      {showLoading ? (
        <LoadingScreen message="Cargando pedidos..." />
      ) : (
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
              {error ? (
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
      )}
    </div>
  );
};

export default Orders;
