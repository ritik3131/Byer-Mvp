import dbConnect from "../../../../utils/dbConnect";
import Cart from "../../../../models/cartModel";
import mongoose from "mongoose";

dbConnect();

async function handler(req, res) {
  if (req.method === "DELETE") {
    const { cartId, productId } = req.query;
    const cart = await Cart.findOne({ _id: mongoose.Types.ObjectId(cartId) });
    if (!cart) {
      res.status(404).json({ err: "Cart not found" });
    }
    const products = [...cart.products];
    const isProductPresent = products.find((item) => {
      return item.productId.equals(productId);
    });
    if (!isProductPresent) {
      res.status(404).json({ err: "Product not found in your cart" });
    }
    const newProducts = products.filter(
      (item) => !item.productId.equals(productId)
    );
    await Cart.findOneAndUpdate({ _id: cart._id }, { products: newProducts });
    res.status(200).json({ msg: "Product Removed" });
  }
}

export default handler;
