// src/pages/ImageUploadPage.jsx
import React, { useState, useRef } from "react";
import UploadImage from "../../../components/UploadImage";
import ImagePreview from "../../../components/ImagePreview";
import ComboBox from "../../../components/ComboBox";
import CustomInput from "../../../components/CustomInput";
import SizeSelector from "../../../components/SizeSelector";
import { Title, Subtitle } from "../../../components/Typography";
import CustomButton from "../../../components/CustomButton";
import "../../../styles/registerSharpays.css";

// Opciones para el ComboBox
const objectTypes = [
  { label: "Camisa", value: "camisa" },
  { label: "Pantalón", value: "pantalon" },
  { label: "Zapatos", value: "zapatos" },
];

const ImageUploadPage = () => {
  // Estados para la imagen
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Estados para el formulario
  const [tipoObjeto, setTipoObjeto] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Handlers imagen
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

  // Handler formulario (puedes ajustarlo según tu lógica)
  const handleAgregar = (e) => {
    e.preventDefault();
    // Aquí va la lógica para manejar el envío del formulario
    alert("¡Objeto agregado!");
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
          <UploadImage onClick={handleUploadClick} />
        </div>

        <div className="preview-box">
          <ImagePreview imageUrl={imageUrl} />
        </div>
      </div>

      {/* Nuevo formulario debajo */}
      <form
        className="w-full max-w-6xl mx-auto mt-8 bg-white rounded-lg shadow-md p-8"
        onSubmit={handleAgregar}
      >
        <Subtitle>Selecciona el tipo de objeto</Subtitle>
        <ComboBox
          options={objectTypes}
          value={tipoObjeto}
          onChange={(e) => setTipoObjeto(e.target.value)}
          placeholder="Selecciona el tipo de objeto"
        />

        <div className="mt-6">
          <Subtitle>Detalles</Subtitle>

          {/* Fila horizontal de inputs */}
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

          {/* Descripción ocupa todo el ancho */}
          <div className="input-descripcion">
            <CustomInput
              label="Descripción"
              placeholder="Descripción"
              type="text"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
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
