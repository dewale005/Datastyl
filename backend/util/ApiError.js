// Custom error class extending the built-in Error class
class ApiError extends Error {
    /**
     * Constructor for ApiError
     * @param {number} statusCode - HTTP status code of the error
     * @param {string} message - Error message
     * @param {boolean} [isOperational=true] - Indicates if the error is operational (default is true)
     * @param {string} [stack=""] - Stack trace (optional)
     */
    constructor(statusCode, message, isOperational = true, stack = "") {
      super(message); // Call the parent class constructor with the error message
      this.statusCode = statusCode; // Set the status code of the error
      this.isOperational = isOperational; // Set whether the error is operational
      if (stack) {
        this.stack = stack; // If a stack trace is provided, set it
      } else {
        Error.captureStackTrace(this, this.constructor); // Otherwise, capture the stack trace
      }
    }
  }
  
  // Export the ApiError class for use in other parts of the application
  module.exports = ApiError;
  