const Book = require("../models/book");
const BorrowRecord = require("../models/borrowRecord");

//  Retrieves the most borrowed books from the database.
const getMostBorrowedBooks = async (req, res, next) => {
  try {
    // Retrieve the most borrowed books from the database.
    const mostBorrowedBooks = await Book.aggregate([
      {
        // Project the title, author, and borrowed count of each book.
        $project: {
          title: 1,
          author: 1,
          borrowedCount: 1,
        },
      },
      {
        // Sort the books by their borrowed count in descending order (highest first).
        $sort: { borrowedCount: -1 },
      },
      {
        // Limit the number of books returned to 10.
        $limit: 10,
        $limit: 10, // Adjust this number to control how many books are returned
      },
    ]);

    // Return the most borrowed books as a success response.
    res.status(200).json({
      status: "success",
      data: mostBorrowedBooks,
    });
  } catch (err) {
    // Pass any errors to the next middleware function.
    next(err);
  }
};

// Retrieves the most active members based on the number of borrow records.
const getActiveMembers = async (req, res, next) => {
  try {
    // Retrieve the most active members from the database.
    const activeMembers = await BorrowRecord.aggregate([
      {
        // Group the borrow records by user and calculate the total number of borrowed books.
        $group: {
          _id: "$user",
          borrowCount: { $sum: 1 },
        },
      },
      {
        // Sort the members by their borrow count in descending order (highest first).
        $sort: { borrowCount: -1 },
      },
      {
        // Limit the number of members returned to 10.
        $limit: 10,
      },
      {
        // Join the borrow records with the user details to retrieve the user's name and email.
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        // Flatten the user details array.
        $unwind: "$userDetails",
      },
      {
        // Project the required fields from the user details.
        $project: {
          name: "$userDetails.name",
          email: "$userDetails.email",
          borrowCount: 1,
        },
      },
    ]);

    // Return the active members as a success response.
    res.status(200).json({
      status: "success",
      data: activeMembers,
    });
  } catch (err) {
    // Pass any errors to the next middleware function.
    next(err);
  }
};

// Retrieves a list of all books from the database with their availability.
const getBookAvailability = async (req, res, next) => {
  try {
    const bookAvailability = await Book.aggregate([
      {
        // Project the title, author, total copies, borrowed count, and available copies of each book.
        $project: {
          title: 1,
          author: 1,
          totalCopies: "$numberOfCopies",
          borrowedCount: 1,
          availableCopies: { $subtract: ["$numberOfCopies", "$borrowedCount"] },
        },
      },
      {
        // Sort the books by available copies, highest first.
        $sort: { availableCopies: -1 },
      },
    ]);

    // Return the book availability as a success response.
    res.status(200).json({
      status: "success",
      data: bookAvailability,
    });
  } catch (err) {
    // Pass any errors to the next middleware function.
    next(err);
  }
};

module.exports = {
  getBookAvailability,
  getActiveMembers,
  getMostBorrowedBooks,
};
