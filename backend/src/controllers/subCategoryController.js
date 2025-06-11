import SubCategory from "../models/subCategory.js";

const SubCategoryController = {};


SubCategoryController.getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("categoryId");
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener subcategorías", error });
  }
};


SubCategoryController.createSubCategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const newSubCategory = new SubCategory({ name, description, categoryId });
    await newSubCategory.save();
    res.json({ message: "SubCategoría creada exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al crear la subcategoría", error });
  }
};


SubCategoryController.updateSubCategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    await SubCategory.findByIdAndUpdate(
      req.params.id,
      { name, description, categoryId },
      { new: true }
    );
    res.json({ message: "SubCategoría actualizada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la subcategoría", error });
  }
};


SubCategoryController.deleteSubCategory = async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "SubCategoría eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar la subcategoría", error });
  }
};

export default SubCategoryController;
