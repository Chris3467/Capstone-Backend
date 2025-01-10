// imports
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Global configuration
const mongoURI = process.env.ATLAS_URI;
const db = mongoose.connection;

// Connect to the database
mongoose.connect(mongoURI);
mongoose.connection.once("open", () => {
  console.log("Connected to the database");
});

export default db;
