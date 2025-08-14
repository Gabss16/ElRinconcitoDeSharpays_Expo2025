import { useState, useEffect } from "react";
import SuccessAlert from "../../SuccessAlert.jsx";
import ErrorAlert from "../../ErrorAlert.jsx";

const API = "http://localhost:4000/api/costumer";

const useDataCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");


  // Obtener todos los clientes
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers", error);
    } finally {
      setLoading(false);
    }
  };

  // Registrar un cliente
  const registerCustomer = async ({ name, email, password, department }) => {
    try {
      const res = await fetch("http://localhost:4000/api/registerCostumer", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, department }),
      });

      const data = await res.json();

      if (res.ok) {
        SuccessAlert(data.message || "Registro exitoso");
        await fetchCustomers();
        return true;
      } else {
        ErrorAlert(data.message || "Error al registrar");
        return false;
      }
    } catch (err) {
      console.error("Error al registrar cliente:", err);
      ErrorAlert("Error del servidor");
      return false;
    }
  };

  // Obtener un cliente por su ID
  const fetchCustomerById = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/${id}`);
      if (!res.ok) throw new Error("Cliente no encontrado");
      const data = await res.json();
      setId(data._id);
      setName(data.name);
      setEmail(data.email);
      setDepartment(data.department);
      setPassword("");
    } catch (error) {
      console.error("Error fetching customer by id", error);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un cliente
  const updateCustomer = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        SuccessAlert(data.message || "Actualización exitosa");
      } else {
        ErrorAlert(data.message || "Error al actualizar");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      ErrorAlert("Error del servidor");
    }
  };

  // Eliminar un cliente
  const deleteCustomer = async (id) => {
    if (!id) throw new Error("ID es requerido para eliminar");
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Error al eliminar cliente");
      }
      await fetchCustomers();
    } catch (error) {
      throw error;
    }
  };

  // Actualizar el departamento de un cliente
const updateCustomerDepartment = async (id, newDepartment) => {
  try {
    const res = await fetch(`${API}/${id}/updateDepartment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ department: newDepartment }),
    });

    const data = await res.json();

    if (res.ok) {
      SuccessAlert(data.message || "Ubicación actualizada con éxito");
      return true;
    } else {
      // En caso de que se devuelvan datos erróneos, manejamos el error.
      if (data?.error) {
        ErrorAlert(data.error || "Error desconocido al actualizar ubicación");
      } else {
        ErrorAlert(data.message || "Error al actualizar ubicación");
      }
      return false;
    }
  } catch (error) {
    console.error("Error al actualizar departamento:", error);
    ErrorAlert("Error del servidor");
    return false;
  }
};

  // Obtener todos los clientes al inicio
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Resetear formulario
  const resetForm = () => {
    setId("");
    setName("");
    setEmail("");
    setPassword("");
    setDepartment("");
  };

  // Retorno del hook
  return {
    customers,
    loading,
    id,
    setId,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    department,
    setDepartment,    
    updateCustomerDepartment, // Aquí agregamos la función
    fetchCustomers,
    fetchCustomerById,
    registerCustomer,
    updateCustomer,
    deleteCustomer,
    resetForm,
  };
};

export default useDataCustomer;
