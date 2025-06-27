import React from "react";
import InputText from "../../CustomInput";
import Button from "../../CustomButton";
import "../../../styles/ProductsTable.css";

const ProductsTable = ({ products, deleteProduct, updateProduct, loading }) => {
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

        <div className="table-header-row">
          <span>Nombre</span>
          <span>Descripción</span>
          <span>Precio</span>
          <span>Stock</span>
          <span>Imagen</span>
          <span>Tallas</span> {/* Nueva columna */}
          <span>Acciones</span>
        </div>

        <div className="table-body">
          {loading ? (
            <div>Cargando productos...</div>
          ) : products.length === 0 ? (
            <div>No hay productos para mostrar</div>
          ) : (
            products.map((prod) => (
              <div key={prod._id} className="table-item">
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

                {/* Mostrar tallas si existen */}
                <span>
                  {Array.isArray(prod.size) && prod.size.length > 0
                    ? prod.size.join(", ")
                    : "—"}
                </span>

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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
