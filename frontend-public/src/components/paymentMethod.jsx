import React, { useState } from "react";
import visaLogo from "../assets/visaLogo.png"
import bacLogo from "../assets/bacLogo.png"

import agricolaLogo from "../assets/agricolaLogo.png"
import cash from "../assets/cash.png"

const PaymentMethod = ({ 
  subtotal, 
  deliveryFee = 0, 
  discount = 0, 
  total, 
  onCreateOrder, 
  loading 
}) => {
  const [selectedPayment, setSelectedPayment] = useState("paypal");

  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
  };

  const handlePurchase = () => {
    onCreateOrder(selectedPayment);
  };

  return (
    <div className="payment-method-container">
      <div className="payment-summary">
        <div className="summary-row">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="summary-row">
          <span>Envío/Entrega</span>
          <span style={{color: '#e65c95ff'}}>$3.39</span>
        </div>
        
        <div className="summary-row">
          <span>Estimado Total</span>
          <span className="total-amount">${total.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="summary-row discount-row">
            <span>Descuento</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="payment-methods">
        <h3>Método de Pago</h3>
        
        <div className="payment-options">
          <div 
            className={`payment-option ${selectedPayment === "paypal" ? "selected" : ""}`}
            onClick={() => handlePaymentChange("paypal")}
          >
            <div className="payment-radio">
              <input 
                type="radio" 
                name="payment" 
                value="paypal"
                checked={selectedPayment === "paypal"}
                onChange={() => handlePaymentChange("paypal")}
              />
            </div>
            <div className="payment-info">
              <span className="payment-name">Efectivo</span>
              <div className="cash-logo">
                <img src={cash} width={60} alt="Efectivo"/>
              </div>
            </div>
          </div>

          <div 
            className={`payment-option ${selectedPayment === "card" ? "selected" : ""}`}
            onClick={() => handlePaymentChange("card")}
          >
            <div className="payment-radio">
              <input 
                type="radio" 
                name="payment" 
                value="card"
                checked={selectedPayment === "card"}
                onChange={() => handlePaymentChange("card")}
              />
            </div>
            <div className="payment-info">
              <span className="payment-name">Tarjeta de Crédito/Débito</span>
              <div className="payment-logos">
                <img src={visaLogo} alt="Visa" className="payment-logo" />
                <img src={agricolaLogo} alt="MasterCard" className="payment-logo" />
                <img src={bacLogo }alt="American Express" className="payment-logo" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="purchase-button"
        onClick={handlePurchase}
        disabled={loading}
      >
        {loading ? "Procesando..." : "Comprar"}
      </button>

      <div className="security-info">
        <div className="security-badges">
          <span className="security-badge">Pago Seguro</span>
          <span className="security-badge">SSL Encriptado</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;