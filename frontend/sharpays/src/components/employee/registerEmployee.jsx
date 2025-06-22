import React from 'react';
import InputText from "../CustomInput";
import Button from "../CustomButton";
import UploadImage from "../UploadimageUsers";

const UserForm = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  imageFile,
  setImageFile,
  imageUrl,
  uploadImageToCloudinary,
  resetForm,
  fetchEmployees,
  id,
  handleEdit,
  saveUser,
}) => {
  const handleSubmit = (e) => {
    if (id) {
      handleEdit(e, {
        name,
        email,
        password,
        imageFile,
        imageUrl,
        uploadImageToCloudinary,
        resetForm,
        fetchEmployees,
        id
      });
    } else {
      saveUser(e, {
        name,
        email,
        password,
        imageFile,
        imageUrl,
        uploadImageToCloudinary,
        resetForm,
        fetchEmployees
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="section-label">Subir Imagen</label>
        <UploadImage
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setImageFile(file);
            }
          }}
        />
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
