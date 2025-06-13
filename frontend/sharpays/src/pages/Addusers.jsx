import React from 'react';
import Titulo from "../components/CustomTitle";
import UserForm from "../hooks/Users/registerUsers.jsx";
import UsersTable from "../hooks/Users/usersTable.jsx";
import "../styles/Users.css";

const UsersPage = () => {
  return (
    <div className="users-main-container">
      <div className="users-header">
        <Titulo text="Usuarios" className="main-title" />
      </div>

      <div className="users-content-container">
        <UserForm />
        <UsersTable />
      </div>
    </div>
  );
};

export default UsersPage;