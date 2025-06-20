import React from "react";
import Button from "../../../components/CustomButton";
import "../../../styles/SharpayTable.css";

const ProductsTable = ({ products }) => {
  return (
    <div className="users-table-section">
      <div className="table-card">
        <div className="table-header">
          <span>Título</span>
          <span>Precio</span>
          <span>Stock</span>
          <span>Tallas</span>
          <span>Descripción</span>
          <span>Acciones</span>
        </div>

        <div className="table-content">
          {products.length === 0 ? (
            <div className="table-row text-gray-500">No hay productos agregados</div>
          ) : (
            products.map((product, index) => (
              <div key={index} className="table-row">
                <span>{product.titulo}</span>
                <span>${product.precio}</span>
                <span>{product.stock}</span>
                <span>{product.tallas.join(", ")}</span>
                <span>{product.descripcion}</span>
                <div className="action-buttons">
                  <Button
                    text="Editar"
                    background="#FD0053"
                    color="white"
                    height="32px"
                    width="80px"
                  />
                  <Button
                    text="Eliminar"
                    border="1px solid #FD0053"
                    color="#FD0053"
                    background="white"
                    height="32px"
                    width="80px"
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
