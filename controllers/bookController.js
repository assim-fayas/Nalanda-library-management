const Book = require("../models/book");

// Creates a new book in the database.
const createBook = async (req, res, next) => {
  try {
    // Check if the book already exists in the database.
    const existingBook = await Book.findOne({ title: req.body.title });
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists" });
    }

    // Create a new book using the request body.
    const book = await Book.create(req.body);

    // Send a success response with the created book.
    res.status(201).json({ status: "success", data: book });
  } catch (err) {
    // Pass the error to the next middleware function.
    next(err);
  }
};

// Retrieves a list of all books in the database. Allows for pagination and filtering by genre and author.
const getAllBooks = async (req, res, next) => {
  try {
    // Extract the page and limit from the request query.
    const { page = 1, limit = 10, genre, author } = req.query;

    // Create a filter object to narrow down the search.
    const filter = {};
    if (genre) filter.genre = genre;
    if (author) filter.author = author;

    // Query the database for the books that match the filter.
    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Count the total number of books in the database that match the filter.
    const totalBooks = await Book.countDocuments(filter);

    // Package the data into an object to be returned in the response.
    res.status(200).json({
      status: "success",
      data: {
        books,
        totalPages: Math.ceil(totalBooks / limit),
        currentPage: Number(page),
        totalBooks,
      },
    });
  } catch (err) {
    // Pass the error to the next middleware function in the stack.
    next(err);
  }
};

//  Retrieves a book from the database based on its ID.
const getBook = async (req, res, next) => {
  try {
    // Find the book by its ID.
    const book = await Book.findById(req.params.id);

    // If the book is not found, return a 404 error.
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Return the book as a success response.
    res.status(200).json({ status: "success", data: book });
  } catch (err) {
    // Pass the error to the next middleware function.
    next(err);
  }
};

//  Updates a book in the database based on its ID.
const updateBook = async (req, res, next) => {
  try {
    // Find the book by its ID and update it with the new data from the request body.
    // The "new: true" option returns the updated document instead of the original.
    // The "runValidators: true" option runs any registered validators on the updated document.
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // If the book is not found, return a 404 error.
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Return the updated book as a success response.
    res.status(200).json({ status: "success", data: book });
  } catch (err) {
    // Pass the error to the next middleware function.
    next(err);
  }
};

//  Deletes a book from the database based on its ID.
const deleteBook = async (req, res, next) => {
  try {
    // Find the book by its ID and delete it.
    const book = await Book.findByIdAndDelete(req.params.id);

    // If the book is not found, return a 404 error.
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Return a success response with no content.
    res.status(204).json({
      status: "success",
      data: null,
      message: "Book deleted successfully",
    });
  } catch (err) {
    // Pass the error to the next middleware function.
    next(err);
  }
};

// Retrieves a list of all books with their availability from the database.
const getBookAvailability = async (req, res, next) => {
  try {
    // Use the MongoDB aggregation framework to calculate the availability of each book.
    const bookAvailability = await Book.aggregate([
      {
        // Project the title, total copies, and available copies of each book.
        $project: {
          title: 1,
          totalCopies: "$numberOfCopies",
          availableCopies: { $subtract: ["$numberOfCopies", "$borrowedCount"] },
        },
      },
    ]);

    // Return the availability of each book as a success response.
    res.status(200).json({
      status: "success",
      data: bookAvailability,
    });
  } catch (err) {
    // Pass the error to the next middleware function.
    next(err);
  }
};

module.exports = {
  createBook,
  getAllBooks,
  deleteBook,
  updateBook,
  getBook,
  getBookAvailability,
};
