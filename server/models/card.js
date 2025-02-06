const { LinkedCameraSharp } = require("@mui/icons-material");
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  web: {
    type: String,
    required: false,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  // biznumber: {
  //   type: Number,
  //   required: false,
  //   match: /^[0-9]{7}-[0-9]{1}$/,
  // },
  // likes: {
  //   type: Array,
  // },
  // user_id: {
  //   type: String,
  //   required: false,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("card", cardSchema);
