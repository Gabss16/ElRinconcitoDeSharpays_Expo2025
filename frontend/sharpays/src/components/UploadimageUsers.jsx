import React, { useRef } from "react";
import "../styles/UploadimageUsers.css";
import CustomButton from "./CustomButton";

function SubirImagen({ onFileSelect }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Abre el selector de archivos
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file); // Pasar archivo al padre para subir o mostrar preview
    }
  };

  return (
    <div className="subir-imagen-contenedor">
      <div className="subir-imagen-zona"></div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <CustomButton
        text={"Subir imagen"}
        background={"black"}
        color={"white"}
        height="40px"
        width="150px"
        onClick={handleButtonClick}
      />
    </div>
  );
}

export default SubirImagen;
