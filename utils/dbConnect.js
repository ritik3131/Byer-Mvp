import mongoose from "mongoose";

const connection = {};
const dbUrl = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_CLUSTER_NAME}?retryWrites=true&w=majority`;
async function dbConnect() {
  if (connection.isConnected) return;
  const db = await mongoose.connect(
    dbUrl
    //     ,
    //     {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }
  );
  connection.isConnected = db.connections[0].readyState;
  // console.log(db);
}

export default dbConnect;
