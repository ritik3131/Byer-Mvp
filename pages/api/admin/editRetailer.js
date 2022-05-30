import dbConnect from "../../../utils/dbConnect";
import Cart from "../../../models/cartModel";
import Retailer from "../../../models/retailerModel";
import mongoose from "mongoose";

async function handler(req, res) {
  await dbConnect();
  if (req.method === "PATCH") {
    console.log(req.body);
    try {
      await Retailer.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.body.userId) },
        { ...req.body }
      );
      res.status(200).json("Updated retailer");
    } catch (error) {
      res.json({ err: error });
    }
  }
}

export default handler;
