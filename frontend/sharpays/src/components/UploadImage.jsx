// components/UploadImage.js
import React from 'react';
import '../styles/UploadImage.css';
import { FaFolderOpen } from 'react-icons/fa'; 

const UploadImage = ({
  buttonText = "Cargar imagen",
  onClick,
  className = "",
  iconClassName = "",
}) => {
  return (
    <div className={`upload-container ${className}`}>
      <FaFolderOpen className={`upload-icon ${iconClassName}`} />
      <button className="upload-button" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default UploadImage;
