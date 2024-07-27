// Import necessary modules and packages
const shajs = require("sha.js"); // SHA library for hashing passwords
const db = require("../sql/db"); // Database connection pool
const ApiError = require("../util/ApiError"); // Custom error handling class
const { StatusCodes } = require("http-status-codes"); // HTTP status codes
const DbQuery = require("../sql/query"); // Database query utility
const jwt = require("jsonwebtoken"); // JSON Web Token package

// Secret key for hashing passwords (fall back to a default for development)
const SECRET = process.env.SECRET || "test-dev-secret";

// Instantiate DbQuery for 'users' table operations
const database = new DbQuery("users");

/**
 * @typedef {Object} User
 * @property {string} first_name - User's first name.
 * @property {string} last_name - User's last name.
 * @property {string} email - User's email address.
 * @property {string} password - User's hashed password.
 * @property {string} country - User's country of residence.
 * @property {string} city - User's city of residence.
 * @property {string} phone_number - User's phone number.
 * @property {string} position - User's job position.
 * @property {date} created_at - Timestamp when the user was created.
 * @property {date} updated_at - Timestamp when the user was last updated.
 */

/**
 * @typedef {Object} Fields
 * @property {string} [first_name] - Optional first name of the user.
 * @property {string} [last_name] - Optional last name of the user.
 * @property {string} [email] - Optional email address of the user.
 * @property {string} [password] - Optional password of the user (will be hashed).
 * @property {string} [country] - Optional country of the user.
 * @property {string} [city] - Optional city of the user.
 * @property {string} [phone_number] - Optional phone number of the user.
 * @property {string} [position] - Optional job position of the user.
 */

/**
 * Generate a SHA-256 hashed password using email, password, and a secret key.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {string} - The hashed password.
 */
const hashPassword = (email, password) =>
  shajs("sha256").update(`${email}${password}${SECRET}`).digest("hex");

/**
 * Create a JSON Web Token for a given user ID.
 * @param {number} id - The user's ID.
 * @returns {string} - The generated JWT.
 */
const sign = (id) =>
  jwt.sign({ userId: id }, SECRET, { expiresIn: "1h" });

/**
 * Authenticate a user by validating their email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{userId: number, accessToken: string}>} - An object containing user ID and access token.
 * @throws {ApiError} - Throws an error if authentication fails.
 */
const authenticateUser = async (email, password) => {
  const hash = hashPassword(email, password); // Hash the password
  const queryText = {
    text: ` 
      SELECT s.id, s.email, s.first_name as firstName, s.last_name as lastName
      FROM users s
      WHERE email = $1 AND password = $2
    `,
    values: [email, hash], // Parameterized query values
  };

  try {
    const { rows } = await db.query(queryText); // Execute the query
    if (rows[0]) {
      // Return user ID and token if credentials are valid
      return { userId: rows[0].id, accessToken: sign(rows[0].id) };
    }
    // Throw an error if credentials are invalid
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Bad credentials");
  } catch (error) {
    // Handle and rethrow the error
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Bad credentials");
  }
};

/**
 * Insert a new user into the database with a hashed password.
 * @param {Fields} data - User data including a hashed password.
 * @returns {Promise<User>} - The inserted user object.
 * @throws {ApiError} - Throws an error if insertion fails.
 */
const createUser = async (data) => {
  try {
    // Add hashed password and insert user data
    const resp = await database.create({
      ...data,
      password: hashPassword(data.email, data.password),
    });
    return resp; // Return the inserted user
  } catch (error) {
    // Handle and rethrow the error
    throw new ApiError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || "Something went wrong"
    );
  }
};

/**
 * Retrieve all users from the database.
 * @returns {Promise<User[]>} - A list of all users.
 * @throws {ApiError} - Throws an error if retrieval fails.
 */
const getUser = async () => {
  try {
    return await database.findBy(); // Fetch all users
  } catch (error) {
    // Handle and rethrow the error
    throw new ApiError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || "Something went wrong"
    );
  }
};

/**
 * Update an existing user's information by ID.
 * @param {Fields} data - Data to update (excluding password).
 * @param {number} id - The ID of the user to update.
 * @returns {Promise<User>} - The updated user object.
 * @throws {ApiError} - Throws an error if update fails.
 */
const updateUser = async (data, id) => {
  try {
    
    return await database.updateById(data, id); // Update user data
  } catch (error) {
    // Handle and rethrow the error
    throw new ApiError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || "Something went wrong"
    );
  }
};

/**
 * Delete a user from the database by ID.
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<void>} - Resolves when the user is deleted.
 * @throws {ApiError} - Throws an error if deletion fails.
 */
const deleteUser = async (id) => {
  try {
    return await database.delete(id); // Delete user by ID
  } catch (error) {
    // Handle and rethrow the error
    throw new ApiError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || "Something went wrong"
    );
  }
};

// Export functions for external use
module.exports = {
  authenticateUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
