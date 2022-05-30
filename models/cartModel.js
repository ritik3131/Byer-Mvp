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

const CartSchema = new Schema(
  {
    retailerId: {
      type: Schema.Types.ObjectId,
      ref: "retailers",
    },
    products: [cartItemSchema],
  },
  { timestamps: true }
);

let carts;
try {
  carts = mongoose.model("carts");
} catch (error) {
  carts = mongoose.model("carts", CartSchema);
}

module.exports = carts;
