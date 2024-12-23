import express from "express";
import users from './user.routes.js';
import drivers from './driver.routes.js';
const router = express.Router();

router.use("/user", users);
router.use("/driver", drivers);



export default router;
