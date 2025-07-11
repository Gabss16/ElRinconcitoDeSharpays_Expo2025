import React from "react";
import InputText from "../CustomInput";
import Button from "../CustomButton";
import SuccessAlert from "../SuccessAlert";
import ErrorAlert from "../ErrorAlert";
import UploadImage from "../UploadImage";

const RegisterCategories = ({
  id,
  description,
  setDescription,
  category,
  setCategory,
  imageUrl,
  setImageUrl,
  isActive,
  setIsActive,
  saveCategory, // ya no se usará
  handleEdit,
  resetForm,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !category || !imageUrl) {
      ErrorAlert("Todos los campos son obligatorios");
      return;
    }

    const categoryData = { id, description, category, imageUrl, isActive };

    try {
      if (id) {
        await handleEdit(categoryData);
        SuccessAlert("Categoría actualizada exitosamente");
      } else {
        ErrorAlert("Solo está permitido editar categorías existentes.");
      }
    } catch (err) {
      ErrorAlert("Ocurrió un error inesperado");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <div className="form-row-wrapper">
        {/* Columna de imagen */}
        <div className="image-upload-section">
          <UploadImage
            onUpload={setImageUrl}
            defaultImage={typeof imageUrl === "string" ? imageUrl : undefined}
          />
        </div>

        {/* Sección de campos con layout en grid */}
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

          {id && (
            <div
              className="submit-btn-container"
              style={{ gridColumn: "span 2", display: "flex", gap: "16px" }}
            >
              <Button
                type="submit"
                text="Actualizar"
                background="#FD0053"
                color="white"
                height="48px"
                width="160px"
                fontSize="16px"
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default RegisterCategories;
