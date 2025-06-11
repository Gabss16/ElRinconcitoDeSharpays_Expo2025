import express from "express";
import registerCostumerController from "../controllers/registerCostumerController.js";

const router = express.Router();


router.post("/register", registerCostumerController.register);


// router.post("/register-verify", registerCostumerController.registerWithVerification);
// router.post("/verify-email", registerCostumerController.verifyCostumerEmail);

export default router;
