import dbConnect from "../../../../utils/dbConnect";
import productModel from "../../../../models/productModel";

import mongoose from "mongoose";
import * as crypto from "crypto";
import * as multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import * as Grid from "gridfs-stream";
import nc from "next-connect";
import path from "path";

dbConnect();
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc();

const conn = mongoose.createConnection(process.env.DB_URL);

let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.DB_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
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

handler.use(upload.single("image"));

handler.post(async (req, res) => {
  const body = req.body;
  const uniqueImgId = String(req.file.filename);
  const newProductData = {
    ...body,
    image: uniqueImgId,
  };
  try {
    const newProduct = new productModel({ ...newProductData });
    const productResult = await newProduct.save();
    res.json(productResult);
  } catch (err) {
    res.json({ error: err });
  }
});

handler.put(async (req, res) => {
  const body = req.body;
  const newProductData = {
    ...body,
  };
  try {
    const updPro = await productModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(newProductData._id) },
      { ...newProductData },
      { new: true }
    );
    res.json(updPro);
  } catch (err) {
    res.json({ error: err });
  }
});

export default handler;
