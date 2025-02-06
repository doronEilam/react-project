const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  alt: {
    type: String,
  },
});

module.exports = mongoose.model("Image", imageSchema);
