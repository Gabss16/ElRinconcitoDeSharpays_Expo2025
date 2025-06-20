import React from 'react';
import InputText from "../CustomInput";
import Button from "../CustomButton";
import UploadImage from "../UploadimageUsers";
import "../../styles/Users.css";


const UserForm = () => {
  return (  
    <>

<div className="form-group">
    <label className="section-label">Subir Imagen</label>
    <UploadImage className="upload-image" />

  </div>


       <div className="users-form-section">
  <div className="form-row">
    <div className="form-group">
      <label className="form-label">Nombre</label>
      <InputText
        type="text"
        placeholder=""
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label className="form-label">Correo</label>
      <InputText
        type="text"
        placeholder=""
        className="form-input"
      />
    </div>
  </div>

  <div className="form-group">
    <label className="form-label">Contraseña</label>
    <InputText
      type="password"
      placeholder=""
      className="form-input"
    />
  </div>

  <div className="upload-actions">
    <Button
      text="Agregar"
      background="#FD0053"
      color="white"
      height="32px"
      width="100px"
      className="upload-action-button"
    />
  </div>

 
</div>

    </>
  );
};

export default UserForm;
  

