import categoria from "../models/category.js";

// Crear categoria
export const createcategoria = async (req, res) => {
  try {
    const nuevaCategoria = new categoria(req.body);
    await nuevaCategoria.save();
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las categorias
export const getcategorias = async (req, res) => {
  try {
    const categorias = await categoria.find();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener categoria por ID
export const getcategoriaById = async (req, res) => {
  try {
    const categoriaEncontrada = await categoria.findById(req.params.id);
    if (!categoriaEncontrada) {
      return res.status(404).json({ error: "categoria no encontrada" });
    }
    res.status(200).json(categoriaEncontrada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar categoria
export const updatecategoria = async (req, res) => {
  try {
    const categoriaActualizada = await categoria.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!categoriaActualizada) {
      return res.status(404).json({ error: "categoria no encontrada" });
    }
    res.status(200).json(categoriaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar categoria
export const deletecategoria = async (req, res) => {
  try {
    const categoriaEliminada = await categoria.findByIdAndDelete(req.params.id);
    if (!categoriaEliminada) {
      return res.status(404).json({ error: "categoria no encontrada" });
    }
    res.status(200).json({ message: "categoria eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
