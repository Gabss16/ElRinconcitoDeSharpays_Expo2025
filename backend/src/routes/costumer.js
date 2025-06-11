import express from "express";
import * as costumerController from "../controllers/costumerController.js";

const router = express.Router();


router
  .route("/")
  .get(costumerController.getCostumers)        
  .post(costumerController.createCostumer);    

router
  .route("/:id")
  .get(costumerController.getCostumerById)     
  .put(costumerController.updateCostumer)      
  .delete(costumerController.deleteCostumer);  

export default router;
