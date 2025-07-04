import React from "react";
import InputText from "../CustomInput";
import Button from "../CustomButton";

const CategoryTable = ({ categories, deleteCategory, updateCategory, loading }) => {
  return (
    <div className="emps-table-section">
      <div className="table-card">
        <div className="search-container">
          <InputText
            type="text"
            name="buscar"
            placeholder="Buscar"
            className="search-input"
            // Puedes agregar lógica de búsqueda aquí
          />
        </div>

        <div className="table-header">
          <span>Descripción</span>
          <span>Categoría</span>
          <span>Detalles</span>
          <span>Activo</span>
          <span>Acciones</span>
        </div>

        <div className="table-content">
          {loading ? (
            <div>Cargando categorías...</div>
          ) : categories.length === 0 ? (
            <div>No hay categorías para mostrar</div>
          ) : (
            categories.map((cat) => (
              <div key={cat._id} className="table-row" style={{ gridTemplateColumns: "1fr 1fr 1fr 80px 180px" }}>
                <span>{cat.description}</span>
                <span>{cat.category}</span>
                <span>{cat.details}</span>
                <span>{cat.isActive ? "Sí" : "No"}</span>
                <div className="action-buttons">
                  <Button
                    text="Editar"
                    background="#FD0053"
                    color="white"
                    height="32px"
                    width="80px"
                    className="action-button"
                    onClick={() => updateCategory(cat)}
                  />
                  <Button
                    text="Eliminar"
                    border="1px solid #FD0053"
                    color="#FD0053"
                    background="white"
                    height="32px"
                    width="80px"
                    className="action-button"
                    onClick={() => deleteCategory(cat._id)}
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

export default CategoryTable;
