const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/db_marketplace")
  .then(() => {
    console.log("MongoDB connected successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const db = mongoose.connection;

module.exports = db;
