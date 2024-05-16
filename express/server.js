// Concept taken from - https://gist.github.com/Haugen/f6d685f18b4bd8a3cf5bcf6272577c5b
// To use env variables using - npm install dotenv
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// Simple Hello World route.
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Adds routes.
require("./src/routes/products.routes.js")(express, app);
require("./src/routes/user.routes.js")(express, app);

// Set port, listen for requests.
const PORT = process.env.SOIL_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
