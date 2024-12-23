import express from "express";
import * as userController from "../controller/user.controller.js";
import  asyncHandler  from "../utils/asyncHandler.js";
const router = express.Router();

// Define routes for user operations

router.post("/register", asyncHandler(userController.registerUser));
router.post("/login", asyncHandler(userController.loginUser));
// router.get("/:id", asyncHandler(userController.getUserById));
// router.put("/:id", asyncHandler(userController.updateUser));
// router.delete("/:id", asyncHandler(userController.deleteUser));
export default router;
