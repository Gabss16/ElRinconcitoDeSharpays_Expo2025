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

// 👉 IMPORTAMOS EL HOOK CON LA LÓGICA DE PRODUCTOS
import useUserDataProducts from "../hook/userDataProducts";

// Opciones para el ComboBox


const ImageUploadPage = () => {
  // 👉 Hook de productos
  const {
    name, setName,
    description, setDescription,
    stock, setStock,
    price, setPrice,
    categoryId, setCategoryId,
    subCategoryId, setSubCategoryId,
    image, setImage,
    otherFields, setOtherFields,
    handleSubmit,
  } = useUserDataProducts();

  // 👉 Estados locales para controlar inputs personalizados
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [tipoObjeto, setTipoObjeto] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [stockValue, setStockValue] = useState("");
  const [descripcionValue, setDescripcionValue] = useState("");

  // 👉 Handler de carga de imagen
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      alert("Por favor selecciona un archivo de imagen válido.");
    }
  };

  // 👉 SINCRONIZAMOS LOS CAMPOS CON EL HOOK GLOBAL
  useEffect(() => {
    setName(titulo);
    setPrice(precio);
    setStock(stockValue);
    setDescription(descripcionValue);
    setCategoryId("sharpaysBoutique"); // ← TIENDA FIJA PARA ESTA PÁGINA
    setSubCategoryId(tipoObjeto);
    setImage(imageUrl);
    setOtherFields({
      size: selectedSizes, // 👈🏽 DEFINICIÓN DEL OTHER FIELD "TALLA"
    });
  }, [titulo, precio, stockValue, descripcionValue, tipoObjeto, selectedSizes, imageUrl]);

  // 👉 Enviar datos
  const handleAgregar = (e) => {
    e.preventDefault();
    handleSubmit(e); // LLAMA AL MÉTODO DEL HOOK
  };

  return (
    <div>
      {/* Sección de carga y previsualización de imagen */}
      <div className="main-container d-flex">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="upload-box">
        <UploadImage onUpload={(file) => {
  const url = URL.createObjectURL(file);
  setImageUrl(url);
}} />
        </div>
        <div className="preview-box">
          <ImagePreview imageUrl={imageUrl} />
        </div>
      </div>

      {/* Formulario */}
      <form
        className="w-full max-w-6xl mx-auto mt-8 bg-white rounded-lg shadow-md p-8"
        onSubmit={handleAgregar}
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
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className="input-precio">
              <CustomInput
                label="Precio"
                placeholder="Precio"
                type="number"
                name="precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>
            <div className="input-stock">
              <CustomInput
                label="Stock"
                placeholder="Stock"
                type="number"
                name="stock"
                value={stockValue}
                onChange={(e) => setStockValue(e.target.value)}
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
              value={descripcionValue}
              onChange={(e) => setDescripcionValue(e.target.value)}
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
            action={handleAgregar}
          />
        </div>
      </form>
    </div>
  );
};

export default ImageUploadPage;
