import Order from '../models/orders.js';
import orderDetailModel from '../models/orderDatails.js';

const createOrderFromCart = async (req, res) => {
  try {
    const { customerId, orderDetails, shippingAddress, status = "pending" } = req.body;

    // Validar datos obligatorios
    if (!customerId || !Array.isArray(orderDetails) || orderDetails.length === 0) {
      return res.status(400).json({ message: "Faltan datos: customerId o detalles de orden vacíos" });
    }

    // Calcular total sumando unitPrice * quantity
    const total = orderDetails.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);

    // Crear nuevo objeto orden con datos recibidos
    const order = new Order({
      customerId,
      orderDetails,
      total,
      status,
      shippingAddress,
    });

    // Guardar en la base de datos
    await order.save();

    // Responder con la orden creada
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando la orden desde el carrito", error });
  }
};

export default createOrderFromCart;
