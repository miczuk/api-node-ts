import * as dotenv from "dotenv";
import * as mongoose from "mongoose";

dotenv.config();

const mongoUrl = process.env.MONGO_URI;

export const mongodbConnectionFactory = async () => {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  return db;
};
