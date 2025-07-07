import React, { useState, useEffect } from "react";
import UploadImage from "../ProductsImage";
import ImagePreview from "../ImagePreview";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { Subtitle } from "../Typography";
import "../../styles/advertisementsUpload.css";

const AdvertisementsUpload = ({
  tittle, setTittle,
  description, setDescription,
  image, setImage,
  isEditing,
  handleSubmit,
  handleUpdate
}) => {
  const [imageUrl, setImageUrl] = useState(null);

  // Sincronizar imagen existente con preview
  useEffect(() => {
    if (image) {
      setImageUrl(image);
    }
  }, [image]);

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl]);

  return (
    <div>
      <div className="main-container d-flex">
        <div className="upload-box">
          <UploadImage
            onUpload={(url) => {
              setImageUrl(url);
              setImage(url);
            }}
          />
        </div>
        <div className="preview-box">
          <ImagePreview imageUrl={imageUrl} />
        </div>
      </div>

      <form
        className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md p-8"
        onSubmit={isEditing ? handleUpdate : handleSubmit}
      >
        <div className="form-row mt-4">
          <div className="input-titulo">
            <CustomInput
              label="Título"
              placeholder="Título del evento"
              type="text"
              name="tittle"
              value={tittle}
              onChange={(e) => setTittle(e.target.value)}
            />
          </div>
          <div className="input-descripcion">
            <CustomInput
              label="Detalles del evento"
              placeholder="Descripción del evento"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-start">
          <CustomButton
            text={isEditing ? "Actualizar" : "Agregar"}
            background={isEditing ? "#FD0053" : "black"}
            color="white"
            width="180px"
            height="50px"
            border="none"
          />
        </div>
      </form>
    </div>
  );
};

export default AdvertisementsUpload;