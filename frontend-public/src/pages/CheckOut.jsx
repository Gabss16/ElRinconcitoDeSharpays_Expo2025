import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CarouselCard from '../components/carouselCard.jsx';
import SuccessAlert from '../components/SuccessAlert.jsx';
import ErrorAlert from '../components/ErrorAlert.jsx';
import '../styles/checkOut.css';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    municipality: '',
    houseNumber: '',
    postalCode: '',
    zipCode: ''
  });

  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("otro");

  useEffect(() => {
    const stored = localStorage.getItem("OrderDetail");
    if (!stored) {
      ErrorAlert("No hay ninguna orden activa.");
      setTimeout(() => navigate("/"), 3000);
    } else {
      setOrderDetail(JSON.parse(stored));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderDetail) return;

    const shippingAddress = {
      address: `${formData.houseNumber}, CP: ${formData.postalCode}`,
      city: formData.municipality,
    };




    const payload = {
      customerId: orderDetail.customerId,
      products: orderDetail.items.map(item => ({
        productId: item.product._id,
        categoryId: item.product.categoryId?._id || item.product.categoryId, // <--- solo ID aquí
        productName: item.product.name,
        unitPrice: item.product.price,
        image: item.product.image,
        quantity: item.quantity,
        totalPrice: item.product.price * item.quantity,
        discount: 0,
        customDesign: item.product.customDesign || null
      })),
      shippingAddress,
      status: "pendiente",
    };





    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/createOrderFromCart/create-from-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      console.log("Payload a enviar:", JSON.stringify(payload, null, 2));

      if (!res.ok) throw new Error("Error al crear la orden");
      console.log("🛒 Payload final:", payload);

      SuccessAlert("¡Orden creada exitosamente!");
      localStorage.removeItem("OrderDetail");
      localStorage.removeItem("shoppingCart");
      
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      ErrorAlert("Error al procesar la orden");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shopping-cart-page">
      <div className="carousel-wrapper">
        <CarouselCard />
      </div>

      <div className="cart-content">
        <h2 className="cart-title-main">Checkout</h2>

        <div className="cart-layout">
          {/* Formulario */}
          <div className="cart-items-section">
            <div className="form-section">
              <h2 className="section-title">
                <FaMapMarkerAlt size={20} />
                Dirección de la compra
              </h2>

              <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Nombre"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Segundo nombre"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
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
                      value={formData.email}
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
                    placeholder="Municipio"
                    value={formData.municipality}
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

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Código postal"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP/Postal Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Método de pago:</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-input"
                  >
                    <option value="otro">Otro</option>
                    <option value="paypal">PayPal (+5.5%)</option>
                  </select>
                </div>

                <p className="location-helper">Selecciona una ubicación cercana a ti.</p>

                <button type="submit" className="purchase-button" disabled={loading}>
                  {loading ? "Procesando..." : "Finalizar compra"}
                </button>
              </form>
            </div>
          </div>

          {/* Resumen de compra */}
          <div className="payment-section">
            <div className="payment-method-container">
              <div className="payment-summary">
                <div className="summary-row">
                  <span>Total</span>
                  <span>${orderDetail?.total.toFixed(2)}</span>
                </div>
              </div>

              <p className="location-helper">Verifica los datos antes de pagar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
