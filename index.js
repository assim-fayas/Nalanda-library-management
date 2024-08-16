//Nalanda Library Management System
const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const connectDB = require("./config/db");
require("dotenv").config();
connectDB.dbconnect();

app.use(cookieparser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ status: "error", message: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
