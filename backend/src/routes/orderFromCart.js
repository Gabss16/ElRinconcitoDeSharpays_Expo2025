import express from "express";
import createOrderFromCart from "../controllers/createOrderFromCart.js";
const router = express.Router();


router.post('/create-from-cart', createOrderFromCart);

export default router
