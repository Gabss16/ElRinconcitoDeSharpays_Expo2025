import express from "express";
import orderDetailsController from "../controllers/orderDetailsController.js";

const router = express.Router();

router.get("/:customerId", orderDetailsController.getCartByCustomer);
router.post("/add", orderDetailsController.addItemToCart);
router.delete("/:customerId/item/:productId", orderDetailsController.removeItemFromCart);
router.delete("/clear/:customerId", orderDetailsController.clearCart);

export default router;
