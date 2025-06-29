// EmpsTable.jsx
import React from "react";
import InputText from "../CustomInput";
import Button from "../CustomButton";
import "../../styles/Employee.css";

const isValidImageUrl = (url) => {
  // Acepta solo si es string, no vacío y empieza con http
  return typeof url === "string" && url.startsWith("http");
};

const EmpsTable = ({ employees, deleteEmployee, updateEmployee, loading }) => {
  return (
    <div className="emps-table-section">
      <div className="table-card">
        <div className="search-container">
          <InputText
            type="text"
            name="buscar"
            placeholder="Buscar"
            className="search-input"
            // Puedes agregar lógica para búsqueda aquí
          />
        </div>

        <div className="table-header">
          <span>Nombre</span>
          <span>Correo</span>
          <span>Imagen</span>
          <span>Acciones</span>
        </div>

        <div className="table-content">
          {loading ? (
            <div>Cargando empleados...</div>
          ) : employees.length === 0 ? (
            <div>No hay empleados para mostrar</div>
          ) : (
            employees.map((emp) => (
              <div key={emp._id} className="table-row">
                <span>{emp.name}</span>
                <span>{emp.email}</span>
                <span>
                  {isValidImageUrl(emp.image) ? (
                    <img
                      src={emp.image}
                      alt="Perfil"
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
                <div className="action-buttons">
                  <Button
                    text="Editar"
                    background="#FD0053"
                    color="white"
                    height="32px"
                    width="80px"
                    className="action-button"
                    onClick={() => updateEmployee(emp)}
                  />
                  <Button
                    text="Eliminar"
                    border="1px solid #FD0053"
                    color="#FD0053"
                    background="white"
                    height="32px"
                    width="80px"
                    className="action-button"
                    onClick={() => deleteEmployee(emp._id)}
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

export default EmpsTable;
