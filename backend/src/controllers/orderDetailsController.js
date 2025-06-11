import OrderDetail from "../models/orderDatails.js";
import Product from "../models/products.js";

const orderDetailsController = {};

// Obtener carrito del cliente
orderDetailsController.getCartByCustomer = async (req, res) => {
  const { customerId } = req.params;
  const cart = await OrderDetail.findOne({ customerId }).populate("items.productId");
  res.json(cart);
};

// Agregar producto al carrito (crea carrito si no existe)
orderDetailsController.addItemToCart = async (req, res) => {
  const { customerId, productId, quantity, discount = 0, customDesign = null } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Producto no encontrado" });

  const unitPrice = product.price;
  const image = product.image;
  const productName = product.name;
  const totalPrice = (unitPrice - discount) * quantity;

  let cart = await OrderDetail.findOne({ customerId });

  if (!cart) {
    // Crear nuevo carrito
    cart = new OrderDetail({
      customerId,
      items: [{
        productId,
        productName,
        unitPrice,
        image,
        quantity,
        discount,
        customDesign,
        totalPrice
      }],
      totalCartPrice: totalPrice
    });
  } else {
    // Buscar si el producto ya existe
    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      // Sumar cantidad
      existingItem.quantity += quantity;
      existingItem.totalPrice = (unitPrice - discount) * existingItem.quantity;
    } else {
      // Agregar nuevo item
      cart.items.push({
        productId,
        productName,
        unitPrice,
        image,
        quantity,
        discount,
        customDesign,
        totalPrice
      });
    }

    // Recalcular total
    cart.totalCartPrice = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  await cart.save();
  res.json({ message: "Producto agregado al carrito", cart });
};

// Eliminar producto del carrito
orderDetailsController.removeItemFromCart = async (req, res) => {
  const { customerId, productId } = req.params;

  const cart = await OrderDetail.findOne({ customerId });
  if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

  cart.items = cart.items.filter(item => item.productId.toString() !== productId);

  cart.totalCartPrice = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);

  await cart.save();
  res.json({ message: "Producto eliminado del carrito", cart });
};

// Vaciar carrito
orderDetailsController.clearCart = async (req, res) => {
  const { customerId } = req.params;

  const cart = await OrderDetail.findOne({ customerId });
  if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

  cart.items = [];
  cart.totalCartPrice = 0;

  await cart.save();
  res.json({ message: "Carrito vaciado" });
};

export default orderDetailsController;
