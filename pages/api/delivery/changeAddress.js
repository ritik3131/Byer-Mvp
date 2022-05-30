import orderModel from "../../../models/orderModel";
import dbConnect from "../../../utils/dbConnect";
import { getSession } from "../../../lib/get-session";

dbConnect();
// /api/new-retailer

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const session = await getSession(req, res);
      if (!session)
        res.status.json({
          error: {
            message: "You are not authorized",
            statusCode: 400,
          },
        });
      const { newDeliveryAddress, orderId } = req.body;
      await orderModel.findByIdAndUpdate(orderId, {
        deliveryAddress: newDeliveryAddress,
      });
      res.status(200).send("Delivery Address updated");
    } catch (err) {
      console.log(err);
    }
  }
  res.status(200).send("Wrong method");
}

export default handler;
