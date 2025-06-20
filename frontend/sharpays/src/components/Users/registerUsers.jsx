import React from 'react';
import InputText from "../CustomInput";
import Button from "../CustomButton";
import UploadImage from "../UploadimageUsers";
import useDataUsers from "./hook/useDataUsers";
import "../../styles/Users.css";

const UserForm = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    imageFile,
    setImageFile,
    saveUser,
    handleEdit,
    id
  } = useDataUsers();

  return (
    <form onSubmit={id ? handleEdit : saveUser}>
      <div className="form-group">
        <label className="section-label">Subir Imagen</label>
        <UploadImage onChange={(e) => setImageFile(e.target.files[0])} />
      </div>

      <div className="users-form-section">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <InputText
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Correo</label>
            <InputText
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <InputText
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="upload-actions">
          <Button
            text={id ? "Actualizar" : "Agregar"}
            background="#FD0053"
            color="white"
            height="32px"
            width="100px"
            className="upload-action-button"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default UserForm;
