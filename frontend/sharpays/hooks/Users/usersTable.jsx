import React from 'react';
import InputText from "../components/CustomInput";
import Button from "../components/CustomButton";
import "../../src/styles/Users.css";

const usersData = [
  {
    id: "10-02-23",
    nombre: "Bougles",
    correo: "martha Lopez"
  }
];

const UsersTable = () => {
  return (
    <div className="users-table-section">
      <div className="search-container">
        <InputText
          type="text"
          name="buscar"
          placeholder="Buscar"
          className="search-input"
        />
      </div>

      <div className="table-header">
        <span>id</span>
        <span>nombre</span>
        <span>Correo</span>
        <span>Acciones</span>
      </div>

      <div className="table-content">
        {usersData.map((user) => (
          <div key={user.id} className="table-row">
            <span>{user.id}</span>
            <span>{user.nombre}</span>
            <span>{user.correo}</span>
            <div className="action-buttons">
              <Button
                text="Editar"
                background="#FD0053"
                color="white"
                height="32px"
                width="80px"
                className="action-button"
              />
              <Button
                text="Eliminar"
                border="1px solid #FD0053"
                color="#FD0053"
                background="white"
                height="32px"
                width="80px"
                className="action-button"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersTable;