const express = require("express");
const User = require("../models/user");
const { auth } = require("../middleware/authMiddleware");
const Post = require("../models/post");
const Journey = require("../models/journey");
const Comment = require("../models/comment");
const upload = require("../utils/upload");
const postrouter = new express.Router();

postrouter.get("/post/viewAllPosts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("journeyId", {
        startDate: 1,
        endDate: 1,
        startLocation: 1,
        endLocation: 1,
        experience: 1,
      })
      .populate("likedBy", { name: 1 })
      .populate({
        path: "postcomments",
        populate: { path: "user", select: { name: 1 } },
        select: { user: 1 },
      });

    return res.status(200).send({
      posts,
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});
postrouter.post("/post/viewSinglePosts", async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) return res.status(400).send({ error: "Post Id is required" });
    const post = await Post.findOne({ _id: postId })
      .populate("journeyId", {
        startDate: 1,
        endDate: 1,
        startLocation: 1,
        endLocation: 1,
        experience: 1,
      })
      .populate("likedBy", { name: 1 })
      .populate({
        path: "postcomments",
        populate: { path: "user", select: { name: 1 } },
        select: { user: 1 },
      });

    return res.status(200).send({
      post,
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

postrouter.post(
  "/post/create",
  auth,
  upload.array("media", 5),
  async (req, res) => {
    try {
      const { journeyId } = req.body;
      if (!journeyId) {
        return res.status(400).send({ error: "Journey Id is required" });
      }
      const mediaFiles = [];
      for (const file of req.files) {
        mediaFiles.push(file.filename);
      }
      const journey = await Journey.findOne({
        _id: journeyId,
        user: req.user._id,
      });
      if (!journey) return res.status(400).send({ error: "No journey found" });
      const post = new Post(req.body);
      post.user = req.user._id;
      post.mediaFiles = mediaFiles;
      post.journey = journey._id;
      await post.save();
      return res.status(200).send({
        post,
        message: "Post Created",
      });
    } catch (e) {
      return res.status(400).send({ error: e.message });
    }
  }
);
postrouter.post(
  "/post/update",
  auth,
  upload.array("media", 5),
  async (req, res) => {
    try {
      const { postId, removeMediaFiles } = req.body;

      if (!postId)
        return res.status(400).send({ error: "Post Id is Required" });
      const post = await Post.findOne({
        _id: postId,
        user: req.user._id,
      });
      if (!post) {
        return res.status(400).send({ error: "No post found" });
      }
      const updates = Object.keys(req.body);

      for (const update of updates) {
        post[update] = req.body[update];
      }
      for (const file of req.files) {
        post.mediaFiles.push(file.filename);
      }
      let mediaFiles = post.mediaFiles;
      if (removeMediaFiles)
        for (const file of JSON.parse(removeMediaFiles)) {
          mediaFiles = mediaFiles.filter((file) => {
            return String(file) === String(file);
          });
        }
      post.mediaFiles = mediaFiles;
      await post.save();
      return res.status(200).send({
        post,
        message: "Post Updated",
      });
    } catch (e) {
      return res.status(400).send({ error: e.message });
    }
  }
);

postrouter.post("/post/like", auth, async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) return res.status(400).send({ error: "Post Id is Required" });
    const post = await Post.findOne({
      _id: postId,
      user: req.user._id,
    });
    if (!post) {
      return res.status(400).send({ error: "No post found" });
    }
    const alreadyLiked = post.likedBy.filter((user) => {
      return String(user) === String(req.user._id);
    });
    if (alreadyLiked.length === 0) {
      post.likes = post.likes + 1;
      post.likedBy.push(req.user._id);
    }
    await post.save();
    return res.status(200).send({
      post,
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});
postrouter.post("/post/unlike", auth, async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) return res.status(400).send({ error: "Post Id is Required" });
    const post = await Post.findOne({
      _id: postId,
      user: req.user._id,
    });
    if (!post) {
      return res.status(400).send({ error: "No post found" });
    }
    const alreadyLiked = post.likedBy.filter((user) => {
      return String(user) === String(req.user._id);
    });
    if (alreadyLiked.length !== 0) {
      post.likes = post.likes - 1;
      post.likedBy.remove(req.user._id);
    }
    await post.save();
    return res.status(200).send({
      post,
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});
postrouter.post("/post/comment", auth, async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) return res.status(400).send({ error: "Post Id is Required" });
    const post = await Post.findOne({
      _id: postId,
      user: req.user._id,
    });
    if (!post) {
      return res.status(400).send({ error: "No post found" });
    }
    const comment = new Comment({ comment: req.body.comment });
    comment.post = post._id;
    comment.user = req.user._id;
    await comment.save();
    return res.status(200).send({
      comment,
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});
postrouter.post("/post/delete", auth, async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) return res.status(400).send({ error: "Post Id is Required" });
    let post = await Post.findOneAndDelete({
      _id: postId,
      user: req.user._id,
    });
    if (!post) {
      return res.status(400).send({ error: "No post found" });
    }

    return res.status(200).send({
      post,
      message: "Post Deleted",
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

module.exports = postrouter;
