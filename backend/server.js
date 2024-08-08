const express = require("express");
const cors = require("cors");
const auth = require("./middleware/auth");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

// allow all origins
// app.use(cors());
app.use(cors({ origin: 'https://app.yazilimdev.com', methods: ['GET', 'POST'] }));

const userRoute = require("./routes/user");
app.use("/user", userRoute);

const appRoute = require("./routes/app");
app.use("/app", auth, appRoute);

const port = 3007;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
