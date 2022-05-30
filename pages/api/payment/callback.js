import cartModel from "../../../models/cartModel";
import dbConnect from "../../../utils/dbConnect";
import * as https from "https";
import * as formidable from "formidable";
import PaytmChecksum from "../../../Paytm/PaytmCheckSum";
import orderModel from "../../../models/orderModel";
import userModel from "../../../models/retailerModel";

dbConnect();
export const config = {
  api: {
    bodyParser: false,
  },
};
async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, file) => {
    let paytmChecksum = fields.CHECKSUMHASH;
    delete fields.CHECKSUMHASH;

    var isVerifySignature = PaytmChecksum.verifySignature(
      fields,
      process.env.PAYTM_MERCHANT_KEY,
      paytmChecksum
    );
    if (isVerifySignature) {
      var paytmParams = {};
      paytmParams["MID"] = fields.MID;
      paytmParams["ORDERID"] = fields.ORDERID;
      /*
       * Generate checksum by parameters we have
       * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
       */
      PaytmChecksum.generateSignature(
        paytmParams,
        process.env.PAYTM_MERCHANT_KEY
      ).then(function (checksum) {
        paytmParams["CHECKSUMHASH"] = checksum;

        var post_data = JSON.stringify(paytmParams);

        var options = {
          /* for Staging */
          hostname:
            process.env.NODE_ENV === "production"
              ? "securegw.paytm.in"
              : "securegw-stage.paytm.in",

          /* for Production */
          // hostname: 'securegw.paytm.in',

          port: 443,
          path: "/order/status",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", async () => {
            let result = JSON.parse(response);
            if (result.STATUS === "TXN_SUCCESS") {
              //store in db
              const orderId = result.ORDERID;
              const order = await orderModel.findById(orderId);
              order.isFullAmountPaid
                ? (order.paymentStatus = "100%")
                : (order.paymentStatus = "10%");
              await order.save();
              const { retailerId } = order;
              await cartModel.findOneAndDelete({ retailerId: retailerId });
              await userModel.findByIdAndUpdate(order.retailerId, {
                cart: null,
              });
            }

            res.redirect(
              `http://localhost:3000/order/orderStatus/${result.ORDERID}`
            );
          });
        });

        post_req.write(post_data);
        post_req.end();
      });
    } else {
      console.log("Checksum Mismatched");
    }
  });
}

export default handler;
