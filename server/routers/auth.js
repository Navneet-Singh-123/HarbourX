const express = require("express");
const User = require("../models/user");
const authrouter = new express.Router();

authrouter.post("/auth/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .send({ error: "Invalid Request . Missing required fields" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .send({ error: "Password length must be of atleast 8 characters." });
    }
    const emailInDB = await User.findOne({ email });
    if (emailInDB)
      return res.status(400).send({ error: "Email is already registered" });
    const user = new User({ email, password, name });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).send({
      token: token,
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

authrouter.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    return res.status(200).send({
      token: token,
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

module.exports = authrouter;
