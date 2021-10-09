const express = require("express");
const User = require("../models/user");
const { auth } = require("../middleware/authMiddleware");
const Journey = require("../models/journey");
const journeyrouter = new express.Router();

journeyrouter.get("/journey/viewAllUserJourney", auth, async (req, res) => {
  try {
    const journeys = await Journey.find({ user: req.user._id }).populate(
      "posts"
    );

    return res.status(200).send({
      journeys,
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});
journeyrouter.post("/journey/viewSingleUserJourney", auth, async (req, res) => {
  try {
    const { journeyId } = req.body;
    if (!journeyId) {
      return res.status(400).send({ error: "Joruney Id is required" });
    }
    const journey = await Journey.findOne({
      user: req.user._id,
      _id: journeyId,
    }).populate("posts");

    return res.status(200).send({
      journey,
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});
journeyrouter.post("/journey/create", auth, async (req, res) => {
  try {
    const journey = new Journey(req.body);
    journey.user = req.user._id;
    await journey.save();
    return res.status(200).send({
      journey,
      message: "Journey Created",
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

journeyrouter.post("/journey/update", auth, async (req, res) => {
  try {
    const { journeyId } = req.body;
    if (!journeyId)
      return res.status(400).send({ error: "Journey Id is Required" });
    const journey = await Journey.findOne({
      _id: journeyId,
      user: req.user._id,
    });
    if (!journey) {
      return res.status(400).send({ error: "No journey found" });
    }
    const updates = Object.keys(req.body);

    for (const update of updates) {
      journey[update] = req.body[update];
    }
    await journey.save();
    return res.status(200).send({
      journey,
      message: "Journey Updated",
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

journeyrouter.post("/journey/delete", auth, async (req, res) => {
  try {
    const { journeyId } = req.body;
    if (!journeyId)
      return res.status(400).send({ error: "Journey Id is Required" });
    let journey = await Journey.findOneAndDelete({
      _id: journeyId,
      user: req.user._id,
    });
    if (!journey) {
      return res.status(400).send({ error: "No journey found" });
    }

    return res.status(200).send({
      journey,
      message: "Journey Deleted",
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});
module.exports = journeyrouter;
