const express = require("express");
const cors = require("cors");
const app = express();
const authrouter = require("./routers/auth");
const userrouter = require("./routers/user");
const journeyrouter = require("./routers/journey");
const postrouter = require("./routers/post");
const filerouter = require("./routers/files");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(authrouter);
app.use(userrouter);
app.use(journeyrouter);
app.use(postrouter);
app.use(filerouter);

module.exports = app;
