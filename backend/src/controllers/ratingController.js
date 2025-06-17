import Rating from "../models/ratings.js";

const ratingsController = {};

// Obtener todos los ratings
ratingsController.getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().populate("productId customerId");
    res.json(ratings);
  } catch (error) {
    console.error("Error al obtener calificaciones:", error); 
    res.status(500).json({
      message: "Error al obtener las calificaciones",
      error: error.message || error
    });
  }
};


// Crear un nuevo rating
ratingsController.createRating = async (req, res) => {
  try {
    const { productId, customerId, rating, date } = req.body;
    const newRating = new Rating({ productId, customerId, rating, date });
    await newRating.save();
    res.json({ message: "Calificación creada exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al crear la calificación", error });
  }
};

// Actualizar un rating existente
ratingsController.updateRating = async (req, res) => {
  try {
    const { productId, customerId, rating, date } = req.body;
    await Rating.findByIdAndUpdate(
      req.params.id,
      { productId, customerId, rating, date },
      { new: true }
    );
    res.json({ message: "Calificación actualizada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la calificación", error });
  }
};

// Eliminar un rating
ratingsController.deleteRating = async (req, res) => {
  try {
    await Rating.findByIdAndDelete(req.params.id);
    res.json({ message: "Calificación eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar la calificación", error });
  }
};

export default ratingsController;
