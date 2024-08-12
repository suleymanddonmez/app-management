const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const auth = async function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    const user = await User.findById(decoded.id); // Kullanıcıyı bul

    if (!user) {
      return res.status(404).send("User not found");
    } else {
      req.user = decoded.id;
      next();
    }
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

module.exports = auth;
