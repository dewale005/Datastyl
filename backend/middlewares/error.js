/**
 * Middleware function to handle errors in Express.
 * 
 * @param {Object} err - The error object.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const ErrorHandler = (err, req, res, next) => {
    // Determine the status code to send in the response
    // Default to 500 (Internal Server Error) if not set
    const errStatus = err.statusCode || 500;
  
    // Determine the error message to send in the response
    // Default to 'Something went wrong' if not provided
    const errMsg = err.message || 'Something went wrong';
  
    // Set the response status code and send a JSON response
    res.status(errStatus).json({
      success: false, // Indicate that the operation was not successful
      status: errStatus, // Include the HTTP status code in the response
      message: errMsg, // Include the error message in the response
      stack: process.env.NODE_ENV === 'development' ? err.stack : null // Include the stack trace only in development environment
    });
  };
  
  module.exports = ErrorHandler;
  