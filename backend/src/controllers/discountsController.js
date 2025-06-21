import Discount from "../models/discounts.js";

const discountsController = {};

// Obtener todos los descuentos
discountsController.getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.json(discounts);
  } catch (error) {
    console.error("Error al obtener los descuentos:", error);
    res.status(500).json({
      message: "Error al obtener los descuentos",
      error: error.message || error,
    });
  }
};

// Crear un nuevo descuento
discountsController.createDiscount = async (req, res) => {
  try {
    const { tittle, discount } = req.body;
    const newDiscount = new Discount({ tittle, discount });
    await newDiscount.save();
    res.json({ message: "Descuento creado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al crear el descuento", error });
  }
};

// Actualizar un descuento existente
discountsController.updateDiscount = async (req, res) => {
  try {
    const { tittle, discount } = req.body;
    await Discount.findByIdAndUpdate(
      req.params.id,
      { tittle, discount },
      { new: true }
    );
    res.json({ message: "Descuento actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el descuento", error });
  }
};

// Eliminar un descuento
discountsController.deleteDiscount = async (req, res) => {
  try {
    await Discount.findByIdAndDelete(req.params.id);
    res.json({ message: "Descuento eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el descuento", error });
  }
};

export default discountsController;
