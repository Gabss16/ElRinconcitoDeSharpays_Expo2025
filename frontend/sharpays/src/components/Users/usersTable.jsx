import React from 'react';
import InputText from "../CustomInput";
import Button from "../CustomButton";
import useDataUsers from "./useDataUsers";
import "../../styles/Users.css";

const UsersTable = () => {
  const { users, deleteUser, updateUser } = useDataUsers();

  return (
    <div className="users-table-section">
      <div className="table-card">
        <div className="search-container">
          <InputText
            type="text"
            name="buscar"
            placeholder="Buscar"
            className="search-input"
            // Puedes agregar lógica de búsqueda si deseas
          />
        </div>

        <div className="table-header">
          <span>id</span>
          <span>nombre</span>
          <span>Correo</span>
          <span>Acciones</span>
        </div>

        <div className="table-content">
          {users.map((user) => (
            <div key={user._id} className="table-row">
              <span>{user._id}</span>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <div className="action-buttons">
                <Button
                  text="Editar"
                  background="#FD0053"
                  color="white"
                  height="32px"
                  width="80px"
                  className="action-button"
                  onClick={() => updateUser(user)}
                />
                <Button
                  text="Eliminar"
                  border="1px solid #FD0053"
                  color="#FD0053"
                  background="white"
                  height="32px"
                  width="80px"
                  className="action-button"
                  onClick={() => deleteUser(user._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
