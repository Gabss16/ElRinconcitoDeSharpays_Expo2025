import { useState, useEffect } from "react";

const useDataEmployee = () => {
  const API = "http://localhost:4000/api/employees";

  const [Employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchEmployees = async () => {
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
      body: JSON.stringify(employee),
    });

    const data = await res.json();
    console.log("Respuesta del servidor:", res.status, data);

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
      if (!employee.name || !employee.email || !employee.password) {
        return;
      }
      else{
          const formData = new FormData();

      formData.append("name", employee.name),
      formData.append("email", employee.email),
      formData.append("password", employee.password)

      const response = await fetch(`${API}/${employee.id}`, {
        method: "PUT",
        body: formData
      });

       await response.json();

      fetchEmployees();
      resetForm();

    }
    }
    catch (err) {
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

  const updateEmployee = (emp) => {
    setId(emp._id);
    setName(emp.name);
    setEmail(emp.email);
    setPassword(""); // por seguridad no mostrarla
    setImageUrl(emp.image || "");
    setActiveTab("form");
  };

  return {
    activeTab,
    setActiveTab,
    id,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    Employees,
    loading,
    saveEmployee,
    deleteEmployee,
    updateEmployee,
    handleEdit,
    imageUrl,
    setImageUrl,
  };
};

export default useDataEmployee;
