import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    category: {
      type: String,
    },
    tax: {
      type: Number,
    },
    commission: {
      type: Number,
    },
    qtyAvailable: {
      type: Number,
    },
  },
  { timestamps: true }
);

let products;
try {
  products = mongoose.model("products");
} catch (error) {
  products = mongoose.model("products", ProductSchema);
}

module.exports = products;
