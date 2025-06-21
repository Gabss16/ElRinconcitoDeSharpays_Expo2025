import React from "react";
import "../styles/UploadimageUsers.css";
import CustomButton from "./CustomButton";

function SubirImagen({ onChange }) {
  // Referencia para el input file oculto
  const inputFileRef = React.useRef(null);

  // Al hacer clic en el botón, dispara el click en el input file
  const handleButtonClick = () => {
    inputFileRef.current.click();
  };

  return (
    <div className="upload-container">
      {/* Input file oculto */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={inputFileRef}
        onChange={onChange}
      />

      {/* Botón que dispara el input */}
      <CustomButton
        text={"Subir imagen"}
        background={"black"}
        color={"white"}
        height="40px"
        width="140px"
        onClick={handleButtonClick}
        className="upload-button"
      />
    </div>
  );
}

export default SubirImagen;
