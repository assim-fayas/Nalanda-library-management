//Nalanda Library Management System
const express = require("express");
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reportRoutes = require("./routes/reportRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const { swaggerUi, swaggerDocs } = require("./config/swagger");
require("dotenv").config();

//database connection
const connectDB = require("./config/db");
connectDB.dbconnect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(express.json());

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//schedules cron job
const job = require("./config/job");
job.start();

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
