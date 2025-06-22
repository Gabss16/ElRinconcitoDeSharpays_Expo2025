import React from 'react';
import InputText from "../CustomInput";
import Button from "../CustomButton";
import UploadImage from "../UploadimageUsers";

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
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = {
      id,
      name,
      email,
      password,
      imageUrl
    };

    if (id) {
      handleEdit(employeeData);
    } else {
      saveEmployee(employeeData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="section-label">Subir Imagen</label>
        <UploadImage onUpload={(url) => setImageUrl(url)} />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            style={{ width: "150px", height: "150px", objectFit: "cover", marginTop: "10px" }}
          />
        )}
      </div>

      <div className="users-form-section">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <InputText
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Correo</label>
            <InputText
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <InputText
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            className="form-input"
            required={!id} // obligatorio solo si es creación
          />
        </div>

        <div className="upload-actions">
          <Button
            type="submit"
            text={"Guardar"}
            background="#FD0053"
            color="white"
            height="32px"
            width="100px"
            className="upload-action-button"
          />
        </div>
      </div>
    </form>
  );
};

export default EmployeeForm;
