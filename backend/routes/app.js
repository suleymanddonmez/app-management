require("../db");
const express = require("express");
const router = express.Router();
const App = require("../models/app");
const dotenv = require("dotenv");
const { serializeApp } = require("../serializers/app");
dotenv.config();

router.get("/all", async (req, res) => {
  try {
    const apps = await App.find({});
    const serializedApps = apps.map((app) => serializeApp(app));
    res.status(200).send(serializedApps);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/new", async (req, res) => {
  const { parameterKey, value, description } = req.body;
  const createdDate = new Date();
  try {
    let app = new App({ parameterKey, value, description, createdDate });
    await app.save();
    res.status(201).send("New app created");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
