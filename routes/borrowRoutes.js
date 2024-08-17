// borrow Routes

/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: API to manage book borrowing and returns.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Borrow:
 *       type: object
 *       required:
 *         - id
 *         - bookId
 *         - userId
 *         - borrowDate
 *         - returnDate
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the borrow record.
 *           example: "60d21b4667d0d8992e610c85"
 *         bookId:
 *           type: string
 *           description: ID of the borrowed book.
 *           example: "60d21b4667d0d8992e610c85"
 *         userId:
 *           type: string
 *           description: ID of the user who borrowed the book.
 *           example: "60d21b4667d0d8992e610c85"
 *         borrowDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the book was borrowed.
 *           example: "2024-08-17T10:00:00Z"
 *         returnDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the book is due to be returned.
 *           example: "2024-09-17T10:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: API to manage book borrowing and returns.
 */

/**
 * @swagger
 * /api/borrow/borrow:
 *   post:
 *     summary: Borrow a book
 *     description: Allows a user to borrow a book from the library. Ensure that the `bookId` provided is valid and the book is available for borrowing. Users must be authenticated to access this endpoint.
 *     tags: [Borrow]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: ID of the book to borrow. The book must be available and not already borrowed.
 *     responses:
 *       201:
 *         description: The borrow record was successfully created. The book has been successfully borrowed, and the record is updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrow'
 *       400:
 *         description: Bad request. This can occur if the book is not available, the book ID is invalid, or the user does not meet the borrowing criteria.
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
 *                   example: "The book is not available or the book ID is invalid."
 *       401:
 *         description: Unauthorized. The user must be authenticated to borrow a book. Issues may include invalid or missing authentication tokens.
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
 *                   example: "An unexpected error occurred while processing your request. Please try again later."
 */

const express = require("express");
const borrowController = require("../controllers/borrowController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// all routes below  is protected with JWT authentication
router.use(authMiddleware.protect);

/**
 * @swagger
 * /api/borrow/borrow:
 *   post:
 *     summary: Borrow a book
 *     description: Allows a user to borrow a book from the library. Ensure that the `bookId` provided is valid and the book is available for borrowing. Users must be authenticated to access this endpoint.
 *     tags: [Borrow]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: ID of the book to borrow. The book must be available and not already borrowed.
 *     responses:
 *       201:
 *         description: The borrow record was successfully created. The book has been successfully borrowed, and the record is updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrow'
 *       400:
 *         description: Bad request. This can occur if the book is not available, the book ID is invalid, or the user does not meet the borrowing criteria.
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
 *                   example: "The book is not available or the book ID is invalid."
 *       401:
 *         description: Unauthorized. The user must be authenticated to borrow a book. Issues may include invalid or missing authentication tokens.
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
 *                   example: "An unexpected error occurred while processing your request. Please try again later."
 */

//to borrow a book
router.post("/borrow", borrowController.borrowBook);

/**
 * @swagger
 * /api/borrow/return/{id}:
 *   patch:
 *     summary: Return a borrowed book
 *     description: Allows a user to return a borrowed book. The user must provide the ID of the borrow record. Authentication is required to access this endpoint.
 *     tags: [Borrow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the borrow record. This ID should correspond to an active borrow record in the system.
 *     responses:
 *       200:
 *         description: The book was successfully returned. The borrow record is updated accordingly, and the book is now available for others to borrow.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrow'
 *       400:
 *         description: Bad Request. The borrow record ID provided is invalid or does not exist.
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
 *                   example: "Invalid borrow record ID. Please provide a valid ID."
 *       401:
 *         description: Unauthorized. The user must be authenticated to return a book. This may occur if the authentication token is missing or invalid.
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
 *                   example: "An unexpected error occurred while processing your request. Please try again later."
 */

//to return a borrowed book
router.patch("/return/:id", borrowController.returnBook);

/**
 * @swagger
 * /api/borrow/history:
 *   get:
 *     summary: Get borrow history of the logged-in user
 *     description: Retrieve the list of books that the authenticated user has borrowed in the past, including both currently borrowed and returned books. The user must be authenticated to access this endpoint.
 *     tags: [Borrow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved borrow history. The response includes an array of borrow records associated with the logged-in user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Borrow'
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
 *                   example: "An unexpected error occurred while retrieving your borrow history. Please try again later."
 */

//to get borrow history of the logged-in user
router.get("/history", borrowController.getBorrowHistory);

module.exports = router;
