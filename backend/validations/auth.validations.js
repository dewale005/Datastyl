// Import the Joi library for schema validation
const Joi = require('joi');

// Define the validation schema for login
const authSchema = {
  // Validate the request body
  loginValidator: Joi.object().keys({
    // Email must be a string and is required
    email: Joi.string().email().required(),
    // Password must be a string and is required
    password: Joi.string().min(2).required(), // Example: minimum length of 6 characters for password
  }),
};

// Export the loginValidator object to make it available for use in other parts of the application
module.exports = authSchema;
