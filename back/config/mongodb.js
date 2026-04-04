const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL;

const mongodb = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("database connected");
  } catch (error) {}
};
module.exports = mongodb;
