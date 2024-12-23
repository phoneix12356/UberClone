import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import CustomError from "../utils/customError.js";
configDotenv();

export const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("database connectiion successfull");
  } catch (err) {
    throw new CustomError(500, err.message);
  }
};

process.setMaxListeners(20);