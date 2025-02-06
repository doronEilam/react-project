const mongoose = require("mongoose");
const addresSchema = require("./address");
const imageSchema = require("./image");

const UserSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 10,
    },
    middle: {
      type: String,
    },
    last: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 10,
    },
  },
  phone: {
    type: String,
    required: true,
    match: /^0\d{8,9}$/,
  },
  email: {
    type: String,
    required: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 9,
    validate: {
      validator: function (value) {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[@#$%^&*-]/.test(value);

        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      },
      message:
        "Password must be at least 9 characters and contain an uppercase letter, lowercase letter, number and special character (@#$%^&*-)",
    },
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  isBuusiness: Boolean,
});

module.exports = mongoose.model("User", UserSchema);
