import express from "express";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .get(orderController.getOrders)
  .post(orderController.createOrder);

router
  .route("/:id")
  .get(orderController.getOrderById)
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder);

export default router;
