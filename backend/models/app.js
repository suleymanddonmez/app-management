const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  parameterKey: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  description: { type: String, required: true },
  createdDate: { type: Date, required: true },
});

const App = mongoose.model("App", appSchema);

module.exports = App;
