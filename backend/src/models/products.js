import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    maxlength: [100, "El nombre no puede exceder 100 caracteres"]
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    minlength: [10, "La descripción debe tener al menos 10 caracteres"],
    maxlength: [300, "La descripción no puede exceder 300 caracteres"]
  },
  stock: {
    type: Number,
    required: [true, "El stock es obligatorio"],
    min: [0, "El stock no puede ser negativo"]
  },
  price: {
    type: Number,
    required: [true, "El precio es obligatorio"],
    min: [0, "El precio debe ser positivo"]
  },
  image: {
    type: String,
    default: ""
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: [true, "La categoría es obligatoria"]
  },
  subCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "subCategory",
    required: [true, "La subcategoría es obligatoria"]
  }
}, {
  timestamps: true,
  strict: false,
});

export default model("product", ProductSchema);
