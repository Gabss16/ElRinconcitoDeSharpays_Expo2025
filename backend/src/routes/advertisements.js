import express from "express";
import advertisementsController from "../controllers/advertisementsController.js";

const router = express.Router();

router
  .route("/")
  .get(advertisementsController.getdAvertisements)
  .post(advertisementsController.createAdvertisement);

router
  .route("/:id")
  .put(advertisementsController.updateAdvertisements)
  .delete(advertisementsController.deleteAdvertisements);

export default router;
