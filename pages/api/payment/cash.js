// import retailerModel from "../../../models/retailerModel";
import dbConnect from "../../../utils/dbConnect";
import { getSession } from "../../../lib/get-session";
import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCES_KEY,
});

dbConnect();

async function handler(req, res) {
  if (req.method === "POST") {
    const { user } =await getSession(req, res);
    const { amount } = req.body;
    let params = {
      Message: `Byer mitra will visit you tomorrow and you have to pay ${amount}`,
      PhoneNumber: user.number,
        MessageAttributes: {
          "AWS.SNS.SMS.SenderID": {
            DataType: "String",
            StringValue: "Promotional",
          },
        },
    };

    var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
      .publish(params)
      .promise();

    publishTextPromise
      .then(function (data) {
        console.log("SMS", data);
        res.status(200).send(JSON.stringify({ MessageID: data.MessageId }));
      })
      .catch(function (err) {
        console.log("AWS ERROR", err);
        res.end(JSON.stringify({ Error: err }));
      });
  }
}

export default handler;
