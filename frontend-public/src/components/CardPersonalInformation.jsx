import React from 'react';
import InputText from "../components/CustomInput";
import Button from "../components/CustomButton";
import '../styles/CardPersonalInformation.css';
import { useState } from "react";


const CardPersonalInformation = () => {
  const [name, setName] = useState("German Gonzalez");
  const [email, setEmail] = useState("gonzagermang24@gmail.com");

  return (
    <div className="personal-info-card">
      <div className="personal-info-header">
        <span className="personal-info-title">Información Personal</span>
      </div>
      <div className="personal-info-row">
        <div className="personal-info-inputs">
          <InputText
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="info-input"
          />
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
};

export default CardPersonalInformation;
