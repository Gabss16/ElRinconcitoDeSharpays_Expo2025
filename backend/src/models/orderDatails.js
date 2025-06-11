import { Schema, model } from "mongoose";

const itemSchema = new Schema({
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
default: 1
},
discount: {
type: Number,
default: 0
},
customDesign: String,
totalPrice: Number
});

const orderDetailSchema = new Schema({
customerId: {
type: Schema.Types.ObjectId,
ref: "Costumers",
required: true
},
items: [itemSchema],
totalCartPrice: {
type: Number,
default: 0
}
}, { timestamps: true });

export default model("orderDetail", orderDetailSchema);