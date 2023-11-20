const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ItemModel' }],
});

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    // Generate and set a verification token
    this.verificationToken = crypto.randomBytes(16).toString("hex");
    // Set isVerified to false
    this.isVerified = false;
  }
  next();
});

// Static method to handle user login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

module.exports = mongoose.model("Users", userSchema);
