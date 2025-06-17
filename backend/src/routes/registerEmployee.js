import express from "express";
import registerEmployeeController from "../controllers/registerEmployeeController.js";

const router = express.Router();

// Ruta para registrar un nuevo empleado
router.route("/")
.post(registerEmployeeController.register);

export default router;
