const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const SECRET = config.get("SECRET");
const JWT_EXPIRE_TIME = config.get("JWT_EXPIRE_TIME");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    photo: {
      type: String,
    },
    address: {
      line1: {
        type: String,
        maxlength: 50,
      },
      city: {
        type: String,
        maxlength: 30,
      },
      state: {
        type: String,
        maxlength: 30,
      },
      postalCode: {
        type: String,
        maxlength: 30,
      },
      country: {
        type: String,
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};
userSchema.virtual("journeys", {
  ref: "journey",
  localField: "_id",
  foreignField: "user",
});
userSchema.virtual("posts", {
  ref: "post",
  localField: "_id",
  foreignField: "user",
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, SECRET, {
    expiresIn: JWT_EXPIRE_TIME,
  });
  return token;
};
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw new Error("Invalid username/password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid username/password");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const User = mongoose.model("user", userSchema);
module.exports = User;
