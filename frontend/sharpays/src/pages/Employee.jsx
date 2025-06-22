import React, { useState, useEffect } from "react";
import UserForm from "../components/employee/registerEmployee.jsx";
import EmpsTable from "../components/employee/employeeTable.jsx";
import "../styles/Employee.css";

const EmployeePage = () => {
  const API = "http://localhost:4000/api/employees";

  const [Employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error al obtener empleados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Aquí pon tus funciones saveUser, handleEdit, updateEmployee, deleteEmployee
  // pero adaptadas para usar los estados del padre (EmployeePage)
  // Ejemplo rápido saveUser:
  const saveUser = async (e) => {
    e.preventDefault();
    // ... tu lógica de subida de imagen y fetch POST
    // luego refrescas lista y reseteas campos usando setEmployees, setId, etc.
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    // ... tu lógica de edición con fetch PUT
    // refrescar lista y resetear campos
  };

  const updateEmployee = (emp) => {
    setId(emp._id);
    setName(emp.name);
    setEmail(emp.email);
    setPassword("");
    setImageUrl(emp.image || "");
    setImageFile(null);
  };

  const deleteEmployee = async (id) => {
    // ... tu lógica de borrado
  };

  const resetForm = () => {
    setId("");
    setName("");
    setEmail("");
    setPassword("");
    setImageFile(null);
    setImageUrl("");
  };

  return (
    <div className="users-main-container">
      <div className="users-content-wrapper">
        <UserForm
          id={id}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          imageFile={imageFile}
          setImageFile={setImageFile}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          saveUser={saveUser}
          handleEdit={handleEdit}
          resetForm={resetForm}
        />
      </div>
      <div className="users-table-wrapper">
        <EmpsTable
          Employees={Employees}
          deleteEmployee={deleteEmployee}
          updateEmployee={updateEmployee}
        />
      </div>
    </div>
  );
};

export default EmployeePage;
