import User from "../models/user.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create a new user
async function create(req, res) {
  try {
    const createdUser = await User.create(req.body);
    const token = createJWT(createdUser);
    res.status(201).json({
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
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) throw new Error("User not found");
    // * if we find the user, compare the password, but it is stored encrypted
    // * 1st argument is from the credentials that the user typed in
    // * 2nd argument is what is stored in the database
    console.log(req.body.password, "applez");
    console.log(user.password, "banna");
    const match = await bcrypt.compare(req.body.password, user.password);
    console.log(match);
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

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    console.log(deletedUser);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.send(err).status(400);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body, // This contains the updates sent from the frontend
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(updatedUser); // Log the updated user for debugging
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({ message: "Error updating user", error: err });
  }
};

export default { create, login, createJWT, deleteUser, updateUser };
