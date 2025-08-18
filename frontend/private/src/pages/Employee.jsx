import React from "react";
import EmployeeForm from "../components/employee/registerEmployee.jsx"; // Componente para registrar empleados
import EmpsTable from "../components/employee/employeeTable.jsx"; // Tabla que muestra los empleados registrados
import useDataEmployee from "../components/employee/hook/useDataEmployee.jsx"; // Hook personalizado para manejar datos de empleados
import "../styles/Employee.css"; // Estilos propios de la página de empleados

const EmployeePage = () => {
  // Se obtiene la lógica y estados del hook personalizado
  const data = useDataEmployee();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2"></div> {/* Columna vacía para margen */}
          <div className="col-10">
            <div className="users-main-container">
              <h1 className="main-title">Usuarios</h1> {/* Título principal de la página */}
              
              {/* Sección del formulario para registrar empleados */}
              <div className="form-and-fields">
                <EmployeeForm {...data} resetForm={data.resetForm} />
              </div>
              
              {/* Sección de la tabla que lista los empleados registrados */}
              <div className="users-table-wrapper">
                <EmpsTable {...data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeePage; 
