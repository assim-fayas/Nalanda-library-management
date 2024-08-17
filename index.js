//Nalanda Library Management System
const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reportRoutes = require("./routes/reportRoutes");
const borrowRoutes = require("./routes/borrowRoutes");

require("dotenv").config();

//database connection
const connectDB = require("./config/db");
connectDB.dbconnect();

app.use(cookieparser());
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/borrow", borrowRoutes);

//global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ status: "error", message: err.message });
});

//port
const PORT = process.env.PORT || 3000;

//server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
