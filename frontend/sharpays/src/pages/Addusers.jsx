import Titulo from "../components/CustomTitle";
import InputText from "../components/CustomInput";
import Button from "../components/CustomButton";
import UploadImage from "../components/UploadImage";
import "../styles/Users.css";

const usersData = [
  {
    id: "10-02-23",
    nombre: "Bougles",
    correo: "martine Lopez"
  }
];

const UsersTable = () => (
  <div className="users-main-container">
    <div className="users-header">
      <Titulo text="Usuarios" className="main-title" />
    </div>

    <div className="users-content-container">
      <div className="users-form-section">
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <InputText
            type="text"
            placeholder="Otros"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <InputText
            type="password"
            placeholder="Contraseña"
            className="form-input"
          />
        </div>

        <div className="divider-line"></div>

        <div className="form-group">
          <label className="section-label">Subir Imagen</label>
          <div className="upload-actions">
            <Button
              text="Agregar"
              background="#FD0053"
              color="white"
              height="32px"
              width="80px"
              className="upload-action-button"
            />
            <Button
              text="Buscar"
              border="1px solid #FD0053"
              color="#FD0053"
              background="white"
              height="32px"
              width="80px"
              className="upload-action-button"
            />
          </div>
          <UploadImage className="upload-image" />
        </div>
      </div>

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
          <span>Id</span>
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
    </div>
  </div>
);

export default UsersTable;