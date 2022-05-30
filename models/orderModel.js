import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  qty: {
    type: Number,
  },
});

const OrderSchema = new Schema(
  {
    retailerId: {
      type: Schema.Types.ObjectId,
      ref: "retailers",
    },
    products: [cartItemSchema],
    totalAmount: {
      type: Number,
    },
    isFullAmountPaid: {
      type: Boolean,
    },
    isPickup: {
      type: Boolean,
    },
    orderRejected: {
      type: Boolean,
      default: false,
    },
    deliveryStatus: {
      type: String,
      enum: ["Pending", "LocalTouchPoint", "Delivered"],
      default: "Pending",
    },
    deliveryAddress: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["Completed", "10%", "0%"],
      default: "0%",
    },
    tax: {
      type: Number,
    },
    deliveryCharge:{
      type: Number,
    }
  },
  { timestamps: true }
);

let orders;
try {
  orders = mongoose.model("orders");
} catch (error) {
  orders = mongoose.model("orders", OrderSchema);
}

module.exports = orders;
