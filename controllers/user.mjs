import User from "../models/user.mjs";
import bcrypt from "bcrypt";

// Create a new user
async function create(req, res) {
  try {
    const createdUser = await User.create(req.body);
    res.status(201).json({
      message: "User created successfully",
      user: createdUser,
    });
  } catch (err) {
    res.status(400).json({
      error: "Failed to create user",
      details: err.message,
    });
  }
}

// Lets the user log in
// allows user to login to their account
async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User not found");
    // * if we find the user, compare the password, but it is stored encrypted
    // * 1st argument is from the credentials that the user typed in
    // * 2nd argument is what is stored in the database
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error("Invalid password");
  } catch (err) {
    res.status(400).json(err);
  }
}

export default { create, login };
