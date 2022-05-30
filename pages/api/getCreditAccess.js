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

dbConnect();
export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = nc(Error);
const dbUrl = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_CLUSTER_NAME}?retryWrites=true&w=majority`;
console.log("From upload",dbUrl)
const conn = mongoose.createConnection(dbUrl);

// Init gfs
let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

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
// // handler.use(upload.single("file"));
handler.use(
  upload.fields([
    { name: "UdyamAadhar", maxCount: 1 },
    { name: "GSTCertificate", maxCount: 1 },
    { name: "ShopPhoto", maxCount: 1 },
    { name: "CancelCheque", maxCount: 1 },
    { name: "Shop&EstablishmentLicense", maxCount: 1 },
  ])
);
// handler.use(upload.any());
handler.post((req, res) => {
  console.log(req.files);
  const isShopPhoto = req.files.find((f) => f.fieldname === "ShopPhoto");
  const isCancelCheque = req.files.find((f) => f.fieldname === "CancelCheque");
  const isKyc = req.files.find((f) => {
    return (
      f.filename === "UdyamAadhar" ||
      f.filename === "GSTCertificate" ||
      f.filename === "ShopPhoto"
    );
  });
  if (!isShopPhoto || !isCancelCheque || isKyc)
    res.status(400).send("Access denied");

  //req.files.map(f=> req.session.user.creditsFiles.push(f.filename);)
  //await req.session.user.save();

  //Or
  //req.files.map(f=> req.user.creditsFiles.push(f.filename);)
  // req.save();
  res.status(200).send("Access to Credit Done Successfull");
});

export default handler;
