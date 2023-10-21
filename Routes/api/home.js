const express = require('express');
const path = require("path");

const app = express();

// Get Homepage
app.get("/", (req, res) => {
    //res.send("Hello World!");
    res.sendFile('E:/ExpressJS_Intro/Public/index.html');
  });

  module.exports = app;