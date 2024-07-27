const jwt = require("jsonwebtoken"); // JWT library for token verification
const ApiError = require("../util/ApiError"); // Custom error class for handling API errors
const { StatusCodes } = require("http-status-codes"); // HTTP status codes for response handling
const DbQuery = require("../sql/query"); // Database query utility

// Secret key for hashing passwords (fallback to a default for development)
const SECRET = process.env.SECRET || "test-dev-secret";

// Instantiate DbQuery for 'users' table operations
const database = new DbQuery("users");

/**
 * Helper function to retrieve the authorization token from the request.
 *
 * @param {Object} req - The request object.
 * @returns {string|null} - The authorization token if present, otherwise null.
 */
const getAuthorization = (req) => {
  // Retrieve token from cookies if available
  const cookie = req.cookies["Authorization"];
  if (cookie) return cookie;

  // Retrieve token from Authorization header if available
  const header = req.header("Authorization");
  if (header) return header.split("Bearer ")[1];

  // Return null if no token is found
  return null;
};

/**
 * Middleware function to verify JWT token from the request.
 *
 * @param {Object} req - The request object containing the token in the Authorization header.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 * @throws {ApiError} - If the token is missing or invalid.
 */
async function verifyToken(req, res, next) {
  // Retrieve the token from the Authorization header or cookies
  const token = getAuthorization(req);

  // If token is not provided, throw an UNAUTHORIZED error
  if (!token)
    return next(new ApiError(StatusCodes.UNAUTHORIZED, "You need to be Authenticated"));

  try {
    // Verify the token using the secret key
    const { userId } = await jwt.verify(token, SECRET);

    // Find the user in the database using the userId from the token
    const user = await database.findOneBy({ id: userId });

    // If user is found, attach userId to the request object and proceed to next middleware
    if (user) {
      req.userId = user.id;
      return next();
    } else {
        // If user is not found, clear the Authorization cookie and throw an UNAUTHORIZED error
        res.clearCookie("Authorization");
      return next(new ApiError(StatusCodes.UNAUTHORIZED, "Expired or Invalid"));
    }
  } catch (error) {
    // If token verification fails, throw an UNAUTHORIZED error
    return next(new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token"));
  }
}

// Export the verifyToken middleware for use in routing
module.exports = verifyToken;
