import dbConnect from "../../../utils/dbConnect";
import * as mongoose from "mongoose";
import * as Grid from "gridfs-stream";

dbConnect();
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
const dbUrl = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_CLUSTER_NAME}?retryWrites=true&w=majority`;

const conn = mongoose.createConnection(dbUrl);

// Init gfs
let gfs,gridfsBucket;

conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
  bucketName: 'uploads'
});

  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})

export default function handler(req, res) {
  if (req.method === "GET") {
    const { fileName } = req.query;
    gfs.files.findOne({ filename: fileName }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists",
        });
      }

      // Check if image
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/jpg" ||
        file.contentType === "image/png"
      ) {
        // Read output to browser
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
      } else {
        res.status(404).json({
          err: "Not an image",
        });
      }
    });
  }
}
