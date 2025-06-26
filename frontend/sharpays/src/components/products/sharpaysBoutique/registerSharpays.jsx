// src/pages/ImageUploadPage.jsx
import React, { useState, useRef, useEffect } from "react";
import UploadImage from "../../ProductsImage";
import ImagePreview from "../../ImagePreview";
import ComboBox from "../../ComboBox";
import CustomInput from "../../CustomInput";
import SizeSelector from "../../SizeSelector";
import { Title, Subtitle } from "../../Typography";
import CustomButton from "../../CustomButton";
import "../../../styles/registerSharpays.css";


const ImageUploadPage = ({ name, setName,
     description, setDescription,
     stock, setStock,
     price, setPrice,
     categoryId, setCategoryId,
     subCategoryId, setSubCategoryId,
     image, setImage,
     otherFields, setOtherFields,
     handleSubmit,     selectedSizes, 
    setSelectedSizes,
    tipoObjeto,
    setTipoObjeto}) => {
  // 👉 Hook de productos


  // 👉 Estados locales para controlar inputs personalizados
  const [imageUrl, setImageUrl] = useState(null);
  
/*
  
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [stockValue, setStockValue] = useState("");
  const [descripcionValue, setDescripcionValue] = useState("");*/

  // 👉 Handler de carga de imagen
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
  setCategoryId("6855bf0c8bda3da90eca92c4"); // ← Pon aquí el ID real de tu tienda si es necesario
  setSubCategoryId(tipoObjeto);      // ← Lo que eliges en ComboBox
  setImage(imageUrl);                // ← URL de Cloudinary
  setOtherFields({
    size: selectedSizes,             // ← Tamaño de prendas u otros
  });
}, [tipoObjeto, selectedSizes, imageUrl]);

  
/*
  // 👉 SINCRONIZAMOS LOS CAMPOS CON EL HOOK GLOBAL
  useEffect(() => {
    setPrice(price);
    setStock(stockValue);
    setDescription(descripcionValue);
    setCategoryId("sharpaysBoutique"); // ← TIENDA FIJA PARA ESTA PÁGINA
    setSubCategoryId(tipoObjeto);
    setImage(imageUrl);
    setOtherFields({
      size: selectedSizes, // 👈🏽 DEFINICIÓN DEL OTHER FIELD "TALLA"
    });
  }, [price, stockValue, descripcionValue, tipoObjeto, selectedSizes, imageUrl]);

  // 👉 Enviar datos
  */

  return (
    <div>
      {/* Sección de carga y previsualización de imagen */}
      <div className="main-container d-flex">
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          
        />
        <div className="upload-box">
        <UploadImage onUpload={(url) => {
  setImageUrl(url);  // para la vista previa
  setImage(url);     // para enviar al backend
}} />

        </div>
        <div className="preview-box">
          <ImagePreview imageUrl={imageUrl} />
        </div>
      </div>

      {/* Formulario */}
      <form
        className="w-full max-w-6xl mx-auto mt-8 bg-white rounded-lg shadow-md p-8"
        onSubmit={handleSubmit}
        
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
            text="Agregar"
            background="black"
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

export default ImageUploadPage;
