import Order from '../models/orders.js';

const createOrderFromCart = async (req, res) => {
  try {
    const { customerId, products, shippingAddress, status = "pendiente" } = req.body;

    // Validar datos esenciales
    if (!customerId || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Faltan datos: customerId o productos vacíos" });
    }

    // Extraer categoryId del primer producto (asumimos que todos son de la misma categoría)
    const categoryId = products[0]?.categoryId;
    if (!categoryId) {
      return res.status(400).json({ message: "Falta categoryId en los productos" });
    }

    // Calcular total sumando unitPrice * quantity
    const total = products.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);

    // Crear orden con todos los campos requeridos
    const order = new Order({
      customerId,
      categoryId,
      orderDetails: products,
      total,
      status,
      shippingAddress,
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creando la orden:", error);
    res.status(500).json({ message: "Error creando la orden desde el carrito", error: error.message });
  }
};

export default createOrderFromCart;
