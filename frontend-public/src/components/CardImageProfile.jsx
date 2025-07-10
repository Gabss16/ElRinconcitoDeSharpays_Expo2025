import React, { useState, useEffect, useRef } from "react";


import '../styles/CardImage.css';

const CardImage = ({ onUpload, defaultImage }) => {
  const [preview, setPreview] = useState(defaultImage || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreview(defaultImage || null);
    if (!defaultImage && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [defaultImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onUpload(file);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <div className="upload-image-card">
      <div className="upload-image-preview">
        {preview && (
          <img src={preview} alt="Preview" />
        )}
      </div>

      <button
        type="button"
        onClick={handleButtonClick}
        className="upload-image-button"
      >
        Cargar nueva foto
      </button>

      <p className="upload-image-text">
        800 x 800 px recomendado - PNG o JPEG
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CardImage;
