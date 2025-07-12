import { useState, useEffect } from "react";

const useOrderDetail = () => {
  const [paymentMethod, setPaymentMethod] = useState("otro"); // otro o paypal
  const [orderData, setOrderData] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });

  useEffect(() => {
    const storedOrder = localStorage.getItem("OrderDetail");
    if (storedOrder) {
      const parsed = JSON.parse(storedOrder);
      const subtotal = parsed.total || 0;
      const shipping = 0;
      const tax = paymentMethod === "paypal" ? subtotal * 0.055 : 0;
      const total = subtotal + shipping + tax;

      setOrderData({
        subtotal,
        shipping,
        tax,
        total,
      });
    }
  }, [paymentMethod]);

  return {
    ...orderData,
    paymentMethod,
    setPaymentMethod,
  };
};

export default useOrderDetail;
