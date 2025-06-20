import React from 'react';
//import Titulo from "../components/CustomTitle.jsx";
import UserForm from "../components/Users/registerUsers.jsx";
import UsersTable from "../components/Users/usersTable.jsx";
import "../styles/Users.css";

const UsersPage = () => {
  return (
    <div className="users-main-container">
      <div className="users-content-wrapper">
        <UserForm />
      </div>
      <div className="users-table-wrapper">
        <UsersTable />
      </div>
    </div>
  );
};

export default UsersPage;