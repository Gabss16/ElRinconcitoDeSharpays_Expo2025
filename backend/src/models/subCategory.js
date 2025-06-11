import { Schema, model } from "mongoose";

const SubCategorySchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    maxlength: [100, "El nombre no puede exceder 100 caracteres"]
  },
 
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: [true, "La categoría es obligatoria"]
  },
   description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    minlength: [10, "La descripción debe tener al menos 10 caracteres"],
    maxlength: [300, "La descripción no puede exceder 300 caracteres"]
  }
}, {
  timestamps: true
});

export default model("subCategory", SubCategorySchema);
