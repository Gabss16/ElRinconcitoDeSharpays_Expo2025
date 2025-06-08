import express from "express";
import logOutController from "../controllers/logoutController.js";
const router = express.Router();

router.route("/").post(logOutController.logOut);

export default router;