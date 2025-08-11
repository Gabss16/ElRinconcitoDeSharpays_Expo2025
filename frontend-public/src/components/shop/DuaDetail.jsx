import React, { useState, useRef } from "react";
import "../../styles/DuasDetail.css";
import Card3D from "./Card3D";
import html2canvas from "html2canvas";
import useDataShoppingCart from "../../components/shoppingCart/hooks/useDataShoppingCart.jsx";
import SuccessAlert from "../../components/SuccessAlert.jsx";
import { useNavigate } from "react-router-dom";

const DuasDetail = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useDataShoppingCart();

  const [data, setData] = useState({
    apellido: '',
    nombre: '',
    genero: '',
    nacimiento: '',
    emergencia: '',
    nacionalidad: '',
    foto: null,
    numero: `${Math.floor(100000 + Math.random() * 900000)}-1`,
  });

  const carnetRef = useRef(null);
  const previewFoto = data.foto ? URL.createObjectURL(data.foto) : null;

  const handleAddToCart = async () => {
    if (!data.nombre || !data.apellido) {
      SuccessAlert("Completa los datos antes de continuar");
      return;
    }

    let carnetImage = null;
    let fotoImage = null;

    // Convertir la card a imagen
    if (carnetRef.current) {
      const canvas = await html2canvas(carnetRef.current);
      carnetImage = canvas.toDataURL();
    }

    // Foto de usuario
    if (data.foto) {
      fotoImage = previewFoto;
    }

    const productWithDetails = {
      ...product,
      duaData: {
        ...data,
        carnetImage,
        fotoImage
      }
    };

    SuccessAlert("DUA agregado al carrito");
    addToCart(productWithDetails, 1);
    navigate("/carrito");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setData((prev) => ({ ...prev, foto: file }));
    }
  };

  return (
    <div className="camisa-detail-wrapper container">
      {/* Info del producto */}
      <div className="camisa-info-container">
        <div className="camisa-header">
          <h1 className="camisa-name">{product.name}</h1>
          <span className="camisa-price">${parseFloat(product.price).toFixed(2)}</span>
        </div>
        <p className="camisa-description">{product.description}</p>
      </div>

      {/* Card y formulario */}
      <div className="camisa-content">
        <Card3D data={{ ...data, foto: previewFoto }} ref={carnetRef} />

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="apellido" placeholder="Apellidos" onChange={handleInputChange} />
          <input type="text" name="nombre" placeholder="Nombres" onChange={handleInputChange} />
          <input type="text" name="genero" placeholder="Género" onChange={handleInputChange} />
          <input type="text" name="nacimiento" placeholder="Fecha y lugar de nacimiento" onChange={handleInputChange} />
          <input type="text" name="emergencia" placeholder="En caso de emergencia llamar a" onChange={handleInputChange} />
          <input type="text" name="nacionalidad" placeholder="Nacionalidad" onChange={handleInputChange} />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="button" onClick={handleAddToCart}>
            Añadir al carrito
          </button>
        </form>
      </div>
    </div>
  );
};

export default DuasDetail;
