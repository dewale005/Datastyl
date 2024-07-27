const express = require('express'); // Import the Express library
const { userController } = require("../controller"); // Import user controller functions
const verifyToken = require('../middlewares/auth');

// Create a new instance of the Express Router
const userRouter = express.Router();

/**
 * Route to create a new user.
 * Handles POST requests to the root endpoint ("/").
 * 
 * @name Post/Create
 * @function
 * @memberof module:routes/userRouter
 * @param {string} '' - Endpoint for creating a user
 * @param {function} userController.createUserController - Controller function to handle user creation
 */
userRouter.post('', userController.createUserController);

/**
 * Route to get all users.
 * Handles GET requests to the root endpoint ("/").
 * 
 * @name Get/All
 * @function
 * @memberof module:routes/userRouter
 * @param {string} '/' - Endpoint for fetching all users
 * @param {function} userController.getUsersController - Controller function to handle fetching users
 */
userRouter.get('/', userController.getUsersController);

/**
 * Route to update a user by ID.
 * Handles PATCH requests to the endpoint with a user ID ("/:id").
 * 
 * @name Patch/Update
 * @function
 * @memberof module:routes/userRouter
 * @param {string} '/:id' - Endpoint for updating a user with a specific ID
 * @param {function} userController.updateUsersController - Controller function to handle updating a user
 */
userRouter.patch('/:id', verifyToken, userController.updateUsersController);

/**
 * Route to delete a user by ID.
 * Handles DELETE requests to the endpoint with a user ID ("/:id").
 * 
 * @name Delete/Remove
 * @function
 * @memberof module:routes/userRouter
 * @param {string} '/:id' - Endpoint for deleting a user with a specific ID
 * @param {function} userController.deleteUsersController - Controller function to handle deleting a user
 */
userRouter.delete('/:id', verifyToken, userController.deleteUsersController);

// Export the userRouter to be used in other parts of the application
module.exports = userRouter;
