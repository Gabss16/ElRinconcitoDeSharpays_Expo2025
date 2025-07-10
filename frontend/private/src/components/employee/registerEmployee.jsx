import React, { useEffect, useState } from "react";
import InputText from "../CustomInput";
import Button from "../CustomButton";
import UploadImage from "../UploadImage";
import SuccessAlert from "../SuccessAlert";
import ErrorAlert from "../ErrorAlert";
import QuestionAlert from "../QuestionAlert";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({
  id,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  imageUrl,
  setImageUrl,
  saveEmployee,
  handleEdit,
  fromProfile = false, //Checks if the user is updating their own data
}) => {

  const [enableInput, setEnableInput] = useState(fromProfile);
  const navigate = useNavigate();

  const handleData = async()  =>
  {
    if (!name || !email || (!id && !password)) {
        ErrorAlert("Todos los campos son obligatorios");
        return;
      }
      const employeeData = { id, name, email, password, imageUrl };
  
      try {
        if(id && fromProfile){
          await handleEdit(employeeData);
          SuccessAlert("Perfil actualizado exitosamente");
          navigate("/Dashboard");
        }
        else if (id) {
          await handleEdit(employeeData);
          SuccessAlert("Usuario actualizado exitosamente");
        } 
        else {
          await saveEmployee(employeeData);
          SuccessAlert("Usuario registrado exitosamente");
        }
      } catch (err) {
        ErrorAlert("Ocurrió un error inesperado");
      }

  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (fromProfile) {
    if (enableInput) {
      const result = await QuestionAlert("¿Deseas editar tu perfil?");
      if (result.isConfirmed) {
        SuccessAlert("Ahora puedes editar tus datos");
        setEnableInput(false); 
      }
      return;
    }

    await handleData();
    setEnableInput(true);
  } else {
    await handleData();
  }
};


  return (
    <form onSubmit={handleSubmit} className="employee-form">


      <div className="form-row-wrapper">
        {/* Columna de imagen */}
        <div className="image-upload-section">
          <UploadImage
            onUpload={setImageUrl}
            defaultImage={typeof imageUrl === "string" ? imageUrl : undefined}
            fromProfile={enableInput}
          />
        </div>

        {/* Sección de campos con layout en grid */}
        <div className="fields-section">
          <div className="form-group">
            <InputText
              label={"Nombre"}
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disable={enableInput}

            />
          </div>

          <div className="form-group">

            <InputText
              label={"Correo"}
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disable={enableInput}
            />
          </div>

          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <InputText
              label={"Contraseña"}
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disable={enableInput}
            />
          </div>

          <div className="submit-btn-container" style={{ gridColumn: "span 2", display: "flex", gap: "16px" }}>
            <Button
              type="submit"
              text={id ? "Actualizar" : "Agregar"}
              background="#FD0053"
              color="white"
              height="48px"
              width="160px"
              fontSize="16px"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmployeeForm;
