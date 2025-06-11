import express from "express";
import SubCategoryController from "../controllers/subCategoryController.js";

const router = express.Router();

router.route("/")
  .get(SubCategoryController.getSubCategories)
  .post(SubCategoryController.createSubCategory);

router.route("/:id")
  .put(SubCategoryController.updateSubCategory)
  .delete(SubCategoryController.deleteSubCategory);

export default router;
