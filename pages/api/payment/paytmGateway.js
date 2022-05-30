import retailerModel from "../../../models/retailerModel";
import dbConnect from "../../../utils/dbConnect";
import PaytmChecksum from "../../../Paytm/PaytmCheckSum";
import { getSession } from "../../../lib/get-session";

dbConnect();
// /api/new-retailer

async function handler(req, res) {
  if (req.method === "POST") {
    const { user } = await getSession(req, res);
    const {orderId}=req.body
    let paymentDetails = {
      amount: req.body.amount,
      customerId: user.ownerName,
      customerEmail: user.email,
      customerPhone: user.number,
    };
    if (
      !paymentDetails.amount ||
      !paymentDetails.customerId ||
      !paymentDetails.customerEmail ||
      !paymentDetails.customerPhone
    ) {
      res.status(400).send("Payment failed");
    } else {
      let params = {};
      params["MID"] = process.env.PAYTM_MERCHANT_ID;
      params["WEBSITE"] = process.env.PAYTM_MERCHANT_WEBSITE;
      params["CHANNEL_ID"] = "WEB";
      params["INDUSTRY_TYPE_ID"] = "Retail";
      (params["ORDER_ID"] = orderId),
        (params["CUST_ID"] = paymentDetails.customerId);
      params["TXN_AMOUNT"] = paymentDetails.amount;
      params["CALLBACK_URL"] = process.env.PAYMENT_CALLBACK;
      params["EMAIL"] = paymentDetails.customerEmail;
      params["MOBILE_NO"] = paymentDetails.customerPhone;

      var paytmChecksum = PaytmChecksum.generateSignature(
        params,
        process.env.PAYTM_MERCHANT_KEY
      );
      paytmChecksum
        .then(function (checksum) {
          let paytmParams = {
            ...params,
            CHECKSUMHASH: checksum,
          };
          res.json(paytmParams);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}

export default handler;
