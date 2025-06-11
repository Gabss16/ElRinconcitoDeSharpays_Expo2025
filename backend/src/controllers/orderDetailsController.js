import mongoose from "mongoose";
import orderDetailModel from "../models/orderDatails.js";
import productModel from "../models/products.js";

const orderDetailController = {};

// Obtener todos los carritos
orderDetailController.getAllCarts = async (req, res) => {
  try {
    const carts = await orderDetailModel.find().populate("items.productId");
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los carritos" });
  }
};

// Agregar producto al carrito (crear o actualizar)
orderDetailController.addToCart = async (req, res) => {
  try {
    const { customerId, productId, quantity, customDesign, discount } = req.body;

    // Verificar que el customerId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "ID de cliente no válido" });
    }

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    const unitPrice = product.price;
    const totalPrice = ((unitPrice - (discount || 0)) * quantity).toFixed(2);

    let cart = await orderDetailModel.findOne({ customerId });

    const newItem = {
      productId,
      productName: product.name,
      unitPrice,
      image: product.image,
      quantity,
      discount: discount || 0,
      customDesign: customDesign || null,
      totalPrice
    };

    if (!cart) {
      cart = new orderDetailModel({
        customerId,
        items: [newItem],
        totalCartPrice: totalPrice
      });
    } else {
      const index = cart.items.findIndex(item => item.productId.equals(productId));
      if (index > -1) {
        // Ya está en el carrito, actualiza cantidad y total
        cart.items[index].quantity += quantity;
        cart.items[index].totalPrice = (
          (unitPrice - (cart.items[index].discount || 0)) * cart.items[index].quantity
        ).toFixed(2);
      } else {
        // Producto nuevo
        cart.items.push(newItem);
      }

      // Recalcular total del carrito
      cart.totalCartPrice = cart.items.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0).toFixed(2);
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar al carrito" });
    console.log(er)
  }
};

// Obtener carrito por cliente
orderDetailController.getCartByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Verificar que el customerId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "ID de cliente no válido" });
    }

    const cart = await orderDetailModel.findOne({ customerId }).populate("items.productId");
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el carrito" });
    console.log(error);
  }
};

// Eliminar producto del carrito
orderDetailController.removeFromCart = async (req, res) => {
  try {
    const { customerId, productId } = req.body;

    // Verificar que el customerId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "ID de cliente no válido" });
    }

    const cart = await orderDetailModel.findOne({ customerId });
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    cart.items = cart.items.filter(item => !item.productId.equals(productId));
    cart.totalCartPrice = cart.items.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0).toFixed(2);

    await cart.save();
    res.json({ message: "Producto eliminado", cart });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};

// Vaciar carrito
orderDetailController.clearCart = async (req, res) => {
  try {
    const { customerId } = req.body;

    // Verificar que el customerId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "ID de cliente no válido" });
    }

    const cart = await orderDetailModel.findOne({ customerId });
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    cart.items = [];
    cart.totalCartPrice = 0;

    await cart.save();
    res.json({ message: "Carrito vaciado" });
  } catch (error) {
    res.status(500).json({ message: "Error al vaciar el carrito" });
  }
};

export default orderDetailController;
