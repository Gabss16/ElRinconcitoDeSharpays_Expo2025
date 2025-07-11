import React, { useState } from "react";
import InputText from "../CustomInput";
import Button from "../CustomButton";
import "../../styles/Employee.css"; // o reutiliza ProductsTable.css si lo prefieres

const isValidImageUrl = (url) => {
  return typeof url === "string" && url.startsWith("http");
};

const EmpsTable = ({ employees, deleteEmployee, updateEmployee, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter((emp) =>
    emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="emps-table-section">
      <div className="table-card">
        {/* Búsqueda funcional */}
        <div className="search-container">
          <InputText
            type="text"
            name="buscar"
            placeholder="Buscar empleados"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Scroll horizontal igual que ProductsTable */}
        <div className="table-scroll-wrapper">
          <div className="table-header-row">
            <span>Nombre</span>
            <span>Correo</span>
            <span>Imagen</span>
            <span>Acciones</span>
          </div>

          <div className="table-body">
            {loading ? (
              <div>Cargando empleados...</div>
            ) : filteredEmployees.length === 0 ? (
              <div>No hay empleados para mostrar</div>
            ) : (
              filteredEmployees.map((emp) => (
                <div key={emp._id} className="table-item">
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
                  <div className="action-buttons-container">
                    <Button
                      text="Editar"
                      background="#FD0053"
                      color="white"
                      height="32px"
                      width="80px"
                      className="action-button-edit"
                      onClick={() => updateEmployee(emp)}
                    />
                    <Button
                      text="Eliminar"
                      border="1px solid #FD0053"
                      color="#FD0053"
                      background="white"
                      height="32px"
                      width="80px"
                      className="action-button-delete"
                      onClick={() => deleteEmployee(emp._id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpsTable;
