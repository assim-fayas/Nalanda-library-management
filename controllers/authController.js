// authController.js

const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Registers a new user.
const register = async (req, res, next) => {
  try {
    // Create a new user using the request body
    const user = await User.create(req.body);

    // Return a success response with the created user
    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    // Pass the error to the next middleware
    next(err);
  }
};

//  Login function for authenticating users.
const login = async (req, res, next) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    // Find user by email and select password field
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists and password is correct
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    }

    // Generate JWT access token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Return success response with token
    res.status(200).json({ status: "success", token });
  } catch (err) {
    // Pass error to next middleware
    next(err);
  }
};

module.exports = {
  register,
  login,
};
