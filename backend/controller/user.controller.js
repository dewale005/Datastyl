const { StatusCodes } = require("http-status-codes"); // Import HTTP status codes for standardized responses
const catchAsync = require("../util/catchAsync"); // Utility function to handle async errors
const { userValidation, editUserValidation } = require("../validations/user.validations"); // Import user validation schema
const {
  createUser,
  deleteUser,
  updateUser,
  getUser,
} = require("../services/user"); // Import user service functions
const ApiError = require("../util/ApiError"); // Import custom error handling class

/**
 * Controller to create a new user.
 * Validates the input data and inserts the user into the database.
 * 
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object used to send the response.
 * @throws {ApiError} - Throws an error if validation fails or user creation fails.
 */
const createUserController = catchAsync(async (req, res) => {
  // Validate request body against the user schema
  const { value, error } = await userValidation.validate(req.body);

  if (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message); // Return validation error
  }

  // Create user and respond with the newly created user data
  const user = await createUser(value);
  return res.status(StatusCodes.CREATED).json(user);
});

/**
 * Controller to retrieve all users.
 * Fetches all users from the database.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send the response.
 */
const getUsersController = catchAsync(async (req, res) => {
  // Retrieve all users and respond with the data
  const users = await getUser();
  return res.status(StatusCodes.OK).json(users);
});

/**
 * Controller to update an existing user.
 * Validates the input data and updates the user in the database based on the provided ID.
 * 
 * @param {Object} req - The request object containing user data and user ID.
 * @param {Object} res - The response object used to send the response.
 * @throws {ApiError} - Throws an error if validation fails, user update fails, or user not found.
 */
const updateUsersController = catchAsync(async (req, res) => {
  // Validate request body against the user schema
  const { value, error } = await editUserValidation.validate(req.body);
  const { id } = req.params; // Extract user ID from request parameters

  if (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message); // Return validation error
  }
  // Update user and respond with the updated user data
  const user = await updateUser(value, id);
  return res.status(StatusCodes.OK).json(user);
});

/**
 * Controller to delete a user.
 * Deletes the user from the database based on the provided ID.
 * 
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object used to send the response.
 * @throws {ApiError} - Throws an error if user deletion fails or user not found.
 */
const deleteUsersController = catchAsync(async (req, res) => {
  const { id } = req.params; // Extract user ID from request parameters

  // Delete user and respond with a confirmation message
  const deletedUser = await deleteUser(id);
  return res.status(StatusCodes.OK).json(deletedUser);
});

// Export controller functions for use in routes
module.exports = {
  createUserController,
  getUsersController,
  updateUsersController,
  deleteUsersController,
};
