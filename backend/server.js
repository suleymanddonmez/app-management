const express = require("express");
const cors = require("cors");
const auth = require("./middleware/auth");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

// allow all origins
// app.use(cors());

const allowedOrigins = ['https://app.yazilimdev.com', 'http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
};
app.use(cors(corsOptions));

const userRoute = require("./routes/user");
app.use("/user", userRoute);

const appRoute = require("./routes/app");
app.use("/app", auth, appRoute);

const port = 3007;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
