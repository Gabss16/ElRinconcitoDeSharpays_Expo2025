import express from "express";
import advertisementsController from "../controllers/advertisementsController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "public/" });

router.route("/")
  .get(advertisementsController.getdAvertisements)
  .post(upload.single("image"), advertisementsController.createAdvertisement);

router.route("/:id")
  .put(upload.single("image"), advertisementsController.updateAdvertisements)
  .delete(advertisementsController.deleteAdvertisements);

router.patch("/:id/toggle-status", advertisementsController.toggleStatusAdvertisement);

export default router;