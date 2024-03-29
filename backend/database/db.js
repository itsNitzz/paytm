const mongoose = require("mongoose");
const { number } = require("zod");

const { Schema } = mongoose;

mongoose.connect(
  "mongodb+srv://itsnitzz00:***@cluster0.45fsrfa.mongodb.net/paytmUsers"
);

const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const bankSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    requried: true,
  },
});

module.exports = {
  usersSchema,
  bankSchema,
};
