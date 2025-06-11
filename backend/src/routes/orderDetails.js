import express from "express";
import orderDetailController from "../controllers/orderDetailsController.js";

const router = express.Router();

router.get("/", orderDetailController.getAllCarts);
router.post("/add", orderDetailController.addToCart);
router.get("/:customerId", orderDetailController.getCartByCustomer);
router.delete("/remove", orderDetailController.removeFromCart);
router.delete("/clear", orderDetailController.clearCart);

export default router;