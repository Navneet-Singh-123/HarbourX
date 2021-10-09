const express = require("express");
const User = require("../models/user");
const { auth } = require("../middleware/authMiddleware");
const userrouter = new express.Router();

userrouter.get("/getUserInfo", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(400).send({ error: "No such user found" });

    return res.status(200).send({
      user,
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});
userrouter.post("/updateDetails", auth, async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const emailInDB = await User.findOne({
        _id: { $ne: req.user._id },
        email,
      });
      if (emailInDB) {
        return res
          .status(400)
          .send({ error: "Email is already used by someone" });
      }
    }
    const updates = Object.keys(req.body);

    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(400).send({ error: "No such user found" });
    for (const update of updates) {
      user[update] = req.body[update];
    }
    await user.save();
    return res.status(200).send({
      user,
      message: "Details Updated",
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});
module.exports = userrouter;
