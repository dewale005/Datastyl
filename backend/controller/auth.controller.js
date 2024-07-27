const { StatusCodes } = require("http-status-codes"); // HTTP status codes for response handling
const catchAsync = require("../util/catchAsync"); // Utility to catch and handle asynchronous errors
const { authenticateUser } = require("../services/user"); // Service function for user authentication
const { loginValidator } = require("../validations/auth.validations"); // Validator for login request
const ApiError = require("../util/ApiError"); // Custom error class for API responses

/**
 * Controller function for handling user login requests.
 * Validates the login request, authenticates the user, and returns a response.
 *
 * @param {Object} req - The request object containing user credentials.
 * @param {Object} res - The response object used to send the result back to the client.
 * @returns {Promise<void>} - Sends a JSON response with user details or an error message.
 * @throws {ApiError} - Throws an error if validation or authentication fails.
 */
const loginUserController = catchAsync(async (req, res) => {
  // Validate request body against login schema
  const { value, error } = await loginValidator.validate(req.body);

  if (error) {
    // If validation fails, throw a BAD_REQUEST error with the validation message
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message);
  }

  // Authenticate user with the validated email and password
  const user = await authenticateUser(value.email, value.password);

  // Set the Authorization cookie with the access token
  res.cookie("Authorization", user.accessToken, {
    httpOnly: true,
  });

  // Send a successful response with the authenticated user data
  res.status(StatusCodes.OK).json(user);
});

// Export the controller for use in routing
module.exports = {
  loginUserController,
};
