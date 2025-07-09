import express from "express";
import multer from "multer";
import * as categoryController from "../controllers/categoryController.js";

// Configura multer para manejar archivos
const upload = multer({ dest: "uploads/" });

const router = express.Router();

// Rutas para /api/categories
router
  .route("/")
  .get(categoryController.getcategorias)       // Obtener todas las categorías
  .post(upload.single("image"), categoryController.createcategoria);  // Crear una nueva categoría con imagen

router
  .route("/:id")
  .get(categoryController.getcategoriaById)     // Obtener categoría por ID
  .put(upload.single("image"), categoryController.updatecategoria)      // Actualizar categoría por ID con imagen
  .delete(categoryController.deletecategoria);  // Eliminar categoría por ID

export default router;
