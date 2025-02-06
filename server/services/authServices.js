const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");

const register = async (userData) => {
  let user = await User.findOne({ email: userData.email.toLowerCase() });
  if (user) throw new Error("User already exist");

  user = new User(userData);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(userData.password, salt);

  await user.save();

  return generateToken(user);
};

const login = async (userData) => {
  console.log("user from serveice", userData);
  let user = await User.findOne({ email: userData.email });
  if (!user) throw new Error("User not found");
  const isValidPassword = await bcrypt.compare(
    userData.password,
    user.password
  );
  if (!isValidPassword) throw new Error("invalid password");
  return generateToken(user);
};

const generateToken = (user) => {
  return jwt.sign({ _id: user._id }, config.jwtKey, { expiresIn: "1h" });
};
module.exports = {
  login,
  register,
};
