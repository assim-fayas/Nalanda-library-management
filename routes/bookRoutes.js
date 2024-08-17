//book Routes
const express = require("express");
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// all routes below  is protected with JWT authentication
router.use(authMiddleware.protect);

//router chaining

//all user can get the book,but only admin can add book
router
  .route("/")
  .get(bookController.getAllBooks)
  .post(authMiddleware.restrictTo("Admin"), bookController.createBook);

//all user can get the specific single book but only admin can update or delete
router
  .route("/:id")
  .get(bookController.getBook)
  .patch(authMiddleware.restrictTo("Admin"), bookController.updateBook)
  .delete(authMiddleware.restrictTo("Admin"), bookController.deleteBook);

module.exports = router;
