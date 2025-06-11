import { Schema, model } from "mongoose";

const orderDetailSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  customDesign: {
    type: String,
    default: null,
  },
});

const shippingAddressSchema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
});

const orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Costumer",
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "completed", "cancelled"],
      default: "pending",
    },
    orderDetails: {
      type: [orderDetailSchema],
      required: true,
      validate: [arr => arr.length > 0, "Debe haber al menos un detalle de orden"],
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Order", orderSchema);
