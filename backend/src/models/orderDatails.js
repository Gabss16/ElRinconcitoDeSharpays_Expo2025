import { Schema, model } from "mongoose";

const ItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true
  },
  productName: String,
  unitPrice: Number,
  image: String,
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  discount: {
    type: Number,
    default: 0
  },
  customDesign: {
    type: String,
    default: null
  },
  totalPrice: Number
});

const OrderDetailsSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  items: [ItemSchema],
  totalCartPrice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default model("orderDetail", OrderDetailsSchema);
