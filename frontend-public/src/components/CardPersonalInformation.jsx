import React from 'react';
import InputText from "../components/CustomInput";
import Button from "../components/CustomButton";
import '../styles/CardPersonalInformation.css';

const CardPersonalInformation = () => (
  <div className="personal-info-card">
    <div className="personal-info-header">
      <span className="personal-info-title">Información Personal</span>
    </div>
    <div className="personal-info-row">
      <div className="personal-info-inputs">
        <InputText
          value="German Gonzalez"
          disable={true}
          className="info-input"
        />
        <InputText
          value="gonzagermang24@gmail.com"
          disable={true}
          className="info-input"
        />
      </div>
      <Button text="Editar" className="edit-btn" />
    </div>
    <div className="personal-info-row">
      <Button text="Cambiar contraseña" className="password-btn" />
    </div>
  </div>
);

export default CardPersonalInformation;
