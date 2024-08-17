// auth Routes

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         role:
 *           type: string
 *           enum: [User, Admin]
 *           description: The role of the user User or Admin
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was last updated
 *       example:
 *         id: 5f8d0a44b54764421b7156c4
 *         name: John Doe
 *         email: johndoe@example.com
 *         role: User
 *         createdAt: 2024-01-01T12:00:00Z
 *         updatedAt: 2024-01-02T12:00:00Z
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user registration and login.
 */

const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

//user registration and login

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows you to register a new user in the system. Make sure to provide a unique email address and a strong password.
 *     tags: [Authentication]
 *     requestBody:
 *       description: For `Admin` Registration use `role:Admin`. Default role is `role:User`. Provide the necessary details to register a new user. The `name`, `email`, and `password` fields are required.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name (e.g., John Doe)
 *               email:
 *                 type: string
 *                 description: User's email (e.g., johndoe@example.com)
 *               password:
 *                 type: string
 *                 description: User's password (must be at least 8 characters long)
 *     responses:
 *       201:
 *         description: The user was successfully registered
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
 *                     id:
 *                       type: string
 *                       description: The user's ID
 *                     name:
 *                       type: string
 *                       description: The user's name
 *                     email:
 *                       type: string
 *                       description: The user's email
 *       400:
 *         description: Bad request, validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         description: The field that caused the error
 *                       message:
 *                         type: string
 *                         description: The error message for the field
 *                   example:
 *                     - field: name
 *                       message: "Name cannot be empty."
 *                     - field: name
 *                       message: "Please provide name, email and password."
 *                     - field: name
 *                       message: "Name should have at least 4 charecters."
 *                     - field: email
 *                       message: "Email is already in use."
 *                     - field: email
 *                       message: "Invalid email address."
 *                     - field: password
 *                       message: "Password must be at least 8 characters long."
 *       500:
 *         description: Internal server error
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
 *                   example: "An unexpected error occurred. Please try again later."
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     description: This endpoint allows you to log in a user in the system. Provide the necessary details to log in.
 *     tags: [Authentication]
 *     requestBody:
 *       description: Provide the necessary details to log in.The `email` and `password` fields are required.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: The user was successfully logged and  token (jwt) was send to the client.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Bad request, validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         description: The field that caused the error
 *                       message:
 *                         type: string
 *                         description: The error message for the field
 *                   example:
 *                     - field: email
 *                       message: "Please provide email and password."
 *                     - field: password
 *                       message: "Please provide email and password."
 *       401:
 *         description: Unauthorized access due to incorrect email or password
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
 *                   example: "Incorrect email or password."
 *       500:
 *         description: Internal server error, unexpected condition
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
 *                   example: "An unexpected error occurred. Please try again later."
 */

router.post("/login", authController.login);

module.exports = router;
