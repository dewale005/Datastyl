// Import the Joi library for schema validation
const Joi = require('joi');

// Define the validation schema for user
const userSchema = {
  // userValidation schema to validate user data
  userValidation: Joi.object().keys({
    // Email must be a valid email address and is required
    email: Joi.string().email().required(),
    // Password must be a string with a minimum length of 2 and is required
    password: Joi.string().min(2).required(),
    // First name must be a string and is required
    first_name: Joi.string().required(),
    // Last name must be a string and is required
    last_name: Joi.string().required(),
    // Country must be a string and is required
    country: Joi.string().required(),
    // City must be a string and is required
    city: Joi.string().required(),
    // Phone number must be a string and is required
    phone_number: Joi.string().required(),
    // Position must be a string and is required
    position: Joi.string().required(),
  }),
  // userValidation schema to validate user data
  editUserValidation: Joi.object().keys({
    // Email must be a valid email address and is required
    email: Joi.string().email().required(),
    // First name must be a string and is required
    first_name: Joi.string().required(),
    // Last name must be a string and is required
    last_name: Joi.string().required(),
    // Country must be a string and is required
    country: Joi.string().required(),
    // City must be a string and is required
    city: Joi.string().required(),
    // Phone number must be a string and is required
    phone_number: Joi.string().required(),
    // Position must be a string and is required
    position: Joi.string().required(),
  }),
};

// Export the userSchema object to make it available for use in other parts of the application
module.exports = userSchema;
