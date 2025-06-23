import React from "react";
import EmpsForm from "../components/employee/registerEmployee.jsx";
import EmpsTable from "../components/employee/employeeTable.jsx";
import useDataEmployee from "../components/employee/hook/useDataEmployee.jsx";
import "../styles/Employee.css";

const EmployeePage = () => {
  const data = useDataEmployee();

  return (
    <div className="users-main-container">
      <h2 className="main-title">Usuarios</h2>

      <div className="form-and-fields">
        <EmpsForm {...data} />
      </div>

      <div className="users-table-wrapper">
        <EmpsTable {...data} />
      </div>
    </div>
  );
};

export default EmployeePage;
