import React from "react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/devkosnau/image/upload";
const UPLOAD_PRESET = "ml_default";

const UploadImage = ({ onUpload }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        onUpload(data.secure_url); // Devuelve la URL al padre
      } else {
        alert("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Error al subir imagen");
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
    />
  );
};

export default UploadImage;
