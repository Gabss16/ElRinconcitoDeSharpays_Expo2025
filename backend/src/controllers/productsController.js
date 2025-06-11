import { config } from "../config.js";
import Product from "../models/products.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // Para eliminar el archivo temporal después de subir

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret
});

const productController = {};

// GET all products
productController.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId")
      .populate("subCategoryId");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// CREATE product
productController.createProduct = async (req, res) => {
  try {
    const { name, description, stock, price, categoryId, subCategoryId } = req.body;
    let imageURL = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["png", "jpg", "jpeg"]
      });
      imageURL = result.secure_url;
     
    }

    const newProduct = new Product({
      name,
      description,
      stock,
      price,
      categoryId,
      subCategoryId,
      image: imageURL
    });

    await newProduct.save();
    res.json({ message: "Producto guardado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al crear el producto" });
    console.log(error)
  }
};

// UPDATE product (con cambio de imagen si se envía)
productController.updateProduct = async (req, res) => {
  try {
    const { name, description, stock, price, categoryId, subCategoryId } = req.body;
    let imageURL;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        allowed_formats: ["png", "jpg", "jpeg"]
      });
      imageURL = result.secure_url;
      fs.unlinkSync(req.file.path); // Borra la imagen local temporal
    }

    const updatedData = {
      name,
      description,
      stock,
      price,
      categoryId,
      subCategoryId
    };

    if (imageURL) {
      updatedData.image = imageURL;
    }

    await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el producto", error });
  }
};

// DELETE product
productController.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el producto", error });
  }
};

export default productController;
