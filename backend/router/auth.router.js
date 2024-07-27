const express = require("express"); // Import the Express library
const { authController } = require("../controller"); // Import authentication controller

// Create a new instance of an Express Router
const authRouter = express.Router();

/**
 * Route to handle user login.
 * Uses the loginUserController method from authController to process the login request.
 * 
 * @name POST /login
 * @function
 * @memberof module:router/authRouter
 * @param {string} /login - The endpoint for user login
 * @param {function} authController.loginUserController - The controller method to handle login logic
 */
authRouter.post("/login", authController.loginUserController);

// Export the router instance for use in other parts of the application
module.exports = authRouter;