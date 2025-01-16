import express from "express";
const router = express.Router();
import userController from "../controllers/user.mjs";

// This will create a new user on the register page
router.post("/", userController.create);
router.post("/login", userController.login);

// Delete a user
router.delete("/:id", userController.deleteUser);

// Update user profile
router.put("/:id", userController.updateUser);

export default router;
