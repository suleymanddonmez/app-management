require("../db");
const express = require("express");
const router = express.Router();
const App = require("../models/app");
const dotenv = require("dotenv");
const { serializeApp } = require("../serializers/app");
const { clearActiveUsers } = require("../functions/app");
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

router.post("/edit", async (req, res) => {
  const { id } = req.body;
  try {
    const app = await App.findById(id);
    if (!app) {
      return res.status(404).send("App not found");
    } else if (app.activeUser != "") {
      return res.status(401).send("This record is being edited by another user!");
    } else {
      await clearActiveUsers(req.user);
      await App.findByIdAndUpdate(
        id,
        {
          activeUser: req.user,
        },
        { runValidators: true }
      );
    }
    res.status(200).send("App deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/del", async (req, res) => {
  const { id } = req.body;
  try {
    const app = await App.findByIdAndDelete(id);
    if (!app) {
      return res.status(404).send("App not found");
    }
    res.status(200).send("App deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/update", async (req, res) => {
  const { id, parameterKey, value, description } = req.body;
  try {
    const app = await App.findByIdAndUpdate(
      id,
      {
        parameterKey,
        value,
        description,
        activeUser: "",
      },
      { runValidators: true }
    );
    if (!app) {
      return res.status(404).send("App not found");
    }
    res.status(200).send("App updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
