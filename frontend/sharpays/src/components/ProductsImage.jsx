import React, { useRef } from "react";
import { FiUpload } from "react-icons/fi";
import "../styles/UploadImage.css";

const UploadImageBox = ({ onUpload }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-boxX">
        <div className="upload-div">
          <FiUpload className="upload-icon" />
          <button className="upload-button" onClick={handleClick}>
            Cargar imagen
          </button>
        </div>

        {/* 👇 Este input es necesario para abrir el diálogo de archivos */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default UploadImageBox;
