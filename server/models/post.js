const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    location: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    mediaFiles: [
      {
        type: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    journeyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "journey",
    },
    description: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
postSchema.virtual("journey", {
  ref: "journey",
  localField: "journey",
  foreignField: "_id",
});
postSchema.virtual("postcomments", {
  ref: "comment",
  localField: "_id",
  foreignField: "post",
});
const Post = mongoose.model("post", postSchema);
module.exports = Post;
