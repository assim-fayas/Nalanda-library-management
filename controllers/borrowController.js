const BorrowRecord = require("../models/borrowRecord");
const Book = require("../models/book");

// Creates a new borrow record for a book.
const borrowBook = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const bookId = req.body.bookId;

    // Find the book by its ID and check if it is available.
    const book = await Book.findById(bookId);
    if (!book || book.numberOfCopies <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // Check if the user has already borrowed the book and hasn't returned it yet
    const existingBorrowRecord = await BorrowRecord.findOne({
      user: userId,
      book: bookId,
      returnedAt: null,
    });

    if (existingBorrowRecord) {
      return res.status(400).json({
        message:
          "You have alredy borrowed this book,you cannot borrow it without returning it.",
      });
    }

    // Decrease the number of copies of the book and increase the borrowed count.
    book.numberOfCopies -= 1;
    book.borrowedCount += 1;
    await book.save();

    // Create a new borrow record for the book.
    const borrowRecord = await BorrowRecord.create({
      user: userId, // Set the user ID of the borrow record.
      book: bookId, // Set the book ID of the borrow record.
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
      { book: req.params.id, returnedAt: null }, // Find the borrow record with the given ID and where the returnedAt property is null.
      { returnedAt: new Date() }, // Update the returnedAt property with the current date.
      { new: true } // Return the updated borrow record.
    );

    // If the borrow record is not found, return an error response.
    if (!borrowRecord)
      return res.status(400).json({ message: "Invalid borrow record" });

    // Find the book associated with the borrow record and increase its numberOfCopies property.
    const book = await Book.findById(borrowRecord.book);
    book.numberOfCopies += 1;
    book.borrowedCount -= 1;
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
    })
      .select("-__v")
      .populate({
        path: "book",
        select: "-numberOfCopies -borrowedCount -ISBN -publicationDate -__v", // Exclude numberOfCopies and borrowedCount
      });

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
