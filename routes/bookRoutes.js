const express = require("express");
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// all routes below are protected with JWT authentication
router.use(authMiddleware.protect);

// Swagger components definition
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the book.
 *         author:
 *           type: string
 *           description: The author of the book.
 *         genre:
 *           type: string
 *           description: The genre of the book.
 *         numberOfCopies:
 *           type: integer
 *           description: The total number of copies available in the library.
 *         borrowedCount:
 *           type: integer
 *           description: The number of times the book has been borrowed.
 *       required:
 *         - title
 *         - author
 *         - genre
 *         - numberOfCopies
 *       example:
 *         title: "The Great Gatsby"
 *         author: "F. Scott Fitzgerald"
 *         genre: "Fiction"
 *         numberOfCopies: 10
 *         borrowedCount: 50
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

// Swagger documentation for the GET /api/books endpoint

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of books
 *     description: This endpoint retrieves a paginated list of books from the library. You can filter the results by genre and author, and specify the page number and number of books per page.
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination. Default is 1.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of books per page. Default is 10.
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter the books by genre. For example, "Science Fiction" or "Mystery".
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter the books by author. For example, "J.K. Rowling" or "George Orwell".
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     books:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Book'
 *                       description: Array of book objects
 *                     totalPages:
 *                       type: integer
 *                       description: Total number of pages available
 *                     currentPage:
 *                       type: integer
 *                       description: Current page number
 *                     totalBooks:
 *                       type: integer
 *                       description: Total number of books available
 *       500:
 *         description: Internal server error, unexpected condition occurred
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
 *                   example: "An unexpected error occurred while retrieving books."
 *   post:
 *     summary: Create a new book (Admin only)
 *     description: This endpoint allows an admin to create a new book entry in the library. Ensure you provide all required fields for the book.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Provide the new book details in the request body.`author`,`title`, `numberOfCopies`,`publicationDate` and `ISBN` are the required values
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request, book already exists or validation error
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
 *                   example: "Book already exists or provided data is invalid."
 *       500:
 *         description: Internal server error, unexpected condition occurred
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
 *                   example: "An unexpected error occurred while creating the book."
 */

// router chaining
router
  .route("/")
  .get(bookController.getAllBooks)
  .post(authMiddleware.restrictTo("Admin"), bookController.createBook);

// Swagger documentation for the GET /api/books/{id} endpoint
/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a specific book by ID
 *     description: Retrieve details of a book using its unique ID. Ensure the ID is valid and exists in the database.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique ID of the book. Must be a valid UUID.
 *     responses:
 *       200:
 *         description: Book found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found. The ID provided does not match any book in the database.
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
 *                   example: "Book with the specified ID was not found."
 *       500:
 *         description: Internal server error. An unexpected condition occurred.
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
 *                   example: "An unexpected error occurred while retrieving the book."
 *   patch:
 *     summary: Update a book by ID (Admin only)
 *     description: Update details of a book using its unique ID. Only accessible by admins. Provide the updated book details in the request body.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique ID of the book to be updated. Must be a valid UUID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request. The provided data is invalid or missing required fields.
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
 *                   example: "Invalid input data or missing required fields."
 *       404:
 *         description: Book not found. The ID provided does not match any book in the database.
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
 *                   example: "Book with the specified ID was not found."
 *       500:
 *         description: Internal server error. An unexpected condition occurred.
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
 *                   example: "An unexpected error occurred while updating the book."
 *   delete:
 *     summary: Delete a book by ID (Admin only)
 *     description: Remove a book from the library using its unique ID. Only accessible by admins.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique ID of the book to be deleted. Must be a valid UUID.
 *     responses:
 *       204:
 *         description: Book deleted successfully. No content is returned for this response.
 *       404:
 *         description: Book not found. The ID provided does not match any book in the database.
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
 *                   example: "Book with the specified ID was not found."
 *       500:
 *         description: Internal server error. An unexpected condition occurred.
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
 *                   example: "An unexpected error occurred while deleting the book."
 */

router
  .route("/:id")
  .get(bookController.getBook)
  .patch(authMiddleware.restrictTo("Admin"), bookController.updateBook)
  .delete(authMiddleware.restrictTo("Admin"), bookController.deleteBook);

module.exports = router;
