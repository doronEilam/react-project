const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/BusinessCard"
    );
    console.log(`MongoDb ConnectDB`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
