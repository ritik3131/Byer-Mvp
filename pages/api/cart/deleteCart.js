import dbConnect from "../../../utils/dbConnect";
import Cart from "../../../models/cartModel";
import Retailer from "../../../models/retailerModel";
import mongoose from "mongoose";
import { getSession } from "../../../lib/get-session";

dbConnect();

async function handler(req, res) {
  if (req.method === "DELETE") {
    const { user } = await getSession(req, res);
    const retailerId = user._id;
    let cartId;
    try {
      let retailer = await Retailer.findById(retailerId);
      cartId = retailer.cart;
      await Retailer.updateOne({ _id: retailerId }, { cart: null });
      await Cart.deleteOne({ _id: cartId });
      res.send(200).json({ msg: "deleted" });
    } catch (err) {
      res.json({ err });
    }
  }
}

export default handler;
