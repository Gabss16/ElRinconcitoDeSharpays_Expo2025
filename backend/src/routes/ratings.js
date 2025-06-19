import express from "express";
import ratingsController from "../controllers/ratingController.js";

const router = express.Router();

router
  .route("/")
  .get(ratingsController.getRatings)
  .post(ratingsController.createRating);

router
  .route("/:id")
  .put(ratingsController.updateRating)
  .delete(ratingsController.deleteRating);

export default router;
