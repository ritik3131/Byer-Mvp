import retailerModel from "../../models/retailerModel";
import dbConnect from "../../utils/dbConnect";
import { getSession } from "../../lib/get-session";

dbConnect();
// /api/new-retailer
export const config = {
  api: {
    externalResolver: true,
  },
};

async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession(req, res);
    // const session = await getSession({ req });
    const { phoneNumber, stsTokenManager } = req.body;
    const { expirationTime } = stsTokenManager;
    if (expirationTime > 0) {
      const retailer = await retailerModel.findOne({ number: phoneNumber });

      if (retailer) {
        session.user = !session.user ? retailer : session.user;
        console.log("Retailer", session);
        res.status(200).json({ message: "Already user exists!!" });
      } else {
        const newRetailer = new retailerModel({ number: phoneNumber });
        await newRetailer.save();
        session.user = !session.user ? newRetailer : session.user;
        console.log("Retailer", session);
        res.status(201).json({ message: "user created!" });
      }
    }
  }
}

export default handler;
