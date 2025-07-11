import React from "react";
import InputText from "../CustomInput";
import Button from "../CustomButton";

// Función para verificar si la URL de la imagen es válida
const isValidImageUrl = (url) => {
  return typeof url === "string" && url.startsWith("http");
};

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
            // Aquí puedes agregar lógica para búsqueda si la necesitas
          />
        </div>

        <div className="table-header">
          <span>Descripción</span>
          <span>Categoría</span>
          <span>Imagen</span>
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
              <div
                key={cat._id}
                className="table-row"
                style={{ gridTemplateColumns: "1fr 1fr 1fr 80px 180px" }}
              >
                <span>{cat.description}</span>
                <span>{cat.category}</span>
                <span>
                  {cat.image && isValidImageUrl(cat.image) ? (
                    <img
                      src={cat.image}  
                      alt="Imagen categoría"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #eee",
                        background: "#fff",
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
