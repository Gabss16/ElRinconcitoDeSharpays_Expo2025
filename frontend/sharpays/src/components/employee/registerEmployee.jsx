import React from "react";
import InputText from "../CustomInput";
import Button from "../CustomButton";
import UploadImage from "../UploadImage";

const EmployeeForm = ({
  id,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  imageUrl,
  setImageUrl,
  saveEmployee,
  handleEdit,
  resetForm,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || (!id && !password)) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const employeeData = { id, name, email, password, imageUrl };

    if (id) {
      handleEdit(employeeData);
    } else {
      saveEmployee(employeeData);
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="form-row-wrapper">
        {/* Columna de imagen */}
        <div className="image-upload-section">
          <UploadImage onUpload={setImageUrl} defaultImage={imageUrl} />
        </div>

        {/* Sección de campos con layout en grid */}
        <div className="fields-section">
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <InputText
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Correo</label>
            <InputText
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label className="form-label">Contraseña</label>
            <InputText
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="submit-btn-container" style={{ gridColumn: "span 2" }}>
            <Button
  type="submit"
  text={id ? "Actualizar" : "Agregar"}
  background="#FD0053"
  color="white"
  height="48px"
  width="160px"
  fontSize="16px" // solo si tu componente Button acepta fontSize
/>
            
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmployeeForm;
