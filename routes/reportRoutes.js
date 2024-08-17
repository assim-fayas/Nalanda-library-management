// Report routes
/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API for generating reports
 */
const express = require("express");
const reportController = require("../controllers/reportController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// all routes below  is protected with JWT authentication
router.use(authMiddleware.protect);

/**
 * @swagger
 * /reports/most-borrowed-books:
 *   get:
 *     summary: Get the most borrowed books
 *     description: Retrieve a list of the most borrowed books in the library. This endpoint provides insights into the popularity of books based on how often they've been borrowed. Available to all authenticated users.
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of the most borrowed books. The response includes the book title and the number of times each book has been borrowed.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: The title of the book.
 *                   borrowedCount:
 *                     type: number
 *                     description: The number of times the book has been borrowed.
 *       401:
 *         description: Unauthorized. The request cannot be processed because the user is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: "Authentication required. Please provide a valid token."
 *       500:
 *         description: Internal server error. An unexpected condition occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred while retrieving the most borrowed books. Please try again later."
 */

//all users can see the most borrowed books
router.get("/most-borrowed-books", reportController.getMostBorrowedBooks);

/**
 * @swagger
 * /reports/active-members:
 *   get:
 *     summary: Get a list of active members (Admin only)
 *     description: Retrieve a list of members who have borrowed books within a specified period. This endpoint is restricted to Admin users only and provides insights into member activity based on borrowing history.
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of active members. The response includes the member's name and the number of books they have borrowed.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the member.
 *                   borrowCount:
 *                     type: number
 *                     description: The number of books borrowed by the member.
 *       401:
 *         description: Unauthorized. The request cannot be processed because the user is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: "Authentication required. Please provide a valid token."
 *       403:
 *         description: Forbidden. The user does not have the necessary permissions to access this endpoint. Only Admin users can retrieve this report.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: "Access denied. This resource is restricted to Admin users only."
 *       500:
 *         description: Internal server error. An unexpected condition occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred while retrieving the list of active members. Please try again later."
 */

//only admin can have acces to see the active members
router.get(
  "/active-members",
  authMiddleware.restrictTo("Admin"),
  reportController.getActiveMembers
);

/**
 * @swagger
 * /reports/book-availability:
 *   get:
 *     summary: Get book availability
 *     description: Retrieve a list of all books in the library along with their availability status. This endpoint is accessible to all users, providing details on how many copies of each book are available for borrowing.
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of books with their availability status. The response includes the title of the book, the total number of copies in the library, and the number of copies currently available for borrowing.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: The title of the book.
 *                   totalCopies:
 *                     type: number
 *                     description: The total number of copies available in the library.
 *                   availableCopies:
 *                     type: number
 *                     description: The number of copies currently available for borrowing.
 *       401:
 *         description: Unauthorized. The request cannot be processed because the user is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: "Authentication required. Please provide a valid token."
 *       500:
 *         description: Internal Server Error. An unexpected condition occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred while retrieving book availability. Please try again later."
 */

//all users can see the availability of books
router.get("/book-availability", reportController.getBookAvailability);

module.exports = router;
