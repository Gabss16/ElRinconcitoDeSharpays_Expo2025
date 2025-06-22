import React from "react";
import UserForm from "../components/employee/registerEmployee.jsx";
import EmpsTable from "../components/employee/employeeTable.jsx";
import useDataEmployee from "../components/employee/hook/useDataEmployee.jsx";
import "../styles/Employee.css";

const EmployeePage = () => {
  const data = useDataEmployee();

  return (
    <div className="users-main-container">
      <div className="users-content-wrapper">
        <UserForm {...data} />
      </div>
      <div className="users-table-wrapper">
        <EmpsTable {...data} />
      </div>
    </div>
  );
};

export default EmployeePage;
