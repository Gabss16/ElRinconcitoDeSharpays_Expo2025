import express from "express";
import * as categoryController from "../controllers/categoryController.js";

const router = express.Router();

// Rutas para /api/categories
router
  .route("/")
  .get(categoryController.getcategorias)       // Obtener todas las categorías
  .post(categoryController.createcategoria);    // Crear una nueva categoría

router
  .route("/:id")
  .get(categoryController.getcategoriaById)     // Obtener categoría por ID
  .put(categoryController.updatecategoria)      // Actualizar categoría por ID
  .delete(categoryController.deletecategoria);  // Eliminar categoría por ID

export default router;
