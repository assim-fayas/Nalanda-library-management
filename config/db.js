// Database connection
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  dbconnect: async () => {
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log(" db connect successfully");
    } catch (err) {
      console.error("DB connection error:", err);
      process.exit(1);
    }
  },
};
