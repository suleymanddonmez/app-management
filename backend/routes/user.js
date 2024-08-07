require("../db");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
const auth = require("../middleware/auth");
const { serializeUser } = require("../serializers/user");
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

router.post("/isloggedin", auth, async (req, res) => {
  res.status(201).send("User active");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = new User({ name, email, password });
    await user.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const accesToken = jwt.sign({ id: user._id, time: Date() }, jwtSecretKey, { expiresIn: "1h" });
    res.json({ accesToken });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    const users = await User.find({});
    const serializedUsers = users.map((user) => serializeUser(user));
    res.status(200).send(serializedUsers);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
