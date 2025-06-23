// useDataEmployee.js
import { useState, useEffect } from "react";

const useDataEmployee = () => {
  const API = "http://localhost:4000/api/employees";

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(API);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error al obtener los empleados", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const resetForm = () => {
    setId("");
    setName("");
    setEmail("");
    setPassword("");
    setImageUrl("");
    setActiveTab("list");
  };

  const saveEmployee = async (employee) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: employee.name,
          email: employee.email,
          password: employee.password,
          image: employee.imageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || data.message || "Bad Request");

      fetchEmployees();
      resetForm();
    } catch (err) {
      console.error("Error en saveEmployee:", err);
      alert(err.message);
    }
  };

  const handleEdit = async (employee) => {
    try {
      if (!employee.name || !employee.email) {
        alert("Nombre y correo son obligatorios");
        return;
      }

      // Si password está vacío, no lo envíes para no cambiarlo
      const bodyData = {
        name: employee.name,
        email: employee.email,
        image: employee.imageUrl,
      };
      if (employee.password) {
        bodyData.password = employee.password;
      }

      const response = await fetch(`${API}/${employee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || data.message || "Error al actualizar");
      }

      fetchEmployees();
      resetForm();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar empleado");

      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const updateEmployee = (employee) => {
    setId(employee._id);
    setName(employee.name);
    setEmail(employee.email);
    setPassword(""); // No mostrar contraseña por seguridad
    setImageUrl(employee.image || "");
    setActiveTab("form");
  };

  return {
    activeTab,
    setActiveTab,
    id,
    setId,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    imageUrl,
    setImageUrl,
    employees,
    loading,
    saveEmployee,
    deleteEmployee,
    updateEmployee,
    handleEdit,
    resetForm,
  };
};

export default useDataEmployee;
