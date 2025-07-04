// src/pages/ImageUploadPage.jsx
import React, { useState, useEffect } from "react";
import UploadImage from "../../ProductsImage";
import ImagePreview from "../../ImagePreview";
import ComboBox from "../../ComboBox";
import CustomInput from "../../CustomInput";
import { Title, Subtitle } from "../../Typography";
import CustomButton from "../../CustomButton";
import "../../../styles/registerSharpays.css";

const FlavorUploadPage = ({
  name, setName,
  description, setDescription,
  stock, setStock,
  price, setPrice,
  categoryId, setCategoryId,
  subCategoryId, setSubCategoryId,
  image, setImage,
  otherFields, setOtherFields,
  handleSubmit,
  tipoObjeto, setTipoObjeto,
  isEditing,
  handleUpdate
}) => {

  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState({}); // Estado para manejar errores

  // Sincronizar imagen existente con preview
  useEffect(() => {
    if (image) {
      setImageUrl(image);
    }
  }, [image]);

  // Sincronizar valores del formulario al cambiar
  useEffect(() => {
    setCategoryId("68670de0d4a3c856571b7fb1"); // ID de la tienda
    setSubCategoryId(tipoObjeto);
    setImage(imageUrl);
    setOtherFields({
      flavor: "", // Inicializar el sabor como string vacío
    });
  }, [tipoObjeto, imageUrl]);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "El título es requerido.";
    if (!price) newErrors.price = "El precio es requerido.";
    if (!stock) newErrors.stock = "El stock es requerido.";
    if (!otherFields.flavor) newErrors.flavor = "El sabor es requerido."; // Validación para el sabor
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isEditing) {
        handleUpdate(); // Sin pasar el evento
      } else {
        handleSubmit(); // Sin pasar el evento
      }
    }
  };

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
        onSubmit={handleFormSubmit}
      >
        <Subtitle>Selecciona la subcategoría</Subtitle>
        <ComboBox
          value={tipoObjeto}
          onChange={(e) => setTipoObjeto(e.target.value)}
          categoryFilter="68670de0d4a3c856571b7fb1"
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
              {errors.name && <p style={{ color: 'pink' }}>{errors.name}</p>} {/* Mensaje de error */}
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
              {errors.price && <p style={{ color: 'pink' }}>{errors.price}</p>} {/* Mensaje de error */}
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
              {errors.stock && <p style={{ color: 'pink' }}>{errors.stock}</p>} {/* Mensaje de error */}
            </div>
            <div className="input-sabor"> {/* Cambié el nombre de la clase */}
              <CustomInput
                label="Sabor"
                placeholder="Sabor"
                type="text"
                name="sabor"
                value={otherFields.flavor} // Usar el valor de sabor
                onChange={(e) => setOtherFields({ ...otherFields, flavor: e.target.value })} // Actualizar el sabor
              />
              {errors.flavor && <p style={{ color: 'pink' }}>{errors.flavor}</p>} {/* Mensaje de error */}
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

export default FlavorUploadPage; // Cambié el nombre del componente exportado
