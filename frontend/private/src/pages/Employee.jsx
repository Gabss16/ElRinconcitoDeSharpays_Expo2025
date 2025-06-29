import React from "react";
import EmployeeForm from "../components/employee/registerEmployee.jsx";
import EmpsTable from "../components/employee/employeeTable.jsx";
import useDataEmployee from "../components/employee/hook/useDataEmployee.jsx";
import "../styles/Employee.css";

const EmployeePage = () => {
  const data = useDataEmployee();

  return (
    <div className="users-main-container">
      <h1 className="main-title">Usuarios</h1>
      <div className="form-and-fields">
        <EmployeeForm {...data} resetForm={data.resetForm} />
      </div>
      <div className="users-table-wrapper">
        <EmpsTable {...data} />
      </div>
    </div>
  );
};

export default EmployeePage;
