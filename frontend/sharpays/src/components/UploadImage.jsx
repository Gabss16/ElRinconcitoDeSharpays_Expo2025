import React, { useState } from "react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/devkosnau/image/upload";
const UPLOAD_PRESET = "ml_default";

const UploadImage = ({ onUpload, defaultImage }) => {
  const [preview, setPreview] = useState(defaultImage || null);

  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
    }
  }, [defaultImage]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

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
        onUpload(data.secure_url);
      } else {
        alert("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Error al subir imagen");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "150px",
          height: "150px",
          backgroundColor: "#eee",
          borderRadius: "8px",
          margin: "0 auto",
          objectFit: "cover",
          overflow: "hidden",
        }}
      >
        <img
          src={preview}
          alt="Preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: preview ? "block" : "none",
          }}
        />
      </div>

      <label
        htmlFor="imageUpload"
        style={{
          marginTop: "10px",
          display: "inline-block",
          backgroundColor: "#000",
          color: "#fff",
          padding: "6px 12px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Subir imagen
      </label>

    <input
  id="imageUpload"
  type="file"
  accept="image/*"
  style={{ display: "none" }}
  onClick={(e) => e.stopPropagation()} // <-- evita que active el submit
  onChange={handleFileChange}
/>
    </div>
  );
};
export default UploadImage;
