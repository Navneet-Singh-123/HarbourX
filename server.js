const express = require("express");
const connectDB = require("./config/db");
var app = require("./server/app");

// Connect to DB
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the HarbourX backend API's");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
