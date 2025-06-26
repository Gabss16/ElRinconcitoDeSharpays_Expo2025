import { Schema, model } from "mongoose";

const DiscountsSchema = new Schema(
  {
    tittle: {
      type: String,
      required: [true, "El titulo es obligatorio"],
    },
    discount: {
      type: Number,
      required: [true, "El porcentaje de descuento es obligatorio"],
      min: [0, "El descuento debe ser positivo"],
      max: [90, "El descuento no puede ser de más de 90%"]
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Discounts", DiscountsSchema);
