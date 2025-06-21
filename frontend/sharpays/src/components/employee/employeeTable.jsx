import React from 'react';
import InputText from "../CustomInput";
import Button from "../CustomButton";
import useDataEmployee from "../employee/hook/useDataEmployee";
import "../../styles/Employee.css";

const EmpsTable = () => {
  const { Employees, deleteEmployee, updateEmployee } = useDataEmployee();

  return (
    <div className="emps-table-section">
      <div className="table-card">
        <div className="search-container">
          <InputText
            type="text"
            name="buscar"
            placeholder="Buscar"
            className="search-input"
            // Puedes agregar lógica de búsqueda si deseas
          />
        </div>

        <div className="table-header">
          <span>Nombre</span>
          <span>Correo</span>
          <span>Imagen</span>
          <span>Acciones</span>
        </div>

        <div className="table-content">
          {Employees?.map((emp) => (
            <div key={emp._id} className="table-row">
              <span>{emp._id}</span>
              <span>{emp.name}</span>
              <span>{emp.email}</span>
              <span>
                {emp.image ? (
                  <img
                    src={emp.image}
                    alt="Perfil"
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
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
                      userSelect: "none"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmpsTable;
