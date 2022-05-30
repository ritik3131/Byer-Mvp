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

handler.delete(async (req, res) => {
  await dbConnect();
  try {
    const productToRemove = await productModel.findOne({
      _id: mongoose.Types.ObjectId(req.query.productId),
    });
    if (!productToRemove) {
      res.status(404).json("Not found");
    }
    // const imgToRemove = mongoose.Types.ObjectId(productToRemove.image);
    // await gfs.remove(
    //   { _id: imgToRemove, root: "uploads" },
    //   (err, gridStore) => {
    //     if (err) {
    //     }
    //   }
    // );
    await productModel.findOneAndRemove({ _id: productToRemove._id });
    res.status(200).json("d");
  } catch (err) {
    res.json(err);
  }
});

export default handler;
