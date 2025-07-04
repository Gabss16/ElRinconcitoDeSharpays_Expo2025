import Order from "../models/orders.js";
import mongoose from "mongoose";

const orderController = {};

orderController.createOrder = async (req, res) => {
  try {
    const { customerId, orderDetails, total, status, shippingAddress } = req.body;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "ID de cliente no válido" });
    }

    if (!orderDetails || orderDetails.length === 0) {
      return res.status(400).json({ message: "Debe haber al menos un producto en la orden" });
    }

    if (!shippingAddress || !shippingAddress.address || !shippingAddress.city) {
      return res.status(400).json({ message: "Dirección de envío incompleta" });
    }

    const order = new Order({
      customerId,
      orderDetails,
      total,
      status: status || "pending",
      shippingAddress,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

orderController.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customerId", "name email")
      .populate("orderDetails.productId", "name price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener órdenes" });
  }
};

orderController.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de orden no válido" });
    }

    const order = await Order.findById(id)
      .populate("customerId", "name email")
      .populate("orderDetails.productId", "name price");

    if (!order) return res.status(404).json({ message: "Orden no encontrada" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la orden" });
  }
};

orderController.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de orden no válido" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) return res.status(404).json({ message: "Orden no encontrada" });

    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//no se por que no sirve
orderController.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de orden no válido" });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) return res.status(404).json({ message: "Orden no encontrada" });

    res.json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la orden" });
  }
};

export default orderController;
