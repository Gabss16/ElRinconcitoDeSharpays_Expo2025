import React from 'react';
import InputText from "../components/CustomInput";
import Button from "../components/CustomButton";
import UploadImage from "../components/UploadImage";
import "../styles/Users.css";

const UserForm = () => {
  return (
    <div className="users-form-section">
      <div className="form-group">
        <label className="form-label">Nombre</label>
        <InputText
          type="text"
          placeholder="Nombre"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Contraseña</label>
        <InputText
          type="password"
          placeholder="Contraseña"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Correo</label>
        <InputText
          type="text"
          placeholder="Correo"
          className="form-input"
        />
      </div>

      <div className="divider-line"></div>

      <div className="form-group">
        <label className="section-label">Subir Imagen</label>
        <UploadImage className="upload-image" />
        <div className="upload-actions">
          <Button
            text="Agregar"
            background="#FD0053"
            color="white"
            height="32px"
            width="80px"
            className="upload-action-button"
          />
        </div>
      </div>
    </div>
  );
};

export default UserForm;