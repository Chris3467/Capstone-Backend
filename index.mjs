import express from "express";
import dotenv from "dotenv";
dotenv.config();

import db from "./db/conn.mjs";
import cors from "cors";

// Routes
import users from "./routes/user.mjs";

// Port setup
const PORT = process.env.PORT || 5052;

// App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Calling on the routes
app.use("/api/users", users);

// default, catch-all route
// TODO routes
app.get("/", (req, res) => {
  res.send("Welcome to Toddler Words API");
});
// app.get("/*", (req, res) => {
//   res.send("Success");
//   // res.redirect("/");
// });

//Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("there was an issue on the server");
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
