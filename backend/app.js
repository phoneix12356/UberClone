import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import allRoutes from "./routes/index.js";
import { globalerrorHandler } from "./controller/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import { dbConnect } from "./config/dbConnect.js";

dbConnect();
configDotenv();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(globalerrorHandler);

app.use("/api", allRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
