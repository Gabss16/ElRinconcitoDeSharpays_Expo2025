import { useState } from "react";

const API_CREATE_ORDER =
  "http://localhost:4000/api/createOrderFromCart/create-from-cart";

// Cloudinary unsigned upload
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dqmol5thk/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "preset_camisetas";

const useDataShoppingCart = () => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("shoppingCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("shoppingCart", JSON.stringify(items));
  };

  // 🔹 Agregar producto
  const addToCart = (product, quantity = 1, options = {}) => {
    const key = `${product._id || product.id}_${options.size || ""}_${options.flavor || ""}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      let updatedCart;
      if (existing) {
        updatedCart = prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        const newItem = { key, product, quantity, options };
        updatedCart = [...prev, newItem];
      }
      saveToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (key) => {
    const updatedCart = cartItems.filter((item) => item.key !== key);
    setCartItems(updatedCart);
    saveToLocalStorage(updatedCart);
  };

  const incrementQuantity = (key) => {
    const updatedCart = cartItems.map((item) =>
      item.key === key ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    saveToLocalStorage(updatedCart);
  };

  const decrementQuantity = (key) => {
    const updatedCart = cartItems
      .map((item) =>
        item.key === key
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCartItems(updatedCart);
    saveToLocalStorage(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("shoppingCart");
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // 🔹 Subir imagen base64 a Cloudinary (Unsigned)
  const uploadImageToCloudinary = async (base64Image) => {
    if (!base64Image) return null;

    const formData = new FormData();
    formData.append("file", base64Image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
      const data = await res.json();
      return data.secure_url || null;
    } catch (err) {
      console.error("Error subiendo imagen a Cloudinary:", err);
      return null;
    }
  };

  // 🔹 Crear orden desde carrito
  const createOrderFromCart = async (customerId, shippingAddress, status = "pendiente") => {
    setLoading(true);
    setError(null);

    try {
      // Subir diseños personalizados si existen
      const products = await Promise.all(
        cartItems.map(async (item) => {
          let customDesignUrl = null;

          if (item.product.customDesign?.startsWith("data:image")) {
            customDesignUrl = await uploadImageToCloudinary(item.product.customDesign);
          }

          return {
            productId: item.product._id || (item.product.isCustom ? null : null),
            categoryId: item.product.categoryId?._id || null,
            productName: item.product.name,
            unitPrice: item.product.price,
            image: item.product.image || customDesignUrl || "https://res.cloudinary.com/dy8bfiulj/image/upload/v1750958173/BW_1_xwfqkd.png",
            quantity: item.quantity,
            totalPrice: item.product.price * item.quantity,
            discount: 0,
            customDesign: customDesignUrl || null,
          };
        })
      );

      const payload = {
        customerId,
        products,
        shippingAddress,
        status,
        total,
      };

      console.log("🛒 Payload a enviar:", payload);

      const res = await fetch(API_CREATE_ORDER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al crear la orden desde el carrito");

      const data = await res.json();
      clearCart();
      return data;
    } catch (err) {
      console.error("❌ Error al crear orden:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    cartItems,
    total,
    loading,
    error,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    createOrderFromCart,
  };
};

export default useDataShoppingCart;
