// src/components/tables/ProductsTableCandles.jsx
import React from "react";
import InputText from "../../CustomInput";
import Button from "../../CustomButton";
import "../../../styles/ProductsTable.css";

const ProductsTableP = ({ products, deleteProduct, updateProduct, loading, isEditable = true }) => {
  const filteredProducts = products.filter((prod) => {
  const cat =
    typeof prod.categoryId === "string"
      ? prod.categoryId
      : typeof prod.categoryId === "object"
      ? prod.categoryId.$oid || prod.categoryId._id
      : null;
  return cat === "68670dfcd4a3c856571b7fb2";
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
          />
        </div>

        <div className={`table-header-row ${!isEditable ? "no-actions" : ""}`}>
          <span>Nombre</span>
          <span>Descripción</span>
          <span>Precio</span>
          <span>Stock</span>
          <span>Imagen</span>
          {isEditable && <span>Acciones</span>}
        </div>

        <div className="table-body">
          {loading ? (
            <div>Cargando productos...</div>
          ) : products.length === 0 ? (
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
  );
};

export default ProductsTableP;
