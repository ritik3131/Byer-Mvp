import dbConnect from "../../../utils/dbConnect";
import Retailer from "../../../models/retailerModel";
import mongoose from "mongoose";
import Order from "../../../models/orderModel";
import cartModel from "../../../models/cartModel";
import { getSession } from "../../../lib/get-session";

dbConnect();

async function handler(req, res) {
  if (req.method === "POST") {
    const { user } = await getSession(req, res);
    const retailerId = user._id;
    let address, number, oldOrders;
    try {
      const retailer = await Retailer.findById(retailerId);
      address = retailer.address;
      oldOrders = retailer.order;
    } catch (error) {
      res.json({ err: error });
    }
    const { products } = await cartModel.findOne({ retailerId: retailerId });
    const { isPickup, isFullAmountPaid, totalAmount, tax, deliveryCharge } =
      req.body;
    const newOrder = new Order({
      retailerId,
      products,
      isFullAmountPaid,
      totalAmount,
      isPickup,
      deliveryAddress: address,
      number,
      tax,
      deliveryCharge,
    });
    try {
      const ord = await newOrder.save();
      await Retailer.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(retailerId) },
        { order: [...oldOrders, ord._id] }
      );
      res.status(201).json({ msg: ord });
    } catch (error) {
      res.json({ err: error });
    }
  } else if (req.method === "PATCH") {
    try {
      await Order.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.body.orderId) },
        { ...req.body }
      );
      res.status(200).json("Updated order");
    } catch (error) {
      res.json({ err: error });
    }
  }
}

export default handler;
