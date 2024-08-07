const express = require("express");
const cors = require("cors");
const auth = require("./middleware/auth");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

// Tüm isteklerde CORS izinleri sağlamak için:
app.use(cors());

// Belirli bir origin için CORS izinleri sağlamak için:
// app.use(cors({ origin: 'http://example.com' }));

// Belirli bir origin ve yöntemler için CORS izinleri sağlamak için:
// app.use(cors({ origin: 'http://example.com', methods: ['GET', 'POST'] }));

// Veya özelleştirilmiş bir fonksiyon kullanarak CORS izinleri sağlamak için:
// app.use(cors({ origin: (origin, callback) => { callback(null, true); } }));

const userRoute = require("./routes/user");
app.use("/user", userRoute);

const appRoute = require("./routes/app");
app.use("/app", auth, appRoute);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
