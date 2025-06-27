import express from "express";
import multer from "multer";
import * as employeeController from "../controllers/employeeController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router
  .route("/")
  .get(employeeController.getEmployees)
  .post(upload.single("image"), employeeController.createEmployee);

router
  .route("/:id")
  .get(employeeController.getEmployeeById)
  .put(upload.single("image"), employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

export default router;
