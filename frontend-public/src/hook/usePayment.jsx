import { useState } from "react";
import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";

const usePaymentFakeForm = () => {
  const [formData, setFormData] = useState({
  monto: "",
  firstName: "",
  phone: "",
  email: "",
  municipality: "",
  houseNumber: "",
  tokenTarjeta: null,
});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cleanForm = () => {
    setFormData({
      firstName: "",
      phone: "",
      email: "",
      municipality: "",
      houseNumber: "",
      monto: "",
    });
  };

  const handleFakePayment = async () => {
  try {
    SuccessAlert("Generando token de acceso...");

    const tokenResponse = await fetch("http://localhost:4000/api/payment/token", { method: "POST", headers: { "Content-Type": "application/json" } });
    if (!tokenResponse.ok) throw new Error(await tokenResponse.text());
    const { access_token } = await tokenResponse.json();

    SuccessAlert("Enviando pago...");
    const paymentResponse = await fetch("http://localhost:4000/api/payment/paymentProcess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: access_token, formData: { ...formData, tokenTarjeta: null } }),
    });

    if (!paymentResponse.ok) throw new Error(await paymentResponse.text());

    const paymentData = await paymentResponse.json();
    console.log("Respuesta del pago:", paymentData);
    
  } catch (err) {
    console.error(err);
    ErrorAlert("Hubo un error al procesar el pago.");
  }

  cleanForm();
};

  return {
    formData,
    handleChange,
    cleanForm,
    handleFakePayment,
  };
};
export default usePaymentFakeForm;