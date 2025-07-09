import React, { useState } from "react";
import CustomTitle from "../components/CustomTitle";
import OrderCard from "../components/Orders/ordersCard";
import useOrdersWithCategories from "../components/Orders/hook/useOrders.jsx";
import "../styles/Orders.css";

const Orders = () => {
  const { orders, categories, loading, error, updateOrder } = useOrdersWithCategories();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [showHistory, setShowHistory] = useState(false);

  const storeNames = ["Todos", ...categories.map((c) => c.category)];

  // Órdenes filtradas según estado y categoría seleccionada
  const filteredOrders = orders.filter(
    (order) =>
      (activeCategory === "Todos" || order.categoryId?.category === activeCategory) &&
      order.status !== "completado"
  );

  const completedOrders = orders.filter(
    (order) =>
      (activeCategory === "Todos" || order.categoryId?.category === activeCategory) &&
      order.status === "completado"
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-1"></div>
        <div className="col-11">
          <div className="orders-page">
            <div className="orders-wrapper">
              <div className="orders-content">
                <CustomTitle text="Pedidos" style="page-title" />

                <div className="store-tabs">
                  {storeNames.map((store) => (
                    <button
                      key={store}
                      className={`store-tab ${activeCategory === store ? "active" : ""}`}
                      onClick={() => setActiveCategory(store)}
                    >
                      {store}
                    </button>
                  ))}
                  <button
                    className={`store-tab ${showHistory ? "active" : ""}`}
                    style={{
                      marginLeft: "auto",
                      backgroundColor: showHistory ? "#FE3F8D" : "",
                      color: showHistory ? "#fff" : "",
                    }}
                    onClick={() => setShowHistory(!showHistory)}
                  >
                    {showHistory ? "Volver a pendientes" : "Historial de ventas"}
                  </button>
                </div>

                {loading ? (
                  <p>Cargando...</p>
                ) : error ? (
                  <p className="text-danger">{error}</p>
                ) : showHistory ? (
                  completedOrders.length === 0 ? (
                    <p className="text-center">No hay órdenes completadas para esta tienda.</p>
                  ) : (
                    <div className="history-card">
                      <table className="history-table">
                        <thead>
                          <tr>
                            <th>No. de Orden</th>
                            <th>Cliente</th>
                            <th>Total ($)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {completedOrders.map((order) => (
                            <tr key={order._id}>
                              <td>#{order._id.slice(-4)}</td>
                              <td>{order.customerId?.name || "Sin nombre"}</td>
                              <td>{order.total.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                ) : filteredOrders.length === 0 ? (
                  <p className="text-center position-absolute top-50 start-50 translate-middle">
                    No hay pedidos para esta tienda.
                  </p>
                ) : (
                  <div className="orders-grid">
                    {filteredOrders.map((order) => (
                      <OrderCard key={order._id} order={order} updateOrder={updateOrder} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
