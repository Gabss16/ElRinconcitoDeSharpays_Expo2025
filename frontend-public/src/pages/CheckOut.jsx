import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CarouselCard from '../components/carouselCard.jsx';
import useOrderDetail from '../components/checkOut/hooks/useOrderDetail.jsx';
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

  const {
    subtotal,
    shipping,
    tax,
    total,
    paymentMethod,
    setPaymentMethod,
  } = useOrderDetail();

  useEffect(() => {
    const exists = localStorage.getItem("OrderDetail");
    if (!exists) {
      ErrorAlert("No hay ninguna orden activa.");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
  };

  const handleContinueToPayment = () => {
    localStorage.removeItem("OrderDetail");
    SuccessAlert("¡Pago procesado con éxito!");
    setTimeout(() => {
      navigate("/");
    }, 3000);
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

                <button type="submit" className="purchase-button">
                  Guardar y continuar
                </button>
              </form>
            </div>
          </div>

          {/* Resumen de compra */}
          <div className="payment-section">
            <div className="payment-method-container">
              <div className="payment-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Envío</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Impuestos</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total-amount">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="purchase-button" onClick={handleContinueToPayment}>
                Continuar al pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
