const BorrowRecord = require("../models/borrowRecord");
const Book = require("../models/book");

// Creates a new borrow record for a book.
const borrowBook = async (req, res, next) => {
  try {
    // Find the book by its ID and check if it is available.
    const book = await Book.findById(req.body.bookId);
    if (!book || book.numberOfCopies <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // Decrease the number of copies of the book and increase the borrowed count.
    book.numberOfCopies -= 1;
    book.borrowedCount += 1;
    await book.save();

    // Create a new borrow record for the book.
    const borrowRecord = await BorrowRecord.create({
      user: req.user._id, // Set the user ID of the borrow record.
      book: req.body.bookId, // Set the book ID of the borrow record.
    });

    // Return the created borrow record as a success response.
    res.status(201).json({ status: "success", data: borrowRecord });
  } catch (err) {
    // Pass the error to the next middleware function.
    next(err);
  }
};

//Updates a borrow record with the current date and returns the updated record.
const returnBook = async (req, res, next) => {
  try {
    // Find and update the borrow record with the current date and return it.
    const borrowRecord = await BorrowRecord.findOneAndUpdate(
      { _id: req.params.id, returnedAt: null }, // Find the borrow record with the given ID and where the returnedAt property is null.
      { returnedAt: new Date() }, // Update the returnedAt property with the current date.
      { new: true }, // Return the updated borrow record.
      { _id: req.params.id, returnedAt: null },
      { returnedAt: new Date() },
      { new: true }
    );

    // If the borrow record is not found, return an error response.
    if (!borrowRecord)
      return res.status(400).json({ message: "Invalid borrow record" });

    // Find the book associated with the borrow record and increase its numberOfCopies property.
    const book = await Book.findById(borrowRecord.book);
    book.numberOfCopies += 1;
    await book.save();

    // Return the updated borrow record as a success response.
    res.status(200).json({ status: "success", data: borrowRecord });
  } catch (err) {
    // Pass the error to the next middleware function.
    next(err);
  }
};

// Retrieves the borrow history of the currently logged-in user.
const getBorrowHistory = async (req, res, next) => {
  try {
    // Find all borrow records associated with the currently logged-in user.
    // Populate the book field with the associated book object.
    const borrowRecords = await BorrowRecord.find({
      user: req.user._id,
    }).populate("book");

    // Return the borrow history as a success response.
    res.status(200).json({ status: "success", data: borrowRecords });
  } catch (err) {
    // Pass the error to the next middleware function.
    next(err);
  }
};

module.exports = {
  borrowBook,
  getBorrowHistory,
  returnBook,
};
