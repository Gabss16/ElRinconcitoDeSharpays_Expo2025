import React, { useState } from 'react';
import InputText from "../components/CustomInput";
import Button from "../components/CustomButton";
import '../styles/CardPersonalInformation.css';

const CardPersonalInformation = () => {
  const [name, setName] = useState("German Gonzalez");
  const [email, setEmail] = useState("gonzagermang24@gmail.com");
  const [isEditable, setIsEditable] = useState(false); // Estado para controlar si los inputs son editables

  const toggleEdit = () => {
    setIsEditable(!isEditable); // Cambia el estado de editabilidad
  };

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
            className={`info-input ${!isEditable ? "readonly" : ""}`} // Añadir clase 'readonly' si no es editable
            readOnly={!isEditable} // Solo se puede editar si isEditable es true
          />
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`info-input ${!isEditable ? "readonly" : ""}`} // Añadir clase 'readonly' si no es editable
            readOnly={!isEditable} // Solo se puede editar si isEditable es true
          />
        </div>
        <Button text={isEditable ? "Guardar" : "Editar"} className="edit-btn" onClick={toggleEdit} />
      </div>
      
      <div className="personal-info-row">
        <Button text="Cambiar Contraseña" className="password-btn" />
      </div>
    </div>
  );
};

export default CardPersonalInformation;
