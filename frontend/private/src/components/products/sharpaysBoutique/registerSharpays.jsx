// src/pages/ImageUploadPage.jsx
import React, { useState, useEffect } from "react";
import UploadImage from "../../ProductsImage";
import ImagePreview from "../../ImagePreview";
import ComboBox from "../../ComboBox";
import CustomInput from "../../CustomInput";
import SizeSelector from "../../SizeSelector";
import { Title, Subtitle } from "../../Typography";
import CustomButton from "../../CustomButton";
import "../../../styles/registerSharpays.css";

const ImageUploadPage = ({
  name, setName,
  description, setDescription,
  stock, setStock,
  price, setPrice,
  categoryId, setCategoryId,
  subCategoryId, setSubCategoryId,
  image, setImage,
  otherFields, setOtherFields,
  handleSubmit,
  selectedSizes, setSelectedSizes,
  tipoObjeto, setTipoObjeto,
  isEditing,
  handleUpdate
}) => {

  const [imageUrl, setImageUrl] = useState(null);

  // Sincronizar imagen existente con preview
  useEffect(() => {
    if (image) {
      setImageUrl(image);
    }
  }, [image]);

  // Sincronizar valores del formulario al cambiar
  useEffect(() => {
    setCategoryId("6855bf0c8bda3da90eca92c4"); // ← ID de la tienda
    setSubCategoryId(tipoObjeto);
    setImage(imageUrl);
    setOtherFields({
      size: selectedSizes,
    });
  }, [tipoObjeto, selectedSizes, imageUrl]);

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
        className="w-full max-w-6xl mx-auto mt-8 bg-white rounded-lg shadow-md p-8"
        onSubmit={isEditing ? handleUpdate : handleSubmit}
      >
        <Subtitle>Selecciona la subcategoría</Subtitle>
        <ComboBox
  value={tipoObjeto}
  onChange={(e) => setTipoObjeto(e.target.value)}
/>

        <div className="mt-6">
          <Subtitle>Detalles</Subtitle>
          <div className="form-row">
            <div className="input-titulo">
              <CustomInput
                label="Título"
                placeholder="Título"
                type="text"
                name="titulo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-precio">
              <CustomInput
                label="Precio"
                placeholder="Precio"
                type="number"
                name="precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="input-stock">
              <CustomInput
                label="Stock"
                placeholder="Stock"
                type="number"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="input-tallas">
              <label className="text-sm font-semibold mb-1 block">
                Tallas disponibles
              </label>
              <SizeSelector
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
              />
            </div>
          </div>

          <div className="input-descripcion">
            <CustomInput
              label="Descripción"
              placeholder="Descripción"
              type="text"
              name="descripcion"
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
            border={isEditing ? "none" : "none"}
          />
        </div>
      </form>
    </div>
  );
};

export default ImageUploadPage;
