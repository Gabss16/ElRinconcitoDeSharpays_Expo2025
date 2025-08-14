import { useState, useEffect, useContext } from "react";
import "../styles/CardUbication.css";
import { AuthContext } from "../context/AuthContext";
import useDataCustomer from "./customer/hook/useDataCustomer";
import Departments from "../utils/apiDepartmentsSV"; // API para obtener los departamentos

export default function CardUbication() {
  const { user } = useContext(AuthContext); // Obtener usuario desde el contexto
  const [department, setDepartment] = useState("Sin ubicación");
  const [newDepartment, setNewDepartment] = useState(""); // Para cambiar el departamento
  const [isEditable, setIsEditable] = useState(false); // Para permitir la edición
  const data = useDataCustomer();
  const depa = Departments(); // Lista de departamentos

  useEffect(() => {
    if (user?.id) {
      data.fetchCustomerById(user?.id);
    }
  }, [user?.id]);

  useEffect(() => {
    setDepartment(data.department || "Sin ubicación");
  }, [data.department]);

  // Guardar el nuevo departamento en el backend
  const handleUpdateDepartment = async () => {
    try {
      // Llamar a la API para actualizar el departamento
      const success = await data.updateCustomerDepartment(user.id, newDepartment);
      if (success) {
        setDepartment(newDepartment); // Actualizamos el departamento localmente
        alert("Ubicación actualizada con éxito");
        setIsEditable(false); // Deshabilitamos la edición
      } else {
        alert("Ocurrió un error al actualizar la ubicación");
      }
    } catch (error) {
      console.error("Error updating department:", error);
      alert("Error al actualizar la ubicación");
    }
  };

  // Función para activar/desactivar el modo de edición
  const toggleEdit = () => {
    if (isEditable) {
      handleUpdateDepartment(); // Si está en modo edición, guardar el cambio
    } else {
      setIsEditable(true); // Activar modo edición
    }
  };

  return (
    <div className="card-ubication mt-5">
      <label className="card-ubication__label">Ubicación</label>
      
      <div className="card-ubication__input-container">
        {isEditable ? (
          // Si está en modo edición, mostrar el select para cambiar el departamento
          <select
            className="card-ubication__input"
            value={newDepartment || department}
            onChange={(e) => setNewDepartment(e.target.value)} // Cambiar departamento
          >
            <option value="">Selecciona un departamento</option>
            {depa && depa.map((dep) => (
              <option key={dep.value} value={dep.value}>
                {dep.label}
              </option>
            ))}
          </select>
        ) : (
          // Mostrar solo el departamento si no está en modo edición
          <input
            className="card-ubication__input"
            type="text"
            value={department}
            placeholder="Sin ubicación"
            disabled
          />
        )}
      </div>

      {/* Botón de editar/guardar desde CardPersonalInformation */}
      <div className="card-ubication__button-container">
      
      </div>
    </div>
  );
}
