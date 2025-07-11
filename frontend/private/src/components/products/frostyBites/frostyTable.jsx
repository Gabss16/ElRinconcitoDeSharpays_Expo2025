import React, { useState } from "react";
import InputText from "../../CustomInput";
import Button from "../../CustomButton";
import "../../../styles/ProductsTable.css";

const ProductsTable = ({ products, deleteProduct, updateProduct, loading, isEditable = true }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products
    .filter((prod) => {
      const cat =
        typeof prod.categoryId === "string"
          ? prod.categoryId
          : typeof prod.categoryId === "object"
          ? prod.categoryId.$oid || prod.categoryId._id
          : null;
      return cat === "68670de0d4a3c856571b7fb1";
    })
    .filter((prod) => {
      const term = searchTerm.toLowerCase();

      // flavor puede ser string o array, lo normalizamos a string para búsqueda
      let flavorStr = "";
      if (Array.isArray(prod.flavor)) {
        flavorStr = prod.flavor.join(" ").toLowerCase();
      } else if (typeof prod.flavor === "string") {
        flavorStr = prod.flavor.toLowerCase();
      }

      return (
        prod.name?.toLowerCase().includes(term) ||
        prod.description?.toLowerCase().includes(term) ||
        flavorStr.includes(term)
      );
    });

  return (
    <div className="products-table-container">
      <div className="card-table">
        <div className="search-box">
          <InputText
            type="text"
            name="buscar"
            placeholder="Buscar productos"
            className="search-input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-scroll-wrapper">
          <div className={`table-header-row ${!isEditable ? "no-actions" : ""}`}>
            <span>Nombre</span>
            <span>Descripción</span>
            <span>Precio</span>
            <span>Stock</span>
            <span>Imagen</span>
            <span>Sabores</span>
            {isEditable && <span>Acciones</span>}
          </div>

          <div className="table-body">
            {loading ? (
              <div>Cargando productos...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center pt-5">No hay productos para mostrar</div>
            ) : (
              filteredProducts.map((prod) => (
                <div key={prod._id} className={`table-item ${!isEditable ? "no-actions" : ""}`}>
                  <span>{prod.name}</span>
                  <span>{prod.description}</span>
                  <span>${prod.price}</span>
                  <span>{prod.stock}</span>
                  <span>
                    {prod.image ? (
                      <img
                        src={prod.image}
                        alt="Producto"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "8px",
                          backgroundColor: "#ddd",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          color: "#555",
                          userSelect: "none",
                        }}
                      >
                        Sin imagen
                      </div>
                    )}
                  </span>

                  <span>
                    {prod.flavor && prod.flavor.length > 0
                      ? Array.isArray(prod.flavor)
                        ? prod.flavor.join(", ")
                        : prod.flavor
                      : "—"}
                  </span>

                  {isEditable && (
                    <div className="action-buttons-container">
                      <Button
                        text="Editar"
                        background="#FD0053"
                        color="white"
                        height="32px"
                        width="80px"
                        className="action-button-edit"
                        onClick={() => updateProduct(prod)}
                      />
                      <Button
                        text="Eliminar"
                        border="1px solid #FD0053"
                        color="#FD0053"
                        background="white"
                        height="32px"
                        width="80px"
                        className="action-button-delete"
                        onClick={() => deleteProduct(prod._id)}
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
