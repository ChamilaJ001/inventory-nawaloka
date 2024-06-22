import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI!);
  } catch (error) {
    console.log(error);
    throw new Error("Can't connect to MongoDb");
  }
};

export default connectDB;
