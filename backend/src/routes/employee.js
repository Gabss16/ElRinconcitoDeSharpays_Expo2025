import express from "express";
import * as employeeController from "../controllers/employeeController.js";


import multer from "multer";

const app = express();
const upload = multer();

app.use(express.json());
app.use(upload.none()); // para recibir formData de texto



const router = express.Router();

router
  .route("/")
  .get(employeeController.getEmployees)
  .post(employeeController.createEmployee);

router
  .route("/:id")
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

export default router;
