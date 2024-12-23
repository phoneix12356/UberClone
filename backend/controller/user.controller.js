import userModel from "../models/user.model.js";
import CustomError from "../utils/customError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name,email,password);
  if (!name || !email || !password) {
    throw new CustomError("Please all the field",400);
  }
  const userExits = await userModel.findOne({ email });
  if (userExits) {
    throw new CustomError("User already exits with these email",400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new CustomError("Please all the field",400);
  const user = await userModel.findOne({ email });
  console.log(email,password);
  if (!user) throw new CustomError("User not found",400);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError("Invalid credentials",400);
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
  });
};

export { registerUser, loginUser };