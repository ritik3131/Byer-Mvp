import dbConnect from "../../../utils/dbConnect";
import { getSession } from "../../../lib/get-session";
import * as path from "path";
import * as fs from "fs";

dbConnect();
// /api/new-retailer
async function handler(req, res) {
  console.log("From [orderId].js", req.query);
  if (req.method === "GET") {
    try {
      const session = await getSession(req, res);
      if (!session)
        res.status.json({
          error: {
            message: "You are not authorized",
            statusCode: 400,
          },
        });
      const { orderId } = req.query;
      const filename = "invoice-" + orderId + ".pdf";
      const filepath = path.resolve("documents/invoices", filename);
      // res.download(filepath);
      const src = fs.createReadStream(filepath);

      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=sample.pdf",
        "Content-Transfer-Encoding": "Binary",
      });

      src.pipe(res);
    } catch (err) {
      console.log(err);
    }
  }
  res.status(200).send("Wrong method");
}

export default handler;
