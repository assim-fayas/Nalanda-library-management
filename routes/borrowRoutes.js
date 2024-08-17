// borrow Routes
const express = require("express");
const borrowController = require("../controllers/borrowController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// all routes below  is protected with JWT authentication
router.use(authMiddleware.protect);

//to borrow a book
router.post("/borrow", borrowController.borrowBook);

//to return a borrowed book
router.patch("/return/:id", borrowController.returnBook);

//to get borrow history of the logged-in user
router.get("/history", borrowController.getBorrowHistory);

module.exports = router;
