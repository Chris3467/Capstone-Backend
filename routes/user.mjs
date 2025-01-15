import express from "express";
const router = express.Router();
import userController from "../controllers/user.mjs";

// This will create a new user on the register page
router.post("/", userController.create);
router.post("/login", userController.login);

export default router;
