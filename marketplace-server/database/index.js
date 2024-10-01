const mongoose = require("mongoose");
const { dbHost, dbPass, dbName, dbPort, dbUser } = require("../app/config");
const MONGODB_URI = process.env.MONGODB_URI;

// mongoose.connect(
//   `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`
// );

mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log("MongoDB Atlas connected successfully"))
  .catch((err) => console.error("MongoDB connection error: ", err));

const db = mongoose.connection;

module.exports = db;
