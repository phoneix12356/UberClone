import driverModel from "../models/driver.models.js";
import CustomError from "../utils/customError.js";

export const registerDriver = async (req, res, next) => {
  const { name, email, password } = req.body;
  const driverExits = await driverModel.findOne({ email });
  if (driverExits) {
    throw new CustomError("Driver already exits with these email");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newDriver = new driverModel({
    ...req.body,
    password: hashedPassword,
  });
  await newDriver.save();
  const token = jwt.sign({ driverId: newDriver._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("DriverToken", token, {
    HttpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    status: "success",
    message: "Driver registered successfully",
  });
};

export const loginDriver = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new CustomError("Please all the field", 400);
  const driver = await driverModel.findOne({ email });
  if (!driver) throw new CustomError("Driver not found", 400);
  const isMatch = await bcrypt.compare(password, driver.password);
  if (!isMatch) throw new CustomError("Invalid credentials", 400);
  const token = jwt.sign({ driverId: driver._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("DriverToken", token, {
    HttpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    status: "success",
    message: "Driver logged in successfully",
  });
};
