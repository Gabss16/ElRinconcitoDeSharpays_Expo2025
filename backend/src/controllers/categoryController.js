import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";
import categoria from "../models/category.js";

// Configura Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});

// Crear categoria
export const createcategoria = async (req, res) => {
  try {
    let imageUrl = "";
    // Si hay imagen, súbela a Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "categories",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      imageUrl = result.secure_url; // Obtén la URL segura de la imagen
    }

    // Crea una nueva categoría, incluyendo la imagen si existe
    const nuevaCategoria = new categoria({
      ...req.body,
      image: imageUrl, // Asocia la URL de la imagen (si existe)
    });

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
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.status(200).json(categoriaEncontrada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar categoria
export const updatecategoria = async (req, res) => {
  try {
    const categoriaActualizada = await categoria.findById(req.params.id);
    if (!categoriaActualizada) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    let imageUrl = categoriaActualizada.image; // Mantiene la imagen actual en caso de no recibir una nueva

    // Si hay nueva imagen, súbela a Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "categories",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      imageUrl = result.secure_url; // Actualiza la URL de la imagen
    }

    // Actualiza los campos de la categoría, incluyendo la imagen
    categoriaActualizada.name = req.body.name || categoriaActualizada.name;
    categoriaActualizada.description = req.body.description || categoriaActualizada.description;
    categoriaActualizada.image = imageUrl; // Actualiza la imagen

    await categoriaActualizada.save();
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
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.status(200).json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
