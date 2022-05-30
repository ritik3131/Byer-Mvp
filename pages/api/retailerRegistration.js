import retailerModel from "../../models/retailerModel";
import dbConnect from "../../utils/dbConnect";
import { getSession } from "../../lib/get-session";

dbConnect();
export const config = {
  api: {
    externalResolver: true,
  },
};
// /api/new-retailer

async function handler(req, res) {
  if (req.method === "PUT") {
    // const session = await getSession({ req });
    try {
      const { shopName, ownerName, pincode, location, address, email } =
        req.body;
      //Dummy Check
      // await retailerModel.findOneAndUpdate(
      //   { number: "+918302044304" },
      //   req.body
      // );
      const session = await getSession(req, res);
      const retailer = await retailerModel.findById(session.user._id);
      retailer.shopName = shopName;
      retailer.ownerName = ownerName;
      retailer.address = address;
      retailer.pincode = pincode;
      retailer.email = email;
      retailer.location = location;

      await retailer.save();

      // await retailerModel.findOneAndUpdate({number:req.user.number},req.body);
      res.status(200).send("Registration Successfull");
    } catch (err) {
      console.log(err);
    }
  }
}

export default handler;
