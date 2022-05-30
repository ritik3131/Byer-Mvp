import retailerModel from "../../models/retailerModel";
import dbConnect from "../../utils/dbConnect";
import * as mongoose from "mongoose";
import * as multer from "multer";
import * as Grid from "gridfs-stream";
import { GridFsStorage } from "multer-gridfs-storage";
import * as crypto from "crypto";
import * as path from "path";
import nc from "next-connect";
import Error from "../../common/errorMiddler";
import { getSession } from "../../lib/get-session";

dbConnect();
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
const handler = nc(Error);
const dbUrl = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_CLUSTER_NAME}?retryWrites=true&w=majority`;

const conn = mongoose.createConnection(dbUrl);

// Init gfs
let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
//   new GridFsStorageCtr({
//       url:,
//       f
//   })
const storage = new GridFsStorage({
  url: dbUrl,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename =
          file.fieldname +
          buf.toString("hex") +
          path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };

        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });
handler.use(upload.single("UdyamAadhar"));
// handler.use(
//   upload.fields([
//     { name: "UdyamAadhar", maxCount: 1 },
//     { name: "GSTCertificate", maxCount: 1 },
//     { name: "FSSAIREgistration", maxCount: 1 },
//     { name: "CurrentCheque", maxCount: 1 },
//     { name: "Shop&EstablishmentLicense", maxCount: 1 },
//     { name: "TradeCertificate", maxCount: 1 },
//     { name: "DrugLicense", maxCount: 1 },
//   ])
// );
// handler.use(upload.any());
handler.post(async (req, res) => {
  const session = await getSession(req, res);

  const retailer = await retailerModel.findById(session.user._id);
  retailer.kycFiles.push(req.file.filename);
  await retailer.save();
  session.user = retailer;
  //Or
  // req.user.kycFiles.push(req.file.filename);
  // req.save();
  res.status(200).send("Registration Successfull");
});

export default handler;
