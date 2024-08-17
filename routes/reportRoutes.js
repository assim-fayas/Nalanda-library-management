// Report routes
const express = require("express");
const reportController = require("../controllers/reportController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// all routes below  is protected with JWT authentication
router.use(authMiddleware.protect);

//all users can see the most borrowed books
router.get("/most-borrowed-books", reportController.getMostBorrowedBooks);

//only admin can have acces to see the active members
router.get(
  "/active-members",
  authMiddleware.restrictTo("Admin"),
  reportController.getActiveMembers
);

//all users can see the availability of books
router.get("/book-availability", reportController.getBookAvailability);

module.exports = router;
