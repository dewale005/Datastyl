/**
 * A higher-order function to catch asynchronous errors in Express route handlers.
 * @param {Function} fn - The asynchronous function to wrap.
 * @returns {Function} A function that handles the asynchronous function and catches errors.
 */
const catchAsync = (fn) => {
    return (req, res, next) => {
      // Wrap the asynchronous function in a Promise and catch any errors
      Promise.resolve(fn(req, res, next))
        .catch((err) => next(err)); // Pass errors to the next middleware
    };
  };
  
  module.exports = catchAsync;
  