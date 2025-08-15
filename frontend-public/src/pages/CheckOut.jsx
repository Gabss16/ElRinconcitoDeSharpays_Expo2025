import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CircularGallery from "../components/reactBits/CircularGallery.jsx";
import SuccessAlert from "../components/SuccessAlert.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";
import "../styles/checkOut.css";
import useDataCustomer from "../components/customer/hook/useDataCustomer.jsx";
import { useAuth } from "../context/AuthContext.jsx";

import PaymentMethod from "../components/PaymentMethod.jsx";
import useDataShoppingCart from "../components/shoppingCart/hooks/useDataShoppingCart.jsx";

import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const CheckoutPage = () => {
  const {
    cartItems,
    total,
    createOrderFromCart,
    clearCart,
    moveCartToOrderDetail,
  } = useDataShoppingCart();

  const subtotal = total;
  const deliveryFee = 0;
  const finalTotal = subtotal + deliveryFee;

  const { user, isLoggedIn } = useAuth();
  const customerId = user?._id || user?.id;

  const handleCreateOrder = (paymentMethod) => {
    if (!isLoggedIn) {
      ErrorAlert("Debes iniciar sesión para crear una orden");
      return;
    }

    if (cartItems.length === 0) return;

    const orderDetail = {
      items: cartItems,
      total,
      paymentMethod,
      customerId,
    };

    localStorage.setItem("OrderDetail", JSON.stringify(orderDetail));
    navigate("/checkOut");
  };

  const navigate = useNavigate();

  const { fetchCustomerById, name, email, department } = useDataCustomer();

  const [formData, setFormData] = useState({
    firstName: name || "",
    phone: "",
    email: email || "",
    municipality: department || "",
    houseNumber: "",
  });

  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("otro");

  useEffect(() => {
    const stored = localStorage.getItem("OrderDetail");

    if (!stored) {
      ErrorAlert("No hay ninguna orden activa");
      setTimeout(() => navigate("/"), 3000);
    } else {
      setOrderDetail(JSON.parse(stored));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "expiry") {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadToCloudinary = async (base64Image) => {
    if (!base64Image) return null;

    try {
      const formData = new FormData();
      formData.append("file", base64Image);
      formData.append("upload_preset", "preset_camisetas"); // Tu preset real

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqmol5thk/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) {
        console.error("Cloudinary upload failed:", data);
        return null;
      }

      return data.secure_url;
    } catch (err) {
      console.error("Error subiendo imagen a Cloudinary:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderDetail) return;

    const shippingAddress = {
      address: `${formData.houseNumber}, CP: ${formData.postalCode}`,
      city: formData.municipality,
    };

    try {
      setLoading(true);

      // Subir diseños personalizados y generar productos finales
      // Dentro de handleSubmit, en la parte donde recorres orderDetail.items:
      const productsWithUrls = await Promise.all(
        orderDetail.items.map(async (item) => {
          let finalImage = item.product.image;
          let customDesign = item.product.customDesign || null;

          // 🔹 1. Subir customDesign si es base64
          if (customDesign && customDesign.startsWith("data:image")) {
            const uploadedUrl = await uploadToCloudinary(customDesign);
            if (uploadedUrl) {
              finalImage = uploadedUrl;
              customDesign = uploadedUrl;
            }
          }

          // 🔹 2. Subir imágenes del DUA si existen
          let duaData = item.product.duaData || null;
          if (duaData) {
            // Subir carnetImage
            if (
              duaData.carnetImage &&
              duaData.carnetImage.startsWith("data:image")
            ) {
              const carnetUrl = await uploadToCloudinary(duaData.carnetImage);
              if (carnetUrl) duaData.carnetImage = carnetUrl;
            }
            // Subir fotoImage
            if (
              duaData.fotoImage &&
              duaData.fotoImage.startsWith("data:image")
            ) {
              const fotoUrl = await uploadToCloudinary(duaData.fotoImage);
              if (fotoUrl) duaData.fotoImage = fotoUrl;
            }
          }

          return {
            productId: item.product._id?.startsWith("custom-")
              ? null
              : item.product._id,
            categoryId: item.product.categoryId?._id || null,
            productName: item.product.name,
            unitPrice: item.product.price,
            image: finalImage || null,
            quantity: item.quantity,
            totalPrice: item.product.price * item.quantity,
            customDesign,
            duaData, // 🔹 Enviamos el DUA actualizado con URLs
          };
        })
      );

      const payload = {
        customerId: orderDetail.customerId,
        products: productsWithUrls,
        shippingAddress,
        status: "pendiente",
      };

      console.log("Payload final a enviar:", payload);

      const res = await fetch(
        "http://localhost:4000/api/createOrderFromCart/create-from-cart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Backend error:", errorData);
        throw new Error(errorData.message || "Error al crear la orden");
      }

      SuccessAlert("¡Orden creada exitosamente!");
      navigate("/inicio");
      localStorage.removeItem("OrderDetail");
      localStorage.removeItem("shoppingCart");
    } catch (err) {
      console.error("Error al procesar la orden:", err);
      ErrorAlert(err.message || "Error al procesar la orden");
    } finally {
      setLoading(false);
    }
  };

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleChangeInput = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <div className="shopping-cart-page">
      <div className="carousel-wrapper">
        <CircularGallery />
      </div>

      <div className="cart-content">
        <h2 className="cart-title-main">Proceso de Pago</h2>

        <div className="cart-layout">
          <div className="cart-items-section">
            <div className="form-section">
              <h2 className="section-title">
                <FaMapMarkerAlt size={20} />
                Dirección de la compra
              </h2>

              <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group full-width">
                  <div className="form-group">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Nombre"
                      value={user?.name || formData.firstName}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group"></div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Teléfono"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Correo Electrónico"
                      value={user?.email || formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <input
                    type="text"
                    name="municipality"
                    placeholder="Departamento"
                    value={user?.department || formData.municipality}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <input
                    type="text"
                    name="houseNumber"
                    placeholder="Número de casa, Apt #"
                    value={formData.houseNumber}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                {/* Credit card information */}

                <h2 className="section-title">
                  <FaCreditCard size={20} />
                  Datos de la tarjeta
                </h2>

                <Cards
                  number={state.number}
                  expiry={state.expiry}
                  cvc={state.cvc}
                  name={state.name}
                  focused={state.focus}
                />

                <div className="form-row pt-4">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre del titular"
                      onChange={handleChangeInput}
                      onFocus={handleInputFocus}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="number"
                      placeholder="Número de la tarjeta"
                      maxLength={16}
                      onChange={handleChangeInput}
                      onFocus={handleInputFocus}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="expiry"
                      maxLength={4}
                      placeholder="Fecha de vencimiento (Mes/Año)"
                      onChange={handleChangeInput}
                      onFocus={handleInputFocus}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="cvc"
                      placeholder="CVC"
                      maxLength={3}
                      onChange={handleChangeInput}
                      onFocus={handleInputFocus}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="purchase-button"
                  disabled={loading}
                >
                  {loading ? "Procesando..." : "Finalizar compra"}
                </button>
              </form>
            </div>
          </div>

          <div className="payment-section">
            <PaymentMethod
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={finalTotal}
              onCreateOrder={handleCreateOrder}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
