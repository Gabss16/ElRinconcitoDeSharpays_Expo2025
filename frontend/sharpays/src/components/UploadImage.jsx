import React, { useState, useEffect, useRef } from "react";

const UploadImage = ({ onUpload, defaultImage }) => {
  const [preview, setPreview] = useState(defaultImage || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreview(defaultImage || null);
  }, [defaultImage]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/devkosnau/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        onUpload(data.secure_url);
      } else {
        alert("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Error al subir imagen");
    }
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
