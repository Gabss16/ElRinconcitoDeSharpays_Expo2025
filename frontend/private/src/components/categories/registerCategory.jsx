import React from "react";
import InputText from "../CustomInput";
import Button from "../CustomButton";
import SuccessAlert from "../SuccessAlert";
import ErrorAlert from "../ErrorAlert";

const RegisterCategories = ({
  id,
  description,
  setDescription,
  category,
  setCategory,
  details,
  setDetails,
  isActive,
  setIsActive,
  saveCategory,
  handleEdit,
  resetForm,
}) => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !category || !details) {
      ErrorAlert("Todos los campos son obligatorios");
      return;
    }

    const categoryData = { id, description, category, details, isActive };

    try {
      if (id) {
        await handleEdit(categoryData);
        SuccessAlert("Categoría actualizada exitosamente");
      } else {
        await saveCategory(categoryData);
        SuccessAlert("Categoría registrada exitosamente");
      }
    } catch (err) {
      ErrorAlert("Ocurrió un error inesperado");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="fields-section">
        <div className="form-group">
          <label className="form-label">Descripción</label>
          <InputText
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Categoría</label>
          <InputText
            type="text"
            placeholder="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group" style={{ gridColumn: "span 2" }}>
          <label className="form-label">Detalles</label>
          <InputText
            type="text"
            placeholder="Detalles"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Activo</label>
          <select
            value={isActive ? "true" : "false"}
            onChange={(e) => setIsActive(e.target.value === "true")}
            className="form-input"
          >
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div
          className="submit-btn-container"
          style={{ gridColumn: "span 2", display: "flex", gap: "16px" }}
        >
          <Button
            type="submit"
            text={id ? "Actualizar" : "Agregar"}
            background="#FD0053"
            color="white"
            height="48px"
            width="160px"
            fontSize="16px"
          />
        </div>
      </div>
    </form>
  );
};

export default RegisterCategories;
