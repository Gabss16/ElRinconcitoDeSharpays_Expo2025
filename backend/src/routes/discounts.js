import express from "express";
import discountsController from "../controllers/discountsController.js";

const router = express.Router();

router
  .route("/")
  .get(discountsController.getDiscounts)
  .post(discountsController.createDiscount);

router
  .route("/:id")
  .put(discountsController.updateDiscount)
  .delete(discountsController.deleteDiscount);

export default router;
