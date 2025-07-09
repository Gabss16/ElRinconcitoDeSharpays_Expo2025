import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    minlength: [3, "La descripción debe tener al menos 3 caracteres"],
    maxlength: [100, "La descripción no puede exceder 100 caracteres"]
  },
  category: {
    type: String,
    required: [true, "La categoría es obligatoria"],
    minlength: [3, "La categoría debe tener al menos 3 caracteres"],
    maxlength: [50, "La categoría no puede exceder 50 caracteres"]
  },
  image: {
    type: String,
    
  }, 
  isActive: {
    type: Boolean,
    required: [true, "El estado activo es obligatorio"]
  }
}, {
  timestamps: true
});

export default model("category", CategorySchema);
