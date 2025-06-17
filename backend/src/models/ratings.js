import { Schema, model } from "mongoose";

const RatingSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: [true, "El ID del producto es obligatorio"],
      ref: "product"
    },
    customerId: {
      type: Schema.Types.ObjectId,
      required: [true, "El ID del cliente es obligatorio"],
      ref: "customer"
    },
    rating: {
      type: Number,
      required: [true, "La calificación es obligatoria"],
      min: [1, "La calificación mínima es 1"],
      max: [5, "La calificación máxima es 5"]
    },
    date: {
      type: String,
      required: [true, "La fecha es obligatoria"],
      match: [
        /^\d{4}-\d{2}-\d{2}$/,
        "La fecha debe tener el formato YYYY-MM-DD"
      ]
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Rating", RatingSchema);
