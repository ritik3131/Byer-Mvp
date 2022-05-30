import nextSession from "next-session";
import MongoStore from "connect-mongo";
import { promisifyStore } from "next-session/lib/compat";

// const secret = "somesecret";
const dbUrl = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_CLUSTER_NAME}?retryWrites=true&w=majority`;
const connectStore = MongoStore.create({
  mongoUrl: dbUrl,
  // secret: secret,
  // touchAfter: 24 * 60 * 60,
});
export const getSession = nextSession({
  store: promisifyStore(connectStore),
  cookie: {
    maxAge: 10 * 60 * 60 * 1000,
    secure: false,
  },
});
