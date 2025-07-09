import Order from '../models/orders.js';
import orderDetailModel from '../models/orderDatails.js';

const createOrderFromCart = async (req, res) => {
  try {
    const { customerId, shippingAddress, status = "pending" } = req.body;

    // Validar que el customerId sea válido
    if (!customerId) {
      return res.status(400).json({ message: "Falta customerId" });
    }

    // Obtener carrito actual
    const cart = await orderDetailModel.findOne({ customerId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío" });
    }

    // Calcular total basado en carrito
    const total = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);

    // Crear orden nueva
    const order = new Order({
      customerId,
      orderDetails: cart.items,
      total,
      status,
      shippingAddress,
    });

    await order.save();

    // Opcional: Vaciar carrito después de crear la orden
    cart.items = [];
    cart.totalCartPrice = 0;
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando la orden desde el carrito", error });
  }
};


export default createOrderFromCart;