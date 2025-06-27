import React, { useState, useEffect, useRef } from "react";

const UploadImage = ({ onUpload, defaultImage }) => {
  const [preview, setPreview] = useState(defaultImage || null);
  const [localFile, setLocalFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Solo actualiza el preview si no hay un archivo seleccionado manualmente
    if (!localFile) {
      setPreview(defaultImage || null);
    }
    // eslint-disable-next-line
  }, [defaultImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLocalFile(file);
    setPreview(URL.createObjectURL(file));
    onUpload(file); // Pasa el archivo al padre
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <div style={{ textAlign: "center", marginLeft: "40px" }}>
      <div
        style={{
          width: "300px",
          height: "300px",
          backgroundColor: "#eee",
          borderRadius: "8px 8px 0 0",
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      <button
        type="button"
        onClick={handleButtonClick}
        style={{
          marginTop: "0px",
          backgroundColor: "#000",
          color: "#fff",
          padding: "16px 24px",
          borderRadius: "0 0 8px 8px",
          cursor: "pointer",
          fontWeight: "bold",
          border: "none",
          width: "300px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          outline: "none",
          fontSize: "16px",
        }}
      >
        Subir imagen
      </button>

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

export default UploadImage;
