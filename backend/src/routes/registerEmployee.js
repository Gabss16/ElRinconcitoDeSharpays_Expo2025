import express from "express";
import registerEmployeeController from "../controllers/registerEmployeeController.js";

const router = express.Router();

// Ruta para registrar un nuevo empleado
router.post("/register", registerEmployeeController.register);

export default router;
