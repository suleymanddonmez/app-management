const App = require("../models/app");

async function clearActiveUsers(userId) {
  const apps = await App.find({ activeUser: userId });
  for (const app of apps) {
    await App.findByIdAndUpdate(
      app.id,
      {
        activeUser: "",
      },
      { runValidators: true }
    );
  }
}

module.exports = { clearActiveUsers };
