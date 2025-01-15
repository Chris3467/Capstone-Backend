import User from "../models/user.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create a new user
async function create(req, res) {
  try {
    const createdUser = await User.create(req.body);
    const token = createJWT(createdUser);
    res
      .status(201)
      .json({
        token: token,
        message: "User created successfully",
        user: createdUser,
      });
  } catch (err) {
    console.log(err);
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
    console.log(user);
    if (!user) throw new Error("User not found");
    // * if we find the user, compare the password, but it is stored encrypted
    // * 1st argument is from the credentials that the user typed in
    // * 2nd argument is what is stored in the database
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error("Invalid password");
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

// function to create JTW for users
function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
export default { create, login, createJWT };
