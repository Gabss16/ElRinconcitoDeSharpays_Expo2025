import React, { useState } from "react";
import FormSharpays from "../components/products/sharpaysBoutique/registerSharpays";
import TableSharpays from "../components/products/sharpaysBoutique/sharpaysTable";
import { Title } from "../components/Typography";
import "../styles/SharpayPage.css"; // Asegúrate de importar el CSS

const SharpaysPage = () => {
  const [activeTab, setActiveTab] = useState("agregar");
  const [productos, setProductos] = useState([]);

  const handleAgregarProducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
  };

  return (
    <div className="sharpay-page">
      <Title>Sharpay's Boutique</Title>

      {/* Tabs desde cero */}
      <div className="custom-tabs">
        <div
          className={`tab ${activeTab === "agregar" ? "active" : ""}`}
          onClick={() => setActiveTab("agregar")}
        >
          Agregar
        </div>
        <div
          className={`tab ${activeTab === "vista" ? "active" : ""}`}
          onClick={() => setActiveTab("vista")}
        >
          Vista
        </div>
      </div>

      {/* Contenido según tab activo */}
      {activeTab === "agregar" && (
        <FormSharpays onAgregarProducto={handleAgregarProducto} />
      )}
      {activeTab === "vista" && <TableSharpays products={productos} />}
    </div>
  );
};

export default SharpaysPage;
