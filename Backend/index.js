const express = require("express");
const cors = require("cors");
const path = require("path");

const logger = require("./Middleware/logger.js");

// Express init
const app = express();

// Enabling Cross-Origin Resource Sharing
app.use(cors());

// Init logger Middleware
app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mounting memeber routes (1: Using Router)
app.use("/api/members", require("./Routes/api/members"));

// Using get home (2: Importing Modules)
app.use("/", require("./Routes/api/home"));

// Get about (3: Same page)
app.get("/about", (req, res) => {
  res.sendFile("E:/ExpressJS_Intro/Frontend/about.html");
  // res.sendFile(path.join(__dirname, "Frontend", "about.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on server ${PORT}`));
